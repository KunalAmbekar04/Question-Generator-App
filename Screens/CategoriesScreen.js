import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Card from "../Components/Card/Card";

class CategoriesScreen extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#ff4b1f", "#ff9068"]}
        style={styles.CategoryContainer}
        start={[0, 0]}
        end={[0, 1]}
      >
        <Card
          title="Wiki Search"
          backgroundColor="#9eecff"
          iconName="search"
          textColor="white"
          colors={["#fe8c00", "#f83600"]}
          start={[0, 0]}
          end={[1, 0]}
          toScreen={() => this.props.navigation.navigate("WikiSearch")}
        />
        <Card
          title="User Input"
          backgroundColor="#ffc7ff"
          iconName="ios-man"
          textColor="white"
          colors={["#c31432", "#240b36"]}
          start={[0, 0]}
          end={[1, 1]}
          toScreen={() => this.props.navigation.navigate("Summary")}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  CategoryContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default CategoriesScreen;
