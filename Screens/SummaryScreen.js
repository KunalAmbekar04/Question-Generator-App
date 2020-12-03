import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

class SummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      const summary = this.props.route.params.summary;
      console.log("SUMMARY: ", summary);
      this.setState({
        summary: summary,
      });
    }
  }

  summaryHandler = (text) => {
    this.setState({
      summary: text,
    });
  };

  generateQuestionHandler = () => {
    this.props.navigation.navigate("QuestionList");
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <TextInput
            value={this.state.summary}
            placeholder="Enter content here.."
            onChangeText={(text) => this.summaryHandler(text)}
          />
          <Button
            title="Generate Question"
            onPress={this.generateQuestionHandler}
          />
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

export default SummaryScreen;
