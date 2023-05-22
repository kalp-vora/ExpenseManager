/**
 * The Register function is a React component that handles user registration and input validation.
 * @returns The Register component is being returned.
 */

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import Regex from "../utils/Regex";
import UserMiddleware from "../middleware/UserMiddleware";
import DbHelper from "../Database/DbHelper";

const Register = () => {
  const navigation = useNavigation();

  // Initialize the user state
  const initUserState = {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Initialize the error state
  const initErrorState = {
    firstName: false,
    lastName: false,
    contact: false,
    email: false,
    password: false,
  };

  const [user, setUser] = useState(initUserState);
  const [isError, setIsError] = useState(initErrorState);

  useEffect(() => {
    const db = DbHelper.init();
    DbHelper.createUserTable(db);
  }, []);

  const handleChange = (fieldName, value) => {
    setUser((previousUser) => ({ ...previousUser, [fieldName]: value }));
  };

  const navigateToLogin = () => {
    // Redirect to login page
    navigation.navigate("Login");
  };

  // Validate user input
  const validate = () => {
    let isValid = false;
    if (!Regex.NAME.test(user.firstName)) {
      setIsError({ ...initErrorState, firstName: true });
    } else if (!Regex.NAME.test(user.lastName)) {
      setIsError({ ...initErrorState, lastName: true });
    } else if (!Regex.EMAIL.test(user.email)) {
      setIsError({ ...initErrorState, email: true });
    } else if (!Regex.CONTACT.test(user.contact)) {
      setIsError({ ...initErrorState, contact: true });
    } else if (!(user.password === user.confirmPassword)) {
      setIsError({ ...initErrorState, password: true });
    } else {
      isValid = true;
    }
    return isValid;
  };

  const handleRegister = () => {
    console.log("Register pressed");
    console.log("User:", user);
    const isValid = validate();
    if (isValid) {
      UserMiddleware.register(
        user,
        (data) => {
          console.log(data);
        },
        (response) => {
          console.log(response);
        }
      );
    } else {
      console.log("Invalid user input");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={user.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={user.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={user.contact}
        onChangeText={(value) => handleChange("contact", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={user.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={user.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={navigateToLogin} />
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

export default Register;
