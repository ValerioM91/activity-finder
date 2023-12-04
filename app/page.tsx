import { Suspense } from "react"

import AllActivitySets from "@/components/AllActivitySets"
import Pagination from "@/components/Pagination"
import Search from "@/components/Search"
import { CardsSkeleton } from "@/components/Skeletons"
import { getNumberOfPages } from "@/utils/action"

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await getNumberOfPages(query)

  return (
    <div>
      <Search />
      <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
        <AllActivitySets query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

export default Home
