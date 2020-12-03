import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class WikiSearchScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>WikiSearchScreen</Text>
        <Button
          title="Search"
          onPress={() => this.props.navigation.navigate("Summary")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WikiSearchScreen;
