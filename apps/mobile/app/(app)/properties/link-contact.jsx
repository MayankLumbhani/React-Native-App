import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchContacts, createContactApi } from "../../../src/api/contact.api";
import { linkContactToPropertyApi } from "../../../src/api/property.api";

export default function LinkContactScreen() {
    const { id: propertyId } = useLocalSearchParams();
    const router = useRouter();

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [linkingId, setLinkingId] = useState(null);

    // New Contact Inline Form
    const [showNewContact, setShowNewContact] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Tenant");
    const [creating, setCreating] = useState(false);

    const loadContactsList = async () => {
        setLoading(true);
        try {
            const data = await fetchContacts();
            setContacts(data || []);
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContactsList();
    }, []);

    const handleLink = async (contactId) => {
        setLinkingId(contactId);
        try {
            await linkContactToPropertyApi(propertyId, contactId);
            Alert.alert("Success", "Contact linked to property successfully", [
                { text: "OK", onPress: () => router.replace(`/(app)/properties/${propertyId}`) },
            ]);
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to link contact");
        } finally {
            setLinkingId(null);
        }
    };

    const handleCreateContact = async () => {
        if (!name.trim()) {
            Alert.alert("Validation Error", "Contact name is required");
            return;
        }
        setCreating(true);
        try {
            const newContact = await createContactApi({
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim(),
                role,
            });

            // Automatically link the newly created contact
            await handleLink(newContact._id);
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to create contact");
        } finally {
            setCreating(false);
        }
    };

    const renderContactItem = ({ item }) => (
        <View style={styles.contactCard}>
            <Ionicons name="person-circle-outline" size={36} color="#2563EB" />
            <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactSub}>
                    {item.role || "Tenant"} • {item.phone || item.email || "No phone"}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => handleLink(item._id)}
                disabled={linkingId === item._id}
            >
                {linkingId === item._id ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.linkBtnText}>Link</Text>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Link Contact</Text>
                <TouchableOpacity
                    onPress={() => setShowNewContact(!showNewContact)}
                    style={styles.newToggleBtn}
                >
                    <Ionicons name={showNewContact ? "close" : "add"} size={22} color="#2563EB" />
                </TouchableOpacity>
            </View>

            {/* Inline Create Contact Form */}
            {showNewContact && (
                <View style={styles.createForm}>
                    <Text style={styles.createTitle}>Create & Link New Contact</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name *"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity
                        style={styles.createSubmitBtn}
                        onPress={handleCreateContact}
                        disabled={creating}
                    >
                        {creating ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.createSubmitText}>Create & Link</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {/* Existing Contacts List */}
            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.loadingText}>Loading contacts...</Text>
                </View>
            ) : contacts.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                    <Text style={styles.emptyTitle}>No Contacts Available</Text>
                    <Text style={styles.emptySubtitle}>
                        Tap the "+" icon above to create your first contact.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item._id}
                    renderItem={renderContactItem}
                    contentContainerStyle={styles.listPadding}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
    newToggleBtn: { padding: 4 },

    centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    loadingText: { marginTop: 12, color: "#64748B" },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginTop: 12 },
    emptySubtitle: { fontSize: 13, color: "#64748B", textAlign: "center", marginTop: 4 },

    createForm: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    createTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A", marginBottom: 10 },
    input: {
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: "#0F172A",
        marginBottom: 8,
    },
    createSubmitBtn: {
        backgroundColor: "#2563EB",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 4,
    },
    createSubmitText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },

    listPadding: { padding: 16 },
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    contactDetails: { flex: 1, marginLeft: 12 },
    contactName: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
    contactSub: { fontSize: 12, color: "#64748B", marginTop: 2 },
    linkBtn: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    linkBtnText: { color: "#FFFFFF", fontWeight: "600", fontSize: 13 },
});
