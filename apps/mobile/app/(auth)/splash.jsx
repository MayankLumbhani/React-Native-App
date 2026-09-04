import { View, Text, StyleSheet  } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function SplashScreen() {

    useEffect(() => {

        const timer = setTimeout(() => {
            router.replace("/login")
        }, 2000)

        return () => {
            clearTimeout(timer)
        };

    }, []);

    return (
        <View style={styles.container} >

            <View style={styles.logoContainer} >
                {/* LOGO */}
            </View>

            <Text style={styles.title}>Property Inspection</Text>

            <Text style={styles.subtitle}>
                Inspect. Document. Manage.
            </Text>

            <View style={styles.pagination}>
                <View style={styles.activeDot} />
                <View style={styles.inactiveDot} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFC",
  },

  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    backgroundColor: "#0F172A",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    color: "#64748B",
    textAlign: "center",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    gap: 8,
  },

  activeDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2563EB",
  },

  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
  },
});