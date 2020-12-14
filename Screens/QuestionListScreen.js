import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
} from "native-base";

const { width, height } = Dimensions.get("window");

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.question}</Text>
  </View>
);

class QuestionListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  componentDidMount() {
    this.setState({
      questions: this.props.route.params.questions,
    });
  }
  render() {
    return (
      <View style={styles.screen}>
        <Container>
          {/* <FlatList
          data={this.props.Data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        /> */}
          <Content>
            <List
              style={{
                width: width,
              }}
            >
              {this.state.questions.map((item, id) => {
                return (
                  <ListItem key={id}>
                    <Left>
                      <Text>{item.question}</Text>
                    </Left>
                  </ListItem>
                );
              })}
            </List>
          </Content>
        </Container>
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
    borderRadius: 8,
    width: width * 0.9,
    marginTop: 15,
  },
  title: {
    fontSize: 14,
  },
});

export default QuestionListScreen;
