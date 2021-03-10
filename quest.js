import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "./colors";

const Quest = ({ route, navigation }) => {
  const [state, setState] = useState({
    quests: route.params.quests.results,
    questCount: 0,
    answers: [["", 1]],
    choosed: false,
  });

  const getRightAnswers = () => {
    let arr = [];
    for (let i = 0; i < state.quests.length; i++) {
      arr[i] = state.quests[i].correct_answer;
    }
    return arr;
  };

  let rightAnswers = getRightAnswers();

  const forwardQuest = () => {
    if (state.questCount < state.quests.length) {
      setState((prevState) => ({
        ...prevState,
        questCount: prevState.questCount + 1,
      }));
    }
  };
  const lastQuest = () => {
    if (state.questCount > 0) {
      setState((prevState) => ({
        ...prevState,
        questCount: prevState.questCount - 1,
      }));
    }
  };
  // const addAnswer = (answer) => {
  //   if (answer == state.answers[state.answers.indexOf(answer)]) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       answers: prevState.answers.splice(prevState.answers.indexOf(answer), 1),
  //     }));
  //   } else if (answer[1] == state.answers[state.answers.indexOf(answer)][1]) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       answers: prevState.answers.splice(prevState.answers.indexOf(answer), 1),
  //     }));
  //     setState((prevState) => ({
  //       ...prevState,
  //       answers: [...prevState, answer],
  //     }));
  //   } else {
  //     setState((prevState) => ({
  //       ...prevState,
  //       answers: [...prevState, answer],
  //     }));
  //   }
  // };

  let answers = [
    ...state.quests[state.questCount].incorrect_answers,
    state.quests[state.questCount].correct_answer,
  ];
  const shuffleArr = (array) => {
    let m = array.length;
    let t;
    let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.category}>
        Category :{" "}
        <Text style={styles.categoryValue}>
          {state.quests[state.questCount].category}
        </Text>
      </Text>
      <Text style={styles.quest}>
        {state.quests[state.questCount].question}
      </Text>
      <View style={styles.answersContainer}>
        {shuffleArr(answers).map((e) => (
          <TouchableOpacity
            key={e}
            style={styles.answers}
            // onPress={() => addAnswer([e, `${state.questCount}`])}
          >
            <Text style={styles.answerText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {state.quests.length == 1 ? (
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navigate}
            onPress={() =>
              navigation.navigate("Review", {
                answers: state.answers,
                right: rightAnswers,
              })
            }
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : state.questCount == 0 ? (
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navigate} onPress={forwardQuest}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : state.questCount < state.quests.length - 1 ? (
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navigate} onPress={lastQuest}>
            <Text style={styles.btnText}>Last</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigate} onPress={forwardQuest}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navigate} onPress={lastQuest}>
            <Text style={styles.btnText}>Last</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigate}
            onPress={() =>
              navigation.navigate("Review", {
                answers: state.answers,
                right: rightAnswers,
              })
            }
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  category: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
    position: "absolute",
    top: "1%",
    left: "1%",
  },
  categoryValue: {
    fontFamily: "Poppins-Light",
    color: colors.txt,
  },
  quest: {
    position: "absolute",
    top: "8%",
    left: "5%",
    fontFamily: "Poppins-Medium",
    color: colors.txt,
    width: "90%",
  },
  answers: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    borderStyle: "solid",
  },
  choosed: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    borderStyle: "solid",
  },
  answersContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "20%",
    width: "80%",
  },
  navigationContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: "10%",
    width: "90%",
    height: "13%",
  },
  navigate: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    borderStyle: "solid",
  },
  btnText: {
    color: colors.primary,
    fontFamily: "Poppins-Medium",
  },
  answerText: {
    color: colors.secondary,
    fontFamily: "Poppins-Medium",
  },
});
export default Quest;
