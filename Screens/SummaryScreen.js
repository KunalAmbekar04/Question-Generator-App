import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { API_URL } from "../Utils";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
} from "native-base";

const { width, height } = Dimensions.get("window");

class SummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      keyword: "",
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      const keyword = this.props.route.params.keyword;

      fetch(`${API_URL}summary?keyword=${keyword}`)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            summary: data["summary"],
            keyword: keyword,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  summaryHandler = (text) => {
    this.setState({
      summary: text,
    });
  };

  generateQuestionHandler = () => {
    console.log("clicked");
    const data = {
      context: this.state.summary,
    };
    // this.props.navigation.navigate("QuestionList", {
    //   questions: [],
    // });
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
        this.props.navigation.navigate("QuestionList", {
          questions: questions,
          context: this.state.summary,
        });
      });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>{this.state.keyword}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{this.state.summary}</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Button iconRight success onPress={this.generateQuestionHandler}>
                <Text>Generate Questions</Text>
                <Icon name="arrow-forward" />
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: height * 0.1,
  },
  textAreaContainer: {
    height: height * 0.75,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    marginBottom: height * 0.05,
    borderRadius: 8,
  },
  textArea: {
    justifyContent: "flex-start",
    width: width * 0.9,
  },
});

export default SummaryScreen;
