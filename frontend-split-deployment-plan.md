# Frontend Split Deployment Plan

## Goal

Deploy a new user-facing frontend independently while keeping the existing new-api frontend as the admin interface. The backend API remains unchanged.

## Recommended Domain Layout

```text
freecode.pro           -> new user frontend
freecode.pro/api       -> backend API
freecode.pro/v1        -> OpenAI-compatible backend relay API
freecode.pro/v1beta    -> Gemini-compatible backend relay API
freecode.pro/mj        -> Midjourney relay API
freecode.pro/suno      -> Suno relay API

admin.freecode.pro     -> existing new-api frontend as admin interface
admin.freecode.pro/api -> same backend API
```

## Process Layout

Example local service layout on the server:

```text
127.0.0.1:3000 -> new user frontend process
127.0.0.1:8080 -> new-api backend plus existing embedded frontend
```

This is fine even though the new frontend is deployed as a separate process. The browser only cares about the public origin it sees.

For example:

```text
https://freecode.pro/     -> proxied by Nginx to 127.0.0.1:3000
https://freecode.pro/api/ -> proxied by Nginx to 127.0.0.1:8080
```

From the browser's perspective, both are still under:

```text
https://freecode.pro
```

So requests from the new frontend to `/api` are same-origin requests.

## CORS, Cookie, SameSite, and HTTPS

If user frontend and admin frontend log in separately and each uses same-origin API paths, there is usually no extra CORS or cookie-domain work.

```text
freecode.pro page requests freecode.pro/api
admin.freecode.pro page requests admin.freecode.pro/api
```

These are same-origin from each page's perspective.

Expected behavior:

```text
CORS: no extra handling needed
Cookie Domain: no shared cookie domain needed
SameSite: default Lax is usually enough
HTTPS: still required
```

The two domains will not share login state by default:

```text
Logging in on freecode.pro does not log in admin.freecode.pro.
Logging in on admin.freecode.pro does not log in freecode.pro.
```

This matches the "separate login" plan.

Only shared login would require more work, such as:

```text
Cookie Domain=.freecode.pro
Secure cookies
SameSite strategy review
CORS credentials configuration if cross-origin API calls are used
```

## Frontend API Base URL

The new frontend should not call backend APIs using server-local addresses:

```text
http://127.0.0.1:8080
http://localhost:8080
https://admin.freecode.pro/api
```

Instead, it should use relative paths:

```text
/api
/v1
```

This keeps requests same-origin through Nginx and avoids CORS issues.

## Nginx Routing Concept

The main site should route user frontend pages to the new frontend process, while preserving backend paths:

```nginx
server {
    server_name freecode.pro www.freecode.pro;

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location /v1/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location /v1beta/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location /mj/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location /suno/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

The admin subdomain can continue to use the existing backend service:

```nginx
server {
    server_name admin.freecode.pro;

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

In real deployment, the proxy headers and timeout settings from the current Nginx config should be preserved, especially:

```nginx
proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_read_timeout 3600s;
proxy_send_timeout 3600s;
proxy_buffering off;
```

## DNS and SSL

Add a DNS record:

```text
admin.freecode.pro -> server IP
```

The TLS certificate must include:

```text
freecode.pro
www.freecode.pro
admin.freecode.pro
```

Example Certbot command:

```bash
sudo certbot --nginx -d freecode.pro -d www.freecode.pro -d admin.freecode.pro
```

## Why This Is Easier Than `/admin`

Using `admin.freecode.pro` is easier than deploying the existing frontend under `freecode.pro/admin`, because the existing frontend can keep running from `/`.

If using `/admin`, the old frontend would likely need changes for:

```text
base path: /admin/
router basename: /admin
asset paths: /admin/assets/
SPA refresh fallback under /admin/*
```

With `admin.freecode.pro`, those changes are avoided.

## Summary

This plan is feasible and low-risk:

```text
freecode.pro       -> independent new user frontend
admin.freecode.pro -> existing frontend as admin interface
/api and /v1       -> same backend API service
```

The key rule is: keep browser-facing API calls same-origin by using relative paths like `/api` and `/v1`.
