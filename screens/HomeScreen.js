import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Welcome to the Medication Reminder App! 🚀</Text>
            <Button title="Add Medication" onPress={() => navigation.navigate("AddMedication")} />
        </View>
    );
}
