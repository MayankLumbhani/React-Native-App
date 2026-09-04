import { createProperty, findPropertiesByOwner } from "./property.repository.js";

export const createPropertyService = async (userId, propertyData) => {
  return await createProperty({
    ...propertyData,
    owner: userId,
  });
};

export const getUserPropertiesService = async (userId) => {
  return await findPropertiesByOwner(userId);
};