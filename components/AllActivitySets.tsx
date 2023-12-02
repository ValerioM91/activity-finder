import { getAllActivitySets } from "@/utils/action"
import ActivitySetList from "./ActivitySetList"

const AllActivitySets = async ({ currentPage, query }: { query: string; currentPage: number }) => {
  const data = await getAllActivitySets({ query, currentPage })

  return <ActivitySetList activitySets={data} />
}
export default AllActivitySets
