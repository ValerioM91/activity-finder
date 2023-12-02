"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const searchHandler = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")

    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const resetHandler = () => {
    replace(pathname)
  }

  return (
    <form className="mb-12 max-w-lg">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search a city or a country here"
          className="input join-item input-bordered w-full"
          name="search"
          onChange={e => searchHandler(e.target.value)}
        />
        <button className="btn btn-primary join-item w-28 capitalize" type="button" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </form>
  )
}
export default Search
