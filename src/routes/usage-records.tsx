import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/usage-records')!

export const Route = createFileRoute('/usage-records')({
  component: UsageRecordsPage,
})

function UsageRecordsPage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
