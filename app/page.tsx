import AllActivities from "@/components/AllActivitySets"
import { getAllActivitySets } from "@/utils/action"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const Home = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["allActivitySets"],
    queryFn: () => getAllActivitySets(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllActivities />
    </HydrationBoundary>
  )
}

export default Home
