import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

export default function AddMedicationScreen({ navigation, theme, medications, setMedications }) {
    const { colors } = theme;
    const [name, setName] = useState("");
    const [time, setTime] = useState("");

    function handleSave() {
        if (!name || !time) {
            Alert.alert("Error", "Please enter both medication name and time.");
            return;
        }

        // ✅ Create new medication object
        const newMedication = { id: `${Date.now()}`, name, time };

        // ✅ Update the UI immediately
        setMedications([...medications, newMedication]);

        // ✅ Show success message
        Alert.alert("Success", `Medication "${name}" added at ${time}`);

        // ✅ Go back to Home Screen
        navigation.goBack();
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
