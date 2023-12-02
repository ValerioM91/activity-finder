"use client"

import { getAllActivitySets } from "@/utils/action"
import useDebounce from "@/utils/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import ActivitySetList from "./ActivitySetList"

const AllActivitySets = () => {
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearchValue = useDebounce(searchValue)

  const { data, isPending } = useQuery({
    queryKey: ["allActivitySets", debouncedSearchValue],
    queryFn: () => getAllActivitySets(debouncedSearchValue),
  })

  return (
    <>
      <form className="mb-12 max-w-lg">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search a city or a country here"
            className="input join-item input-bordered w-full"
            name="search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item w-28 capitalize "
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "please wait" : "reset"}
          </button>
        </div>
      </form>
      {isPending ? <span className=" loading"></span> : <ActivitySetList activitySets={data} />}
    </>
  )
}
export default AllActivitySets
