import AllActivitySets from "@/components/AllActivitySets"
import Search from "@/components/Search"
import Pagination from "@/components/Pagination"
import { getNumberOfPages } from "@/utils/action"
import { Suspense } from "react"
import { CardsSkeleton } from "@/components/Skeletons"

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
