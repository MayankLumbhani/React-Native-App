import Contact from "./contact.model.js";

export const createContact = async (contactData) => {
    return await Contact.create(contactData);
};

export const findContactsByUser = async (userId) => {
    return await Contact.find({ user: userId });
};

export const findContactByIdAndUser = async (contactId, userId) => {
    return await Contact.findOne({ _id: contactId, user: userId });
};

export const addPropertyToContact = async (contactId, userId, propertyId) => {
    return await Contact.findOneAndUpdate(
        { _id: contactId, user: userId },
        { $addToSet: { linkedProperties: propertyId } },
        { new: true }
    );
};
