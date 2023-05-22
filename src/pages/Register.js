/**
 * The Register function is a React component that handles user registration and input validation.
 * @returns The Register component is being returned, which contains a form for user registration with
 * input fields for first name, last name, contact number, email, password, and confirm password. It
 * also includes buttons for creating an account, clearing the form, and navigating to the login page.
 * The component uses state to manage user input and error messages, and it includes a validation
 * function to ensure that the user input is
 */

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import UserMiddleware from "../middleware/UserMiddleware";
import {
  VStack,
  Text,
  TextInput,
  Button,
  Snackbar,
  Stack,
} from "@react-native-material/core";
import Regex from "../utils/Regex";
import Color from "../utils/Color";

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

  // Initialize the snackbar state
  const snackbarState = {
    show: false,
    message: "Registered successfully",
    style: {
      position: "absolute",
      start: 16,
      end: 8,
      bottom: 16,
      backgroundColor: Color.LOGO_GREEN,
    },
  };

  const [user, setUser] = useState(initUserState);
  const [isError, setIsError] = useState(initErrorState);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(snackbarState);

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

  // HANDLE CLEAR BUTTON
  const handleClear = () => {
    // REGISTER CLEAR
    setUser(initUserState);
    setIsError(initErrorState);
  };

  const handleRegister = () => {
    console.log("Register pressed");
    console.log("User:", user);
    const isValid = validate();
    if (isValid) {
      // Call register middleware
      UserMiddleware.register(
        user,
        (id) => {
          console.log("Inserted User Id: " + id);
          // Clear the form
          handleClear();
          // Show snackbar
          setIsSnackbarVisible({
            ...isSnackbarVisible,
            show: true,
          });
          // Redirect to login page
          setTimeout(() => {
            setIsSnackbarVisible({
              ...isSnackbarVisible,
              show: false,
            });
            navigateToLogin();
          }, 1500);
        },
        (response) => {
          console.log(response);
        }
      );
    }
  };

  return (
    <Stack style={styles.container}>
      <VStack spacing={8}>
        <Text variant="h5" color={Color.LOGO_DARK_BLUE}>
          Welcome to Expense Manager
        </Text>

        <TextInput
          label="First Name"
          variant="outlined"
          style={{ marginBottom: 16 }}
          value={user.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
          color={Color.LOGO_DARK_BLUE}
        />
        {isError.firstName && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Please enter a valid first name
          </Text>
        )}

        <TextInput
          label="Last Name"
          variant="outlined"
          style={{ marginBottom: 16 }}
          value={user.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
          color={Color.LOGO_DARK_BLUE}
        />
        {isError.lastName && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Please enter a valid last name
          </Text>
        )}

        <TextInput
          label="Contact Number"
          variant="outlined"
          style={{ marginBottom: 16 }}
          value={user.contact}
          onChangeText={(value) => handleChange("contact", value)}
          color={Color.LOGO_DARK_BLUE}
        />
        {isError.contact && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Please enter a valid contact number
          </Text>
        )}

        <TextInput
          label="Email"
          variant="outlined"
          style={{ marginBottom: 16 }}
          value={user.email}
          onChangeText={(value) => handleChange("email", value)}
          color={Color.LOGO_DARK_BLUE}
        />
        {isError.email && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Please enter a valid email
          </Text>
        )}

        <TextInput
          label="Password"
          variant="outlined"
          style={{ marginBottom: 16 }}
          secureTextEntry
          value={user.password}
          onChangeText={(value) => handleChange("password", value)}
          color={Color.LOGO_DARK_BLUE}
        />

        <TextInput
          label="Confirm Password"
          variant="outlined"
          style={{ marginBottom: 16 }}
          secureTextEntry
          value={user.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
          color={Color.LOGO_DARK_BLUE}
        />
        {isError.password && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Password and Confirm Password does not match
          </Text>
        )}
      </VStack>

      <VStack spacing={15}>
        <Button
          title="Create Account"
          onPress={handleRegister}
          color={Color.LOGO_BLUE}
          style={{ marginBottom: 16 }}
        />

        <Button
          title="Login"
          onPress={navigateToLogin}
          color={Color.LOGO_BLUE}
        />
      </VStack>
      {snackbarState.show && (
        <Snackbar message={snackbarState.message} style={snackbarState.style} />
      )}
    </Stack>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: Color.APP_BACKGROUND,
  },
});

export default Register;
