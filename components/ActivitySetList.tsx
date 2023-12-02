import type { ActivitySet } from "@prisma/client"
import ActivitySetCard from "./ActivitySetCard"

const ActivitySetList = ({ activitySets }: { activitySets?: ActivitySet[] }) => {
  if (!activitySets || activitySets.length === 0) return <div className="text-lg">No activities found...</div>

  return (
    <div className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
      {activitySets.map(activitySet => {
        return <ActivitySetCard activitySet={activitySet} key={activitySet.id} />
      })}
    </div>
  )
}
export default ActivitySetList
