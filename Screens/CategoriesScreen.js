import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Card from "../Components/Card/Card";

class CategoriesScreen extends Component {
  render() {
    return (
      <View style={styles.CategoryContainer}>
        <Card
          title="Wiki Search"
          backgroundColor="#9eecff"
          toScreen={() => this.props.navigation.navigate("WikiSearch")}
        />
        <Card
          title="User Input"
          backgroundColor="#ffc7ff"
          toScreen={() => this.props.navigation.navigate("Summary")}
        />
      </View>
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
