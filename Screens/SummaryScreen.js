import React, { Component } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
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
import { TextInput } from "react-native-gesture-handler";
import AwesomeAlert from "react-native-awesome-alerts";

const { width, height } = Dimensions.get("window");

class SummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      keyword: "",
      question: "",
      answer: "",
      isLoading: true,
      showAlert: false,
      title: "Answer",
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

  askQuestionHandler = () => {
    this.setState(
      {
        showAlert: true,
        isLoading: true,
        title: "Loading",
      },
      () => {
        const data = {
          context: this.state.summary,
          question: this.state.question,
        };
        if (this.state.question === "") {
          this.setState({
            isLoading: false,
            title: "Error",
            answer: "Please Enter the Question.",
          });
        } else {
          fetch(`${API_URL}get_ans`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((resp) => resp.json())
            .then((res) => {
              console.log(res);
              this.setState({
                title: "Answer",
                answer: res.answer,
                isLoading: false,
              });
            });
        }
      }
    );
  };

  switchAlertOn = () => {
    this.setState({
      showAlert: true,
    });
  };

  switchAlertOff = () => {
    this.setState({
      showAlert: false,
      answer: "",
    });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>
                {this.state.keyword ? this.state.keyword : "Your Content"}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <TextInput
                  {...this.props}
                  onChangeText={(text) => this.setState({ summary: text })}
                  multiline={true}
                  placeholder="Start typing.."
                >
                  {this.state.summary}
                </TextInput>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Button iconRight success onPress={this.generateQuestionHandler}>
                <Text>Generate Questions</Text>
                <Icon name="arrow-forward" />
              </Button>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Your Question</Text>
            </CardItem>
            <CardItem>
              <Body>
                <TextInput
                  {...this.props}
                  onChangeText={(text) => this.setState({ question: text })}
                  multiline={true}
                  placeholder="Start typing.."
                >
                  {this.state.question}
                </TextInput>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Button iconRight success onPress={this.askQuestionHandler}>
                <Text>Ask a Question</Text>
                <Icon name="arrow-forward" />
              </Button>
              <AwesomeAlert
                show={this.state.showAlert}
                showProgress={this.state.isLoading}
                title={this.state.title}
                message={this.state.answer}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                cancelButtonColor="#DD6B55"
                onCancelPressed={this.switchAlertOff}
              />
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
