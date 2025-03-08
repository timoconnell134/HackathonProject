import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation, theme, medications, setMedications }) {
    const { colors } = theme;

    // ✅ Function to log out the user
    async function handleLogout() {
        try {
            await signOut(auth);
            console.log("✅ User logged out");
        } catch (error) {
            Alert.alert("Logout Error", error.message);
            console.error("❌ Logout failed:", error);
        }
    }

    function deleteMedication(id) {
        Alert.alert("Delete", "Are you sure you want to delete this medication?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setMedications((prevMedications) => prevMedications.filter((med) => med.id !== id));
                },
            },
        ]);
    }

    // ✅ Sort medications by time
    const sortedMedications = [...medications].sort((a, b) => {
        const timeA = a.time.split(":").map(Number);
        const timeB = b.time.split(":").map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    const renderRightActions = (id) => (
        <View style={styles.deleteContainer}>
            <IconButton icon="delete" size={24} iconColor="white" onPress={() => deleteMedication(id)} />
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* ✅ Logout button */}
                <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                    Logout
                </Button>

                <Button mode="contained" onPress={() => navigation.navigate("AddMedication")}>
                    Add Medication
                </Button>

                {sortedMedications.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 20, color: colors.onBackground }}>
                        No medications added yet.
                    </Text>
                ) : (
                    <FlatList
                        data={sortedMedications}
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
    logoutButton: {
        marginBottom: 10,
        backgroundColor: "red", // ✅ Red logout button
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
