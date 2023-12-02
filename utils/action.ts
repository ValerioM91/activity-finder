"use server"

import OpenAi from "openai"
import { activitySetSchema, type GenerateActivitySetPayload, type ActivitySetSchema } from "./schemas"
import { createActivitySetQuery } from "./queries"
import prisma from "./db"

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY })

export const generateActivitySetResponse = async ({
  city,
  country,
  daysNumber,
  groupType,
}: GenerateActivitySetPayload) => {
  const query = createActivitySetQuery({ city, country, daysNumber, groupType })

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are an helpful assistant for the Hilton Hotels & Resorts company. You help Hilton's customers to find activitySet to do in the city they are visiting.`,
        },
        {
          role: "user",
          content: query,
        },
      ],
    })

    if (!response?.choices[0].message.content) return null

    const data = JSON.parse(response.choices[0].message.content)

    if (!data) return null

    const activitySet = activitySetSchema.parse(data)

    return activitySet
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return null
  }
}

export const getExistingActivitySet = async (payload: GenerateActivitySetPayload) => {
  return prisma.activitySet.findUnique({
    where: {
      city_country_groupType_daysNumber: payload,
    },
  })
}

export const createNewActivitySet = async (activitySet: ActivitySetSchema) => {
  const image = await getUnsplashImage(activitySet.city)

  const city = activitySet.city.toUpperCase()[0] + activitySet.city.slice(1).toLowerCase()
  const country = activitySet.country.toUpperCase()[0] + activitySet.country.slice(1).toLowerCase()

  return prisma.activitySet.create({
    data: { ...activitySet, city, country, image },
  })
}

export const getAllActivitySets = async (searchTerm?: string) => {
  if (!searchTerm) {
    const activitySet = await prisma.activitySet.findMany({
      orderBy: {
        city: "asc",
      },
    })
    return activitySet
  }

  const activitySet = prisma.activitySet.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  })

  return activitySet
}

export const getSingleActivitySet = async (id: string) => {
  return prisma.activitySet.findUnique({
    where: {
      id,
    },
  })
}

const getUnsplashImage = async (query: string) => {
  const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`
  const response = await fetch(url + query)

  if (response.ok) {
    const data = await response.json()
    return data?.results?.[0]?.urls?.regular as string | undefined
  }
}
