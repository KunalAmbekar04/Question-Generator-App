import { Header, Item, Icon, Input, Content, Container } from "native-base";
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
import { FontAwesome } from "@expo/vector-icons";

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
    console.log(word);
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
          <Header searchBar>
            <Item style={{ padding: 10 }}>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={(text) => this.keywordHandler(text)}
                onSubmitEditing={this.searchHandler}
                placeholder="Enter Keyword.."
              />
              <FontAwesome name="wikipedia-w" size={24} color="black" />
            </Item>
            {/* <Button transparent>
              <Text>Search</Text>
            </Button> */}
          </Header>
          {/* <View style={styles.searchContainer}>
            <TextInput
              placeholder="Enter Keyword.."
              onChangeText={(text) => this.keywordHandler(text)}
              style={styles.inputStyle}
            />
            <Button title="Search" onPress={} />
          </View> */}
          {this.state.searchList.length === 0 ? (
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <Text>Enter Valid Text</Text>
            </View>
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
