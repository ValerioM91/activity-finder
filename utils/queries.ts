import { type GenerateActivitySetPayload } from "./schemas"

export const createActivitySetQuery = ({ city, country, groupType, daysNumber }: GenerateActivitySetPayload) =>
  `Find a exact ${city} in this exact ${country}.
    If ${city} and ${country} exist, create a list of things people can do in this ${city},${country}. 
    The list should include at ${daysNumber} activities. The list should be created based on the following ${groupType} type of group.
    Response should be in the following JSON format: 
   {
      "city": "${city}",
      "country": "${country}",
      "groupType": "${groupType}",
      "daysNumber": "${daysNumber}",
      "title": "title of the tour",
      "description": "short description of the city and tour",
      "activities": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
    }
    "activities" property should include only ${daysNumber} items.
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country}, return null, with no additional characters.`

//   You are chatting with a customer who is looking for activities to do in ${city}, ${country}. The customer is traveling with a ${groupType} group and is staying for ${daysNumber} days. The customer is looking for a list of activities to do in ${city}, ${country}. The list should include ${daysNumber} activities. The list should be created based on the following ${groupType} type of group. Response should be in the following JSON format: { "tour": { "city": "${city}", "country": "${country}", "groupType": "${groupType}", "daysNumber": "${daysNumber}", "title": "title of the tour", "description": "short description of the city and tour", "activities": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"] } } "activities" property should include only ${daysNumber} items. If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country}, return { "tour": null }, with no additional characters
