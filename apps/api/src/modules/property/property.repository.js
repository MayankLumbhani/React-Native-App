import Property from "./property.model.js";

export const createProperty = async (propertyData) => {
  return await Property.create(propertyData);
};

export const findPropertiesByOwner = async (userId) => {
  return await Property.find({ owner: userId });
};

export const findPropertyByIdAndOwner = async (propertyId, userId) => {
  return await Property.findOne({ _id: propertyId, owner: userId });
};

export const updatePropertyByIdAndOwner = async (propertyId, userId, updateData) => {
  return await Property.findOneAndUpdate(
    { _id: propertyId, owner: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

export const deletePropertyByIdAndOwner = async (propertyId, userId) => {
  return await Property.findOneAndDelete({ _id: propertyId, owner: userId });
};

export const addContactToProperty = async (propertyId, userId, contactId) => {
  return await Property.findOneAndUpdate(
    { _id: propertyId, owner: userId },
    { $addToSet: { contacts: contactId } },
    { new: true }
  );
};