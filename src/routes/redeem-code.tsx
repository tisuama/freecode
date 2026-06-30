import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/redeem-code')!

export const Route = createFileRoute('/redeem-code')({
  component: RedeemCodePage,
})

function RedeemCodePage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
