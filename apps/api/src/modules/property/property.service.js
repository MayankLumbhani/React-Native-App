import { createProperty } from "./property.repository.js";

export const createPropertyService = async (userId, propertyData) => {
  return await createProperty({
    ...propertyData,
    owner: userId,
  });
};