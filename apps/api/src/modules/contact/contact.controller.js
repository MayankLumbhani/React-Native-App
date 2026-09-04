import {
    createContactService,
    getUserContactsService,
    getContactByIdService,
} from "./contact.service.js";

export const createContact = async (req, res, next) => {
    try {
        const contact = await createContactService(req.user.userId, req.body);

        return res.status(201).json({
            success: true,
            data: {
                contact,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getUserContacts = async (req, res, next) => {
    try {
        const contacts = await getUserContactsService(req.user.userId);

        return res.status(200).json({
            success: true,
            data: {
                contacts,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getContactById = async (req, res, next) => {
    try {
        const contact = await getContactByIdService(
            req.params.contactId,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            data: {
                contact,
            },
        });
    } catch (error) {
        next(error);
    }
};
