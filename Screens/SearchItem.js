import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Header,
} from "native-base";

const { width, height } = Dimensions.get("window");

const Item = ({ title, onItemClick }) => (
  <TouchableOpacity
    style={styles.item}
    activeOpacity={0.5}
    onPress={() => {
      onItemClick(title);
    }}
  >
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

class SearchItem extends Component {
  getSummary = (title) => {};

  componentDidMount() {
    console.log(this.props.Data);
  }

  renderItem = ({ item }) => {
    return <Item title={item.title} onItemClick={this.getSummary} />;
  };
  render() {
    return (
      <View style={styles.SearchListContainer}>
        {/* <FlatList
          data={this.props.Data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        /> */}

        <List
          style={{
            width: width * 0.95,
          }}
        >
          {this.props.Data.map((item) => {
            return (
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate("Summary", {
                    keyword: item.title,
                  });
                }}
              >
                <Left>
                  <Text>{item.title}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SearchListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    borderRadius: 8,
    width: width * 0.9,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
  },
});

export default SearchItem;
