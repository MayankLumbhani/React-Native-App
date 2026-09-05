import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchPropertyById, deletePropertyApi } from "../../../src/api/property.api";

export default function PropertyDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPropertyById(id);
            setProperty(data);
        } catch (err) {
            setError(err.message || "Failed to load property details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadDetails();
        }
    }, [id]);

    const handleDelete = () => {
        Alert.alert(
            "Delete Property",
            `Are you sure you want to delete "${property?.title}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setDeleting(true);
                        try {
                            await deletePropertyApi(id);
                            Alert.alert("Success", "Property deleted successfully", [
                                { text: "OK", onPress: () => router.replace("/(app)/(tabs)/properties") },
                            ]);
                        } catch (err) {
                            Alert.alert("Error", err.message || "Failed to delete property");
                        } finally {
                            setDeleting(false);
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.loadingText}>Loading property details...</Text>
            </View>
        );
    }

    if (error || !property) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                <Text style={styles.errorText}>{error || "Property not found"}</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* Header Bar */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    Property Details
                </Text>
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        onPress={() => router.push(`/(app)/properties/edit?id=${property._id}`)}
                        style={styles.iconBtn}
                    >
                        <Ionicons name="create-outline" size={22} color="#2563EB" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={styles.iconBtn} disabled={deleting}>
                        <Ionicons name="trash-outline" size={22} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Primary Image / Gallery */}
            {property.images && property.images.length > 0 ? (
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {property.images.map((imgUri, index) => (
                        <Image key={index} source={{ uri: imgUri }} style={styles.propertyImage} />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Ionicons name="home-outline" size={48} color="#94A3B8" />
                    <Text style={styles.placeholderText}>No Property Images</Text>
                </View>
            )}

            <View style={styles.contentPadding}>
                {/* Main Details Card */}
                <View style={styles.card}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.typeBadge}>{property.type}</Text>
                        <Text style={styles.rentText}>₹{property.rent?.toLocaleString()}/mo</Text>
                    </View>
                    <Text style={styles.titleText}>{property.title}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={18} color="#64748B" />
                        <Text style={styles.addressText}>
                            {property.address}, {property.city}
                        </Text>
                    </View>

                    {property.description ? (
                        <Text style={styles.descriptionText}>{property.description}</Text>
                    ) : null}
                </View>

                {/* Specs Overview */}
                <View style={styles.specsRow}>
                    <View style={styles.specBox}>
                        <Ionicons name="bed-outline" size={24} color="#2563EB" />
                        <Text style={styles.specValue}>{property.bedrooms}</Text>
                        <Text style={styles.specLabel}>Bedrooms</Text>
                    </View>
                    <View style={styles.specBox}>
                        <Ionicons name="water-outline" size={24} color="#059669" />
                        <Text style={styles.specValue}>{property.bathrooms}</Text>
                        <Text style={styles.specLabel}>Bathrooms</Text>
                    </View>
                    <View style={styles.specBox}>
                        <Ionicons name="grid-outline" size={24} color="#D97706" />
                        <Text style={styles.specValue}>{property.rooms?.length || 0}</Text>
                        <Text style={styles.specLabel}>Rooms</Text>
                    </View>
                </View>

                {/* Rooms Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Rooms ({property.rooms?.length || 0})</Text>
                </View>
                <View style={styles.card}>
                    {property.rooms && property.rooms.length > 0 ? (
                        property.rooms.map((room, idx) => (
                            <View
                                key={room._id || idx}
                                style={[
                                    styles.roomItem,
                                    idx === property.rooms.length - 1 && { borderBottomWidth: 0 },
                                ]}
                            >
                                <Ionicons name="location" size={18} color="#64748B" />
                                <Text style={styles.roomName}>{room.name}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptySectionText}>No rooms specified for this property.</Text>
                    )}
                </View>

                {/* Contacts Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Linked Contacts ({property.contacts?.length || 0})</Text>
                    <TouchableOpacity
                        style={styles.addContactBtn}
                        onPress={() => router.push(`/(app)/properties/link-contact?id=${property._id}`)}
                    >
                        <Ionicons name="person-add-outline" size={16} color="#2563EB" />
                        <Text style={styles.addContactText}>Link Contact</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    {property.contacts && property.contacts.length > 0 ? (
                        property.contacts.map((contact, idx) => {
                            const isObj = typeof contact === "object" && contact !== null;
                            return (
                                <View
                                    key={isObj ? contact._id : contact}
                                    style={[
                                        styles.contactItem,
                                        idx === property.contacts.length - 1 && { borderBottomWidth: 0 },
                                    ]}
                                >
                                    <Ionicons name="person-circle-outline" size={24} color="#2563EB" />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.contactName}>
                                            {isObj ? contact.name : `Contact ID: ${contact}`}
                                        </Text>
                                        {isObj && contact.role ? (
                                            <Text style={styles.contactRole}>{contact.role}</Text>
                                        ) : null}
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text style={styles.emptySectionText}>No contacts linked to this property yet.</Text>
                    )}
                </View>

                {/* Location Section */}
                {property.location && (property.location.latitude || property.location.longitude) ? (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Coordinates</Text>
                    </View>
                ) : null}
                {property.location && (property.location.latitude || property.location.longitude) ? (
                    <View style={styles.card}>
                        <Text style={styles.coordText}>Lat: {property.location.latitude || "N/A"}</Text>
                        <Text style={styles.coordText}>Long: {property.location.longitude || "N/A"}</Text>
                    </View>
                ) : null}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    scrollContent: { paddingBottom: 32 },
    centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    loadingText: { marginTop: 12, color: "#64748B" },
    errorText: { marginTop: 8, color: "#EF4444", textAlign: "center" },
    backBtn: { marginTop: 16, backgroundColor: "#2563EB", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    backBtnText: { color: "#FFFFFF", fontWeight: "600" },

    headerBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", flex: 1, marginLeft: 12 },
    iconBtn: { padding: 6 },
    actionRow: { flexDirection: "row", gap: 8 },

    propertyImage: { width: 360, height: 220 },
    imagePlaceholder: {
        width: "100%",
        height: 180,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: { color: "#94A3B8", marginTop: 6, fontSize: 13 },

    contentPadding: { padding: 16 },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    badgeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    typeBadge: { backgroundColor: "#EFF6FF", color: "#2563EB", fontWeight: "600", fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    rentText: { fontSize: 18, fontWeight: "700", color: "#059669" },
    titleText: { fontSize: 20, fontWeight: "700", color: "#0F172A", marginBottom: 6 },
    locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    addressText: { fontSize: 14, color: "#64748B", marginLeft: 4, flex: 1 },
    descriptionText: { fontSize: 14, color: "#475569", lineHeight: 20, borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 10, marginTop: 6 },

    specsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
    specBox: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    specValue: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginTop: 4 },
    specLabel: { fontSize: 12, color: "#64748B", marginTop: 2 },

    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
    addContactBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    addContactText: { fontSize: 13, fontWeight: "600", color: "#2563EB" },

    roomItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    roomName: { fontSize: 14, color: "#334155", marginLeft: 8, fontWeight: "500" },
    emptySectionText: { color: "#94A3B8", fontSize: 13, fontStyle: "italic" },

    contactItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    contactName: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
    contactRole: { fontSize: 12, color: "#64748B" },
    coordText: { fontSize: 13, color: "#475569", fontFamily: "monospace" },
});
