import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Login successful:", userCredential.user.email);
            // 🚀 No need for navigation here! App.js will automatically switch screens
        } catch (error) {
            Alert.alert("Login Error", error.message);
            console.error("❌ Login failed:", error);
        }
    }

    async function handleSignup() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("✅ Signup successful:", userCredential.user.email);
            // 🚀 No need for navigation here! App.js will automatically switch screens
        } catch (error) {
            Alert.alert("Signup Error", error.message);
            console.error("❌ Signup failed:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Enter email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                placeholder="Enter password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />

            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});
