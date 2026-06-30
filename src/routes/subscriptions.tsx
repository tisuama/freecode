import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/subscriptions')!

export const Route = createFileRoute('/subscriptions')({
  component: SubscriptionsPage,
})

function SubscriptionsPage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
