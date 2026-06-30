import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/profile')!

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
