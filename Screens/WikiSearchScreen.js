import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

class WikiSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      summary: "",
    };
  }

  keywordHandler = (word) => {
    this.setState({
      keyword: word,
    });
  };

  searchHandler = () => {
    if (this.state.keyword === "") {
      Alert.alert("Enter Keyword!");
    } else {
      this.props.navigation.navigate("Summary", {
        summary: this.state.keyword,
      });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <TextInput
            placeholder="Enter Keyword.."
            onChangeText={(text) => this.keywordHandler(text)}
          />
          <Button title="Search" onPress={this.searchHandler} />
        </View>
      </TouchableWithoutFeedback>
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
