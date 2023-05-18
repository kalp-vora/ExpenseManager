/**
 * This is a React Native component for a login screen with email and password input fields, login and
 * registration buttons, and navigation functionality.
 * @returns The Login component is being returned, which contains a view with two text inputs for email
 * and password, and two buttons for login and registration. The component also has state variables for
 * email and password, and functions to handle login and registration. The component is styled using a
 * StyleSheet.
 */
import React, { useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here, e.g., send login request to backend
    console.log("Login pressed");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const navigateToRegister = () => {
    // Redirect to registration page
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={navigateToRegister} />
    </View>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Login;
