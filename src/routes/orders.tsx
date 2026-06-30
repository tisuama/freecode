import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/orders')!

export const Route = createFileRoute('/orders')({
  component: OrdersPage,
})

function OrdersPage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
