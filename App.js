import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme, Button } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import AddMedicationScreen from "./screens/AddMedicationScreen";

const Stack = createStackNavigator();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [medications, setMedications] = useState([]); // ✅ Store medications globally

  const theme = darkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              headerRight: () => (
                <View style={{ marginRight: 10 }}>
                  <Button mode="text" onPress={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </Button>
                </View>
              ),
            }}
          >
            {({ navigation }) => (
              <HomeScreen
                navigation={navigation}
                theme={theme}
                medications={medications}
                setMedications={setMedications} // ✅ Pass state
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddMedication">
            {({ navigation }) => (
              <AddMedicationScreen
                navigation={navigation}
                theme={theme}
                medications={medications}
                setMedications={setMedications} // ✅ Pass state
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
