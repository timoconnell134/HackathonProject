import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function AddMedicationScreen({ navigation }) {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");

    function handleSave() {
        console.log(`Saved: ${name} at ${time}`);
        navigation.goBack();
    }

    return (
        <View>
        <Text>Enter Medication Details: </Text>
            < TextInput placeholder = "Medication Name" onChangeText = { setName } />
                <TextInput placeholder="Time (e.g., 08:00 AM)" onChangeText = { setTime } />
                    <Button title="Save" onPress = { handleSave } />
                        </View>
  );
}
