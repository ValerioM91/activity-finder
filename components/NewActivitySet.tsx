"use client"

import { createNewActivitySet, generateActivitySetResponse, getExistingActivitySet } from "@/utils/action"
import { generateActivitySetPayloadSchema, type GenerateActivitySetPayload } from "@/utils/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import ActivitySetInfo from "./ActivitySetInfo"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { ZodError } from "zod"
import { GroupType } from "@prisma/client"

const NewActivitySet = () => {
  const queryClient = useQueryClient()

  const [days, setDays] = useState(1)

  const {
    mutate,
    isPending,
    data: activitySet,
  } = useMutation({
    mutationFn: async (payload: GenerateActivitySetPayload) => {
      const existingActivitySet = await getExistingActivitySet(payload)
      if (existingActivitySet) return existingActivitySet

      const newActivitySet = await generateActivitySetResponse(payload)
      if (newActivitySet) {
        const response = await createNewActivitySet(newActivitySet)
        queryClient.invalidateQueries({ queryKey: ["allActivitySets"] })
        return response
      }
      toast.error("No matching city found")
      return null
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const parsedPayload = generateActivitySetPayloadSchema.parse({
        city: formData.get("city"),
        country: formData.get("country"),
        groupType: formData.get("groupType"),
        daysNumber: Number(formData.get("days")),
      })

      mutate(parsedPayload)
    } catch (errors) {
      if (errors instanceof ZodError) {
        toast.error(errors.issues.map(issue => issue.message).join("\n"))
        return
      }
      toast.error("No matching city found")
    }
  }

  if (isPending) {
    return <span className="loading loading-lg"></span>
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
        <h2>Select your dream destination</h2>

        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <input type="text" className="input input-bordered w-full rounded" placeholder="City" name="city" required />
          <input
            type="text"
            className="input input-bordered w-full rounded"
            placeholder="Country"
            name="country"
            required
          />
        </div>

        <fieldset>
          <div className="items-top flex gap-4">
            <legend className="pt-2">Group type:</legend>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {Object.values(GroupType).map((value: GroupType) => (
                <div className="form-control mr-auto" key={value}>
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="radio" name="groupType" value={value} className="radio checked:bg-primary" />
                    <span className="label-text capitalize">{value.toLowerCase()}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <div>
          <label htmlFor="days" className="label">
            How many days are you staying in the city?
          </label>
          <div className="input join input-bordered w-full items-center rounded pr-0">
            <input
              className="w-full bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              name="days"
              value={days}
              onChange={e => setDays(e.target.valueAsNumber)}
              min={1}
            />

            <button
              type="button"
              disabled={days === 1}
              onClick={() => setDays(days - 1)}
              className="btn btn-primary join-item h-full border-r-secondary hover:border-r-secondary"
            >
              <FaMinus />
            </button>
            <button
              type="button"
              onClick={() => setDays(days + 1)}
              className="btn btn-primary join-item h-full border-l-secondary hover:border-l-secondary"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary uppercase">
          Create activity set
        </button>
      </form>
      <div className="mt-16">{activitySet && <ActivitySetInfo activitySet={activitySet} />}</div>
    </>
  )
}
export default NewActivitySet
