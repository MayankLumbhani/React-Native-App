import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchPropertyById, updatePropertyApi } from "../../../src/api/property.api";

const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Office", "Shop", "Other"];

export default function EditPropertyScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Apartment");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [bedrooms, setBedrooms] = useState("1");
    const [bathrooms, setBathrooms] = useState("1");
    const [rent, setRent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [images, setImages] = useState([]);
    const [roomInput, setRoomInput] = useState("");
    const [rooms, setRooms] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        if (id) {
            loadExistingData();
        }
    }, [id]);

    const loadExistingData = async () => {
        setLoading(true);
        try {
            const data = await fetchPropertyById(id);
            setTitle(data.title || "");
            setType(data.type || "Apartment");
            setDescription(data.description || "");
            setAddress(data.address || "");
            setCity(data.city || "");
            setBedrooms(String(data.bedrooms || 1));
            setBathrooms(String(data.bathrooms || 1));
            setRent(String(data.rent || ""));
            setImages(data.images || []);
            setRooms(data.rooms || []);
            if (data.location) {
                setLatitude(String(data.location.latitude || ""));
                setLongitude(String(data.location.longitude || ""));
            }
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to load property data");
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = () => {
        if (!imageUrl.trim()) return;
        setImages([...images, imageUrl.trim()]);
        setImageUrl("");
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddRoom = () => {
        if (!roomInput.trim()) return;
        setRooms([...rooms, { name: roomInput.trim() }]);
        setRoomInput("");
    };

    const handleRemoveRoom = (index) => {
        setRooms(rooms.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert("Validation Error", "Title is required");
            return;
        }
        if (!address.trim() || !city.trim()) {
            Alert.alert("Validation Error", "Address and City are required");
            return;
        }
        if (!rent || isNaN(Number(rent)) || Number(rent) < 0) {
            Alert.alert("Validation Error", "Please enter a valid positive rent amount");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                title: title.trim(),
                type,
                description: description.trim(),
                address: address.trim(),
                city: city.trim(),
                bedrooms: parseInt(bedrooms, 10) || 1,
                bathrooms: parseInt(bathrooms, 10) || 1,
                rent: parseFloat(rent),
                images,
                rooms,
                ...(latitude || longitude
                    ? {
                        location: {
                            latitude: parseFloat(latitude) || 0,
                            longitude: parseFloat(longitude) || 0,
                        },
                    }
                    : {}),
            };

            await updatePropertyApi(id, payload);
            Alert.alert("Success", "Property updated successfully", [
                { text: "OK", onPress: () => router.replace(`/(app)/properties/${id}`) },
            ]);
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to update property");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.loadingText}>Loading property data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Property</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.formPadding}>
                {/* Title */}
                <Text style={styles.label}>Property Title *</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} />

                {/* Property Type Selector */}
                <Text style={styles.label}>Property Type *</Text>
                <View style={styles.typeContainer}>
                    {PROPERTY_TYPES.map((t) => (
                        <TouchableOpacity
                            key={t}
                            style={[styles.typeOption, type === t && styles.typeOptionSelected]}
                            onPress={() => setType(t)}
                        >
                            <Text style={[styles.typeText, type === t && styles.typeTextSelected]}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Rent */}
                <Text style={styles.label}>Monthly Rent (₹) *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={rent}
                    onChangeText={setRent}
                />

                {/* Address & City */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.label}>Address *</Text>
                        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.label}>City *</Text>
                        <TextInput style={styles.input} value={city} onChangeText={setCity} />
                    </View>
                </View>

                {/* Bedrooms & Bathrooms */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.label}>Bedrooms</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            value={bedrooms}
                            onChangeText={setBedrooms}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.label}>Bathrooms</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            value={bathrooms}
                            onChangeText={setBathrooms}
                        />
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    multiline
                    numberOfLines={3}
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Rooms */}
                <Text style={styles.label}>Rooms</Text>
                <View style={styles.addInputRow}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Room name..."
                        value={roomInput}
                        onChangeText={setRoomInput}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddRoom}>
                        <Ionicons name="add" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.chipRow}>
                    {rooms.map((rm, idx) => (
                        <View key={idx} style={styles.chip}>
                            <Text style={styles.chipText}>{rm.name}</Text>
                            <TouchableOpacity onPress={() => handleRemoveRoom(idx)}>
                                <Ionicons name="close-circle" size={16} color="#64748B" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Images */}
                <Text style={styles.label}>Property Image URLs</Text>
                <View style={styles.addInputRow}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Image URL..."
                        value={imageUrl}
                        onChangeText={setImageUrl}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddImage}>
                        <Ionicons name="add" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.chipRow}>
                    {images.map((img, idx) => (
                        <View key={idx} style={styles.chip}>
                            <Text style={styles.chipText} numberOfLines={1}>
                                Image {idx + 1}
                            </Text>
                            <TouchableOpacity onPress={() => handleRemoveImage(idx)}>
                                <Ionicons name="close-circle" size={16} color="#64748B" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Coordinates */}
                <Text style={styles.label}>Location Coordinates (Optional)</Text>
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Latitude"
                            keyboardType="numeric"
                            value={latitude}
                            onChangeText={setLatitude}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Longitude"
                            keyboardType="numeric"
                            value={longitude}
                            onChangeText={setLongitude}
                        />
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitBtn, submitting && styles.btnDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitBtnText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    loadingText: { marginTop: 12, color: "#64748B" },
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

    formPadding: { padding: 16, paddingBottom: 36 },
    label: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 6, marginTop: 12 },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#0F172A",
        marginBottom: 4,
    },
    multilineInput: { height: 70, textAlignVertical: "top" },
    row: { flexDirection: "row" },

    typeContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 4 },
    typeOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#E2E8F0",
    },
    typeOptionSelected: { backgroundColor: "#2563EB" },
    typeText: { fontSize: 13, color: "#475569", fontWeight: "500" },
    typeTextSelected: { color: "#FFFFFF", fontWeight: "700" },

    addInputRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
    addBtn: {
        backgroundColor: "#2563EB",
        width: 44,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    chipText: { fontSize: 12, color: "#1D4ED8", fontWeight: "500" },

    submitBtn: {
        backgroundColor: "#2563EB",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
    },
    btnDisabled: { backgroundColor: "#93C5FD" },
    submitBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
