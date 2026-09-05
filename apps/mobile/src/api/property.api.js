import { API_URL } from "../config/api";
import { getToken } from "../storage/auth.storage";

const getHeaders = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const fetchProperties = async () => {
    const headers = await getHeaders();
    console.log(`[API REQUEST] GET ${API_URL}/api/properties`);
    console.log(`[API HEADERS]`, JSON.stringify(headers));

    try {
        const response = await fetch(`${API_URL}/api/properties`, {
            method: "GET",
            headers,
        });

        console.log(`[API RESPONSE STATUS]`, response.status);
        const data = await response.json();

        if (!response.ok) {
            console.warn("[API FAILED]", data.message);
            throw new Error(data.message || "Failed to fetch properties");
        }
        return data.data.properties;
    } catch (error) {
        console.error(`[API NETWORK/PARSE ERROR] GET /properties failed block:`, error);
        throw error;
    }
};

export const fetchPropertyById = async (propertyId) => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
        method: "GET",
        headers,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch property details");
    }
    return data.data.property;
};

export const createPropertyApi = async (propertyData) => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers,
        body: JSON.stringify(propertyData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create property");
    }
    return data.data.property;
};

export const updatePropertyApi = async (propertyId, propertyData) => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(propertyData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update property");
    }
    return data.data.property;
};

export const deletePropertyApi = async (propertyId) => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
        method: "DELETE",
        headers,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete property");
    }
    return data.data.property;
};

export const linkContactToPropertyApi = async (propertyId, contactId) => {
    const headers = await getHeaders();
    const response = await fetch(
        `${API_URL}/api/properties/${propertyId}/contacts/${contactId}`,
        {
            method: "POST",
            headers,
        }
    );

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to link contact to property");
    }
    return data.data.property;
};
