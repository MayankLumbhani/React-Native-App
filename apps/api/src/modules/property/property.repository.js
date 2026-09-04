import Property from "./property.model.js";

export const createProperty = async (propertyData) => {
  return await Property.create(propertyData);
};