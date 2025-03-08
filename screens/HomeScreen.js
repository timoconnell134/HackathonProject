import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function HomeScreen({ navigation, theme, medications }) {
    const { colors } = theme;

    return (
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
                    )}
                />
            )}
        </View>
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
});
