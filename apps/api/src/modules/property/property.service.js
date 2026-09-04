import { createProperty, findPropertiesByOwner, findPropertyByIdAndOwner, updatePropertyByIdAndOwner } from "./property.repository.js";

export const createPropertyService = async (userId, propertyData) => {
  return await createProperty({
    ...propertyData,
    owner: userId,
  });
};

export const getUserPropertiesService = async (userId) => {
  return await findPropertiesByOwner(userId);
};

export const getPropertyByIdService = async (propertyId, userId) => {
  const property = await findPropertyByIdAndOwner(propertyId, userId);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  return property;
};

const ALLOWED_UPDATE_FIELDS = [
  "title",
  "type",
  "description",
  "address",
  "city",
  "bedrooms",
  "bathrooms",
  "rent",
  "contacts",
  "images",
  "location",
  "rooms",
];

export const updatePropertyService = async (propertyId, userId, body) => {
  const updateData = {};
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      updateData[field] = body[field];
    }
  }

  const property = await updatePropertyByIdAndOwner(propertyId, userId, updateData);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  return property;
};