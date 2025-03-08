import React, { useState } from "react";
import { View, StyleSheet, Alert, Platform, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddMedicationScreen({ navigation, theme, medications, setMedications }) {
    const { colors } = theme;
    const [name, setName] = useState("");
    const [time, setTime] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date()); // ✅ Holds temporary selection
    const [showPicker, setShowPicker] = useState(false);

    // Format time for display
    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    function handleSave() {
        if (!name) {
            Alert.alert("Error", "Please enter a medication name.");
            return;
        }

        const newMedication = { id: `${Date.now()}`, name, time: formattedTime };
        setMedications([...medications, newMedication]);

        Alert.alert("Success", `Medication "${name}" added at ${formattedTime}`);
        navigation.goBack();
    }

    function confirmTimeSelection() {
        setTime(selectedTime); // ✅ Only update time when "Confirm" is pressed
        setShowPicker(false); // ✅ Hide picker
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

            {/* Time Picker Trigger */}
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <TextInput
                    label="Time"
                    mode="outlined"
                    value={formattedTime}
                    style={styles.input}
                    editable={false} // Prevent manual typing
                    pointerEvents="none" // Ensures only touch opens picker
                    theme={{ colors: { text: colors.onSurface, placeholder: colors.onSurface } }}
                />
            </TouchableOpacity>

            {/* Actual Time Picker */}
            {showPicker && (
                <View style={styles.pickerContainer}>
                    <DateTimePicker
                        value={selectedTime} // ✅ Use temporary state for live updates
                        mode="time"
                        display={Platform.OS === "ios" ? "spinner" : "clock"}
                        is24Hour={false}
                        onChange={(event, pickedTime) => {
                            if (pickedTime) setSelectedTime(pickedTime); // ✅ Update temp state
                        }}
                    />

                    {/* Confirm & Cancel Buttons */}
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={confirmTimeSelection} style={styles.confirmButton}>
                            Confirm
                        </Button>
                        <Button mode="outlined" onPress={() => setShowPicker(false)} style={styles.cancelButton}>
                            Cancel
                        </Button>
                    </View>
                </View>
            )}

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
    pickerContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
    },
    confirmButton: {
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        flex: 1,
        marginLeft: 5,
    },
    button: {
        marginTop: 20,
    },
});
