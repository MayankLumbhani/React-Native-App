import {
    createContact,
    findContactsByUser,
    findContactByIdAndUser,
} from "./contact.repository.js";

export const createContactService = async (userId, contactData) => {
    return await createContact({
        ...contactData,
        user: userId,
    });
};

export const getUserContactsService = async (userId) => {
    return await findContactsByUser(userId);
};

export const getContactByIdService = async (contactId, userId) => {
    const contact = await findContactByIdAndUser(contactId, userId);

    if (!contact) {
        const error = new Error("Contact not found");
        error.statusCode = 404;
        throw error;
    }

    return contact;
};
