import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme, Button } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddMedicationScreen from "./screens/AddMedicationScreen";

const Stack = createStackNavigator();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [medications, setMedications] = useState([]);
  const [user, setUser] = useState(null); // ✅ Track authentication state

  const theme = darkMode ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    // ✅ Detect login/logout changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup listener
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? ( // ✅ Show home screen if logged in
            <>
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
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} // ✅ Hide top bar on login screen
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
