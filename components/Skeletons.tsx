const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-base-100/60 before:to-transparent"

export function CardSkeleton() {
  return (
    <div className={`${shimmer} card relative overflow-hidden rounded bg-base-100 shadow-xl`}>
      <div className="h-60 w-full bg-base-300" />
      <div className="card-body">
        <div className="h-5 w-60 rounded bg-base-300" />
        <div className="mt-2 flex gap-3">
          <div className="h-6 w-20 rounded bg-base-300" />
          <div className="h-6 w-16 rounded bg-base-300" />
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-20 rounded bg-base-300" />
        </div>
      </div>
    </div>
  )
}

export function CardsSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export function ActivitySetSkeleton() {
  return (
    <div className={`${shimmer} relative max-w-2xl overflow-hidden rounded`}>
      <div className="mb-16 h-96 w-96 rounded bg-base-200" />
      <div className="mb-4 h-12 max-w-lg rounded bg-base-200" />
      <div className="mb-6 h-24 max-w-xl rounded bg-base-200 leading-loose" />
      <div>
        {new Array(3).fill(0).map((_, index) => (
          <div key={index} className="mb-6 h-28 max-w-2xl rounded bg-base-300 p-4" />
        ))}
      </div>
    </div>
  )
}
