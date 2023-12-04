import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import ActivitySetInfo from "@/components/ActivitySetInfo"
import { ActivitySetSkeleton } from "@/components/Skeletons"
import { getSingleActivitySet } from "@/utils/action"

const SingleActivitySetPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Link href="/" className="btn btn-primary mb-12 h-auto">
        Back to all activities
      </Link>
      <Suspense fallback={<ActivitySetSkeleton />}>
        <Info activitySetId={params.id} />
      </Suspense>
    </div>
  )
}
export default SingleActivitySetPage

const Info = async ({ activitySetId }: { activitySetId: string }) => {
  const activitySet = await getSingleActivitySet(activitySetId)

  if (!activitySet) {
    redirect("/")
  }

  return (
    <>
      {activitySet?.image && (
        <Image
          src={activitySet.image}
          width={300}
          height={300}
          alt={activitySet.title}
          priority
          className="mb-16 h-96 w-96 rounded object-cover shadow-xl"
        />
      )}
      <ActivitySetInfo activitySet={activitySet} />
    </>
  )
}
