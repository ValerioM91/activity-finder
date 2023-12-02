import { type ActivitySet } from "@prisma/client"

const ActivitySetInfo = ({ activitySet }: { activitySet?: ActivitySet }) => {
  if (!activitySet) return null

  const { description, title } = activitySet

  const activities = activitySet.activities as string[]

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <p className="mb-6 leading-loose">{description}</p>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="mb-4 rounded bg-base-200 p-4">
            <p>{activity}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ActivitySetInfo
