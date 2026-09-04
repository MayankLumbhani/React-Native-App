import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { loginUser } from "../../src/api/auth.api";
import { saveToken } from "../../src/storage/auth.storage";

export default function LoginScreen() {

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    await removeToken();

    try {
      const data = await loginUser({
        email: email.trim(),
        password,
      });

      await saveToken(data.data.token);

      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.log("Login failed:", error.message);
    }
    console.log("Login failed:", error.message);
  }
};

return (
  <View style={styles.container} >

    <View style={styles.logoContainer}>
      {/* Logo will be added here */}
    </View>

    <Text style={styles.title}>Welcome back</Text>

    <Text style={styles.subtitle}>
      Sign in to continue managing your properties.
    </Text>

    <View style={styles.form}>
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
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Pressable style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>
          Forgot Password?
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>

    <View style={styles.registerContainer}>
      <Text style={styles.registerText}>
        Don't have an account?
      </Text>

      <Pressable onPress={() => router.push("/register")}>
        <Text style={styles.registerLink}> Create account</Text>
      </Pressable>
    </View>

  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    backgroundColor: "#0F172A",
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
    marginBottom: 32,
    paddingHorizontal: 12,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    color: "#64748B",
    textAlign: "center",
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 24,
    paddingVertical: 4,
  },

  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  button: {
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },

  registerText: {
    fontSize: 14,
    color: "#64748B",
  },

  registerLink: {
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