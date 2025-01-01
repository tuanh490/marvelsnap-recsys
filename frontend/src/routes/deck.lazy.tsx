import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/deck')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/deck"!</div>
}
