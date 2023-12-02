import { GroupType } from "@prisma/client"
import { z } from "zod"

export const activitySetSchema = z.object({
  city: z.string(),
  country: z.string(),
  groupType: z.nativeEnum(GroupType),
  daysNumber: z.any().pipe(z.coerce.number()),
  title: z.string(),
  description: z.string(),
  activities: z.array(z.string()),
})

export type ActivitySetSchema = z.infer<typeof activitySetSchema>

export const generateActivitySetPayloadSchema = z.object({
  city: z.string(),
  country: z.string(),
  groupType: z.nativeEnum(GroupType, {
    errorMap: () => ({ message: `Invalid group type. Must be one of ${Object.values(GroupType).join(", ")}` }),
  }),
  daysNumber: z.number().min(1, "Days number must be greater than 0"),
})

export type GenerateActivitySetPayload = z.infer<typeof generateActivitySetPayloadSchema>
