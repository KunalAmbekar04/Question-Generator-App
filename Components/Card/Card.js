import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={{
          ...styles.card,
          backgroundColor: props.backgroundColor,
        }}
        onPress={props.toScreen}
      >
        <Text style={styles.cardTitle}>{props.title}</Text>
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
  },
  cardTitle: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
});

export default Card;
