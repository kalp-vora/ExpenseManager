/**
 * This is a React Native component for a login screen with email and password input fields, login and
 * registration buttons, and navigation functionality.
 * @returns The Login component is being returned, which contains a view with two text inputs for email
 * and password, and two buttons for login and registration. The component also has state variables for
 * email and password, and functions to handle login and registration. The component is styled using a
 * StyleSheet.
 */
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  IconButton,
  Text,
  TextInput,
  Button,
  Flex,
} from "@react-native-material/core";
import { View, StyleSheet, Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Regex from "../utils/Regex";
import Color from "../utils/Color";
import UserMiddleware from "../middleware/UserMiddleware";

const Login = () => {
  const navigation = useNavigation();

  // Initialize the snackbar state
  const snackbarState = {
    show: false,
    message: "Login successfull",
    style: {
      position: "absolute",
      start: 16,
      end: 8,
      bottom: 16,
      backgroundColor: Color.LOGO_GREEN,
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(snackbarState);

  const navigateToHome = () => {
    // Redirect to home page
    // navigation.navigate("Home");
  };
  
  const navigateToRegister = () => {
    // Redirect to registration page
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    // Handle login logic here, e.g., send login request to backend
    console.log("Login pressed");
    console.log("Email: ", email);
    console.log("Password: ", password);
    if (!Regex.EMAIL.test(email)) {
      setIsEmailValid(false);
    }
    if (isEmailValid) {
      UserMiddleware.login(
        { email: email, password: password },
        (loginSuccess) => {
          if (loginSuccess) {
            // Clear the email and password fields
            setEmail("");
            setPassword("");
            // Show a snackbar
            setIsSnackbarVisible({
              ...isSnackbarVisible,
              show: true,
            });
            // Redirect to home page
            setTimeout(() => {
              setIsSnackbarVisible({
                ...isSnackbarVisible,
                show: false,
              });
              navigateToHome();
            }, 1500);
          }
        },
        (response) => {
          console.error("Login error: ", response);
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Flex style={styles.logoTextContainer}>
        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
        <Text variant="h5" color={Color.LOGO_DARK_BLUE}>
          Expense Manager
        </Text>
      </Flex>
      <Flex style={styles.inputContainer}>
        <TextInput
          label="Email"
          variant="outlined"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 16 }}
          color={Color.LOGO_DARK_BLUE}
        />
        {!isEmailValid && (
          <Text variant="body2" color={Color.LOGO_RED}>
            Please enter a valid email address
          </Text>
        )}
        <TextInput
          label="Password"
          variant="outlined"
          value={password}
          onChangeText={setPassword}
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="eye" {...props} />}
              {...props}
            />
          )}
          style={{ marginBottom: 16 }}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          style={{ marginBottom: 16 }}
          color={Color.LOGO_BLUE}
        />
        <Button
          title="Create Account"
          onPress={navigateToRegister}
          color={Color.LOGO_BLUE}
        />
      </Flex>
    </View>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: Color.APP_BACKGROUND,
  },
  logoTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 200,
  },
  inputContainer: {
    margin: 16,
  },
});

export default Login;
