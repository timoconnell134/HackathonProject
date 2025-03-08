import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { db, collection, addDoc } from "../firebaseConfig";

export default function AddMedicationScreen({ navigation, theme }) {
    const { colors } = theme;
    const [name, setName] = useState("");
    const [time, setTime] = useState("");

    async function handleSave() {
        if (!name || !time) {
            Alert.alert("Error", "Please enter both medication name and time.");
            return;
        }

        try {
            // Save to Firestore
            await addDoc(collection(db, "medications"), { name, time });
            Alert.alert("Success", `Medication "${name}" added at ${time}`);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to save medication.");
            console.error("Firestore Error: ", error);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text variant="titleLarge" style={{ color: colors.onBackground }}>
                Enter Medication Details:
            </Text>

            <TextInput
                label="Medication Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={{ colors: { text: colors.onSurface, placeholder: colors.onSurface } }}
            />

            <TextInput
                label="Time (e.g., 08:00 AM)"
                mode="outlined"
                value={time}
                onChangeText={setTime}
                style={styles.input}
                theme={{ colors: { text: colors.onSurface, placeholder: colors.onSurface } }}
            />

            <Button mode="contained" onPress={handleSave} style={styles.button}>
                Save Medication
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});
