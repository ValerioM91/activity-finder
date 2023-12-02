import { type GroupType, type ActivitySet } from "@prisma/client"
import Image from "next/image"
import type { IconType } from "react-icons"
import { FaUser, FaUsers, FaBusinessTime } from "react-icons/fa6"
import { FaUserFriends } from "react-icons/fa"
import { MdFamilyRestroom } from "react-icons/md"
import Link from "next/link"

const ActivitySetCard = ({ activitySet }: { activitySet: ActivitySet }) => {
  const { image, groupType, title, daysNumber, id } = activitySet

  const Icon = ICON_MAP[groupType]

  return (
    <div className="card relative overflow-hidden rounded bg-base-100 shadow-xl">
      <div className="h-60 w-full">
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="block h-full w-full object-cover"
            priority
          />
        )}
      </div>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex gap-3">
          <span className="badge badge-outline badge-lg gap-2">
            <span className="capitalize">{groupType.toLowerCase()}</span>
            <Icon />
          </span>
          <span className="badge badge-outline badge-lg">
            {daysNumber} day{daysNumber > 1 ? "s" : ""}
          </span>
        </div>

        <div className="card-actions mt-2 justify-end">
          <Link
            href={`/activity/${id}`}
            className="btn-primary h-auto rounded bg-primary px-4 py-2 text-base-100 after:absolute after:inset-0 after:cursor-pointer"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ActivitySetCard

const ICON_MAP: Record<GroupType, IconType> = {
  SOLO: FaUser,
  COUPLE: FaUserFriends,
  FAMILY: MdFamilyRestroom,
  FRIENDS: FaUsers,
  BUSINESS: FaBusinessTime,
}
