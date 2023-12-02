import NewActivitySet from "@/components/NewActivitySet"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const NewActivitySetPage = () => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewActivitySet />
    </HydrationBoundary>
  )
}
export default NewActivitySetPage
