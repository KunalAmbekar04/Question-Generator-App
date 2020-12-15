import { Icon } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={{
          ...styles.card,
        }}
        onPress={props.toScreen}
      >
        <LinearGradient
          colors={props.colors}
          start={props.start}
          end={props.end}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Icon name={props.iconName} style={{ fontSize: 70, color: "white" }} />
        <Text style={{ ...styles.cardTitle }}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: "10%",
    marginTop: "10%",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  cardTitle: {
    fontSize: 30,
    padding: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Card;
