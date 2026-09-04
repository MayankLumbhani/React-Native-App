import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { registerUser } from "../../src/api/auth.api";

export default function RegisterScreen() {

  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleRegister = async () => {

    console.log("CREATE ACCOUNT BUTTON CLICKED");

  const newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  console.log("VALIDATION ERRORS:", newErrors);

  if (Object.keys(newErrors).length > 0) {
      console.log("VALIDATION FAILED");
    return;
  }

  console.log("VALIDATION PASSED");

  try {

    console.log("CALLING REGISTER API");

    const data = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    console.log("Registration successful:", data);
    router.replace("/login");
    
  } catch (error) {
    console.log("Registration failed:", error.message);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <Text>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>SafeInspect</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Create your account</Text>

        <Text style={styles.subtitle}>
          Start managing your property inspections.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          {errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Text style={styles.label}>Confirm Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <Pressable
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.loginLink}> Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
    marginRight: 42,
  },

  formContainer: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    color: "#64748B",
  },

  form: {
    width: "100%",
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 15,
  },

  button: {
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30,
  },

  loginText: {
    fontSize: 14,
    color: "#64748B",
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },

  errorText: {
    marginTop: -12,
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#DC2626",
  },
});