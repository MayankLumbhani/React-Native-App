import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Image,
  Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchProperties } from "../../../src/api/property.api";
import { API_URL } from "../../../src/config/api"; // Added for diagnostics

export default function PropertiesScreen() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadProperties = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchProperties();
      setProperties(data || []);
    } catch (err) {
      const errorMsg = err.message || "Failed to load properties";
      setError(errorMsg);
      Alert.alert(
        "Network Diagnostic",
        `API_URL: ${API_URL}\n\nError: ${errorMsg}\n\nStack: ${err.stack || "N/A"}`,
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProperties();
    }, [])
  );

  const filteredProperties = properties.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.city?.toLowerCase().includes(q) ||
      item.type?.toLowerCase().includes(q) ||
      item.address?.toLowerCase().includes(q)
    );
  });

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(app)/properties/${item._id}`)}
      activeOpacity={0.7}
    >
      {item.images && item.images.length > 0 ? (
        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="home-outline" size={36} color="#94A3B8" />
        </View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.badgeRow}>
          <Text style={styles.typeBadge}>{item.type || "Apartment"}</Text>
          <Text style={styles.rentText}>₹{item.rent?.toLocaleString()}/mo</Text>
        </View>

        <Text style={styles.titleText} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#64748B" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.address}, {item.city}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="bed-outline" size={16} color="#475569" />
            <Text style={styles.metaText}>{item.bedrooms} Beds</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="water-outline" size={16} color="#475569" />
            <Text style={styles.metaText}>{item.bathrooms} Baths</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="grid-outline" size={16} color="#475569" />
            <Text style={styles.metaText}>{item.rooms?.length || 0} Rooms</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Properties</Text>
          <Text style={styles.headerSubtitle}>
            {properties.length} {properties.length === 1 ? "Property" : "Properties"} registered
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(app)/properties/add")}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, city, or address..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      {loading && !refreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadProperties()}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : filteredProperties.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="home-outline" size={56} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>
            {searchQuery ? "No matching properties" : "No Properties Yet"}
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery
              ? "Try adjusting your search query."
              : "Tap the '+' button above to add your first property."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item._id}
          renderItem={renderPropertyCard}
          contentContainerStyle={styles.listPadding}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadProperties(true)}
              colors={["#2563EB"]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#2563EB",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    padding: 16,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  typeBadge: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rentText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#475569",
    marginLeft: 4,
    fontWeight: "500",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
  errorText: {
    marginTop: 8,
    color: "#EF4444",
    fontSize: 14,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },
});