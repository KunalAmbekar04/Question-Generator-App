import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const DATA = [
  {
    id: "1",
    title: "First Question",
  },
  {
    id: "2",
    title: "Second Question",
  },
  {
    id: "3",
    title: "Third Question",
  },
  {
    id: "4",
    title: "Fourth Question",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class QuestionListScreen extends Component {
  renderItem = ({ item }) => {
    return <Item title={item.title} />;
  };
  render() {
    return (
      <View>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default QuestionListScreen;
