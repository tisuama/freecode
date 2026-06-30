import { createFileRoute } from '@tanstack/react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { NAV_ITEMS } from '../lib/navigation'

const page = NAV_ITEMS.find((item) => item.path === '/model-plaza')!

export const Route = createFileRoute('/model-plaza')({
  component: ModelPlazaPage,
})

function ModelPlazaPage() {
  return <PagePlaceholder title={page.label} description={page.description} />
}
