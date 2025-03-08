import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function HomeScreen({ navigation, theme, medications, setMedications }) {
    const { colors } = theme;

    // Function to delete a medication
    function deleteMedication(id) {
        Alert.alert("Delete", "Are you sure you want to delete this medication?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    // ✅ Remove the medication from state
                    setMedications((prevMedications) => prevMedications.filter((med) => med.id !== id));
                },
            },
        ]);
    }

    // Swipeable delete action
    const renderRightActions = (id) => (
        <View style={styles.deleteContainer}>
            <IconButton icon="delete" size={24} iconColor="white" onPress={() => deleteMedication(id)} />
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Button mode="contained" onPress={() => navigation.navigate("AddMedication")}>
                    Add Medication
                </Button>

                {medications.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 20, color: colors.onBackground }}>
                        No medications added yet.
                    </Text>
                ) : (
                    <FlatList
                        data={medications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                                <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                                    <Card.Content>
                                        <Text style={{ color: colors.onSurface }} variant="titleMedium">
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: colors.onSurface }} variant="bodyMedium">
                                            Time: {item.time}
                                        </Text>
                                    </Card.Content>
                                </Card>
                            </Swipeable>
                        )}
                    />
                )}
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginVertical: 8,
        padding: 10,
    },
    deleteContainer: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
    },
});
