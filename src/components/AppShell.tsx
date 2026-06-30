import { Tabs } from '@cloudflare/kumo'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { NAV_ITEMS, type NavPath } from '../lib/navigation'

function getCurrentPath(pathname: string): NavPath {
  const matched = NAV_ITEMS.find((item) => item.path === pathname)
  return matched?.path ?? '/api-keys'
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const currentPath = getCurrentPath(pathname)

  return (
    <div className="app-shell">
      <aside className="app-tabs-rail" aria-label="用户控制台菜单">
        <Tabs
          value={currentPath}
          onValueChange={(value) => navigate({ to: value as NavPath })}
          variant="segmented"
          tabs={NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return {
              value: item.path,
              className: 'app-nav-tab',
              label: (
                <span className="app-nav-tab-inner">
                  <Icon className="app-nav-tab-icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </span>
              ),
            }
          })}
          className="app-nav-tabs"
          listClassName="app-nav-tabs-list"
          indicatorClassName="app-nav-tabs-indicator"
        />
      </aside>

      <main className="app-page">
        <div className="app-workspace">{children}</div>
      </main>
    </div>
  )
}
