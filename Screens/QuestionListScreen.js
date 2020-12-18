import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  Container,
  Content,
  Text,
  Icon,
  Accordion,
  Spinner,
} from "native-base";
import { API_URL } from "../Utils";

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
      context: "",
      isLoading: false,
    };
  }
  renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  componentDidMount() {
    const data = {
      context: this.props.route.params.context,
    };

    this.setState(
      {
        isLoading: true,
        context: this.props.route.params.context,
      },
      () => {
        fetch(`${API_URL}generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((list) => {
            let questions = [];

            for (let key in list["questions"]) {
              questions.push({
                title: list["questions"][key],
                id: key,
                content: "",
              });
            }
            this.setState({
              isLoading: false,
              questions: questions,
            });
          });
      }
    );
  }

  _renderHeader(item, expanded, index, that) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          width: width * 0.95,
          backgroundColor: "#FFF",
          borderBottomColor: "#dadada",
          borderBottomWidth: 1,
          paddingBottom: 15,
        }}
        activeOpacity={0.7}
        onPress={() => {
          const data = {
            context: that.state.context,
            question: item.title,
          };
          if (item.content === "") {
            fetch(`${API_URL}get_ans`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((resp) => resp.json())
              .then((data) => {
                const questions_temp = [...that.state.questions];
                const new_data = {
                  title: item.title,
                  content: data["answer"],
                };

                questions_temp[index] = new_data;
                this.setState({
                  questions: questions_temp,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        <Text style={{ fontWeight: "600", width: width * 0.7 }}>
          {item.title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="ios-arrow-dropup" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="ios-arrow-dropdown" />
        )}
      </TouchableOpacity>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#DCDCDC",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
      <View style={styles.screen}>
        <Container>
          <Content padder>
            {this.state.isLoading ? (
              <Spinner color="red" />
            ) : (
              <Accordion
                dataArray={this.state.questions}
                icon="add"
                expandedIcon="remove"
                style={styles.item}
                animation={true}
                expanded={true}
                renderHeader={(item, expanded, index) =>
                  this._renderHeader(item, expanded, index, this)
                }
                renderContent={this._renderContent}
              />
            )}
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
    backgroundColor: "white",
  },
  item: {
    // backgroundColor: "#f9c2ff",
    // padding: 20,
    width: width * 0.95,
  },
  title: {
    fontSize: 14,
  },
});

export default QuestionListScreen;
