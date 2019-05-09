import { Text, View, StyleSheet } from "react-native";

// OUR IDENTITY COLORS
const styleMainColor = "#2699FB";
const styleOnMainColor = "#1D6098";

const styleNavigationHeaderStyle = {
  headerStyle: {
    backgroundColor: "#F8F8F8"
  },
  headerTintColor: "#000000",
  headerTitleStyle: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  }
};

// STYLE BOTTOM NAVIGATION
const sizeHomeButtonTabBar = 40;
const sizeNotHomeButtonTabBar = 25;

const globalStyles = StyleSheet.create({
  h2: {
    color: styleMainColor,
    fontWeight: "bold",
    fontSize: 20,
    padding: 10
  },
  button: {
    backgroundColor: styleMainColor,
    borderRadius: 20,
    padding: 10,
    // width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});

export {
  styleNavigationHeaderStyle,
  styleMainColor,
  styleOnMainColor,
  sizeHomeButtonTabBar,
  sizeNotHomeButtonTabBar,
  globalStyles
};
