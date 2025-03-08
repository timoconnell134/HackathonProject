import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function CustomButton({ title, onPress }) {
    return (
        <Button mode="contained" onPress={onPress} style={styles.button}>
            {title}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        backgroundColor: "#6200EE",
    },
});
