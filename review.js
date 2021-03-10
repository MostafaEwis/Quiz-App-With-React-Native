import React from "react";
import Constants from "expo-constants";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "./colors";
import { useState } from "react";
const Review = ({ route, navigation }) => {
  console.log(route);
  const [state, setState] = useState({
    right: route.params.right,
    answers: route.params.answers,
  });
  const countScore = () => {
    let points = 0;
    for (let i = 0; i < state.right.length; i++) {
      if (state.right[i] == state.answers[i]) {
        points++;
      }
    }
    return points;
  };
  let score = countScore();

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        Score : {score} / {state.right.length}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.btnText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  btn: {
    position: "absolute",
    bottom: "30%",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderStyle: "solid",
  },
  btnText: {
    fontFamily: "Poppins-Medium",
    color: colors.primary,
    fontSize: 15,
  },
  score: {
    position: "absolute",
    top: "30%",
    fontFamily: "Poppins-Medium",
    color: colors.secondary,
    fontSize: 40,
  },
});
