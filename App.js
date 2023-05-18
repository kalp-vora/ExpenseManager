/**
 * The function sets up a navigation container with two screens, Login and Register, using the
 * createStackNavigator component from the React Navigation library.
 * @returns The App component is being returned, which contains a NavigationContainer component from
 * the "@react-navigation/native" library and a StackNavigator component from the
 * "@react-navigation/stack" library. The StackNavigator contains two screens: "Login" and "Register",
 * which are components imported from "./src/pages/Login" and "./src/pages/Register" respectively.
 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import openDBConnection from "./src/Database/DbHelper";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
