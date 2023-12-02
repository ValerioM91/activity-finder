import { getSingleActivitySet } from "@/utils/action"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import ActivitySetInfo from "@/components/ActivitySetInfo"
import { type ActivitySet } from "@prisma/client"
import { Suspense } from "react"

const SingleActivitySetPage = async ({ params }: { params: { id: string } }) => {
  const activitySet = await getSingleActivitySet(params.id)

  if (!activitySet) {
    redirect("/")
  }

  return (
    <div>
      <Link href="/" className="btn btn-primary mb-12 h-auto">
        Back to all activities
      </Link>
      <Suspense fallback={<div>LAODING</div>}>
        <Info activitySet={activitySet} />
      </Suspense>
    </div>
  )
}
export default SingleActivitySetPage

const Info = ({ activitySet }: { activitySet: ActivitySet }) => {
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
