import { Empty, LayerCard } from '@cloudflare/kumo'

type PagePlaceholderProps = {
  title: string
  description: string
}

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <LayerCard className="app-page-card">
      <Empty
        size="lg"
        title={title}
        description={description}
        className="app-empty"
      />
    </LayerCard>
  )
}
