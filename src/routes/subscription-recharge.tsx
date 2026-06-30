import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/subscription-recharge')!

export const Route = createFileRoute('/subscription-recharge')({
  component: SubscriptionRechargePage,
})

function SubscriptionRechargePage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
