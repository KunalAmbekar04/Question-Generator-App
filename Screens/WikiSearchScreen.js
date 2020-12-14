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
  Dimensions,
} from "react-native";
import { API_URL } from "../Utils";
import SearchItem from "./SearchItem";

const { width, height } = Dimensions.get("window");

class WikiSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      summary: "",
      searchList: [],
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
      fetch(`${API_URL}/search?q=${this.state.keyword}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          let searchList = [];

          for (let key in data["searchList"]) {
            searchList.push({ title: data["searchList"][key], id: key });
          }
          this.setState({
            searchList: searchList,
          });
        });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Enter Keyword.."
              onChangeText={(text) => this.keywordHandler(text)}
              style={styles.inputStyle}
            />
            <Button title="Search" onPress={this.searchHandler} />
          </View>
          {this.state.searchList.length === 0 ? (
            <Text>Enter Valid Text</Text>
          ) : (
            <SearchItem
              Data={this.state.searchList}
              navigation={this.props.navigation}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: height * 0.1,
  },

  searchContainer: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.1,
  },
  inputStyle: {
    borderColor: "black",
    borderWidth: 1,
    width: width * 0.65,
    padding: 5,
    marginRight: 20,
  },
});

export default WikiSearchScreen;
