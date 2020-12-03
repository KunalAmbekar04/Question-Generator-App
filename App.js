import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainStackNavigator from "./Navigation/Navigator";
import CategoriesScreen from "./Screens/CategoriesScreen";

class App extends Component {
  render() {
    return <MainStackNavigator />;
  }
}

export default App;
