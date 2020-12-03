import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class SummaryScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>SummaryScreen</Text>
        <Button
          title="Generate Question"
          onPress={() => this.props.navigation.navigate("QuestionList")}
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

export default SummaryScreen;