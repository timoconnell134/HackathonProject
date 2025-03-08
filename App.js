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
  const [medications, setMedications] = useState([]);

  const theme = darkMode ? MD3DarkTheme : MD3LightTheme;

  // Dynamically set header colors
  const headerBackgroundColor = darkMode ? MD3DarkTheme.colors.background : MD3LightTheme.colors.background;
  const headerTextColor = darkMode ? MD3DarkTheme.colors.onBackground : MD3LightTheme.colors.onBackground;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: headerBackgroundColor }, // ✅ Dynamic background
            headerTintColor: headerTextColor, // ✅ Dynamic text color
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              title: "Home",
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
                setMedications={setMedications}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="AddMedication"
            options={{ title: "Add Medication" }}
          >
            {({ navigation }) => (
              <AddMedicationScreen
                navigation={navigation}
                theme={theme}
                medications={medications}
                setMedications={setMedications}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
