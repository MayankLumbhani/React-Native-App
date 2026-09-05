import { API_URL } from "../config/api";
import { getToken } from "../storage/auth.storage";

const getHeaders = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const fetchContacts = async () => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/contacts`, {
        method: "GET",
        headers,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch contacts");
    }
    return data.data.contacts;
};

export const createContactApi = async (contactData) => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify(contactData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create contact");
    }
    return data.data.contact;
};
