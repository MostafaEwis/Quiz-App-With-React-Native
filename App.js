import Constants from "expo-constants";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import items from "./items";
import Quest from "./quest";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Review from "./review";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "./colors";
const Main = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });
  const [state, setState] = useState({
    items: items,
    selectedValue: 0,
    selectedDif: "easy",
    questNum: "5",
  });
  async function getData() {
    let data = null;
    let url = `https://opentdb.com/api.php?amount=${state.questNum}&category=${state.selectedValue}&difficulty=${state.selectedDif}&type=multiple`;
    await fetch(url)
      .then((data) => data.json())
      .then((json) => {
        data = json;
      });
    return data;
  }
  const handelData = async () => {
    let data = await getData();
    navigation.navigate("Quest", { quests: data });
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image source={require("./assets/Logo.png")} style={styles.logo} />
        <Text style={styles.title}>Choose wisely</Text>
        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.txt}>Choose a category :</Text>
            <View style={styles.picker}>
              <Picker
                dropdownIconColor={colors.primary}
                selectedValue={state.selectedValue}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectedValue: itemValue,
                  }));
                }}
              >
                {state.items.map((obj) => {
                  return (
                    <Picker.Item
                      label={obj.label}
                      value={obj.value}
                      key={obj.value}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.txt}>Select Difficulty :</Text>
            <View style={styles.picker}>
              <Picker
                dropdownIconColor={colors.primary}
                selectedValue={state.selectedDif}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectedDif: itemValue,
                  }));
                }}
              >
                <Picker.Item label="Easy" value="easy" key="1" />
                <Picker.Item label="Medium" value="medium" key="2" />
                <Picker.Item label="Hard" value="hard" key="3" />
              </Picker>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.txt}>Number of questions :</Text>
            <View style={styles.picker}>
              <Picker
                dropdownIconColor={colors.primary}
                selectedValue={state.questNum}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setState((prevState) => ({
                    ...prevState,
                    questNum: itemValue,
                  }));
                }}
              >
                <Picker.Item label="1" value="1" key="1" />
                <Picker.Item label="2" value="2" key="2" />
                <Picker.Item label="3" value="3" key="3" />
                <Picker.Item label="4" value="4" key="4" />
                <Picker.Item label="5" value="5" key="5" />
                <Picker.Item label="6" value="6" key="6" />
                <Picker.Item label="7" value="7" key="7" />
                <Picker.Item label="8" value="8" key="8" />
                <Picker.Item label="9" value="9" key="9" />
                <Picker.Item label="10" value="10" key="10" />
              </Picker>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handelData} style={styles.btn}>
          <Text style={styles.btnText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Quest" component={Quest} />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    position: "absolute",
    top: "5%",
    width: 90,
    height: 90,
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
    padding: 1,
    position: "absolute",
    top: "20%",
  },
  form: {
    position: "absolute",
    top: "20%",
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width - 10,
    padding: 10,
    marginTop: 20,
  },
  txt: {
    fontFamily: "Poppins-Regular",
    alignSelf: "flex-start",
    color: colors.secondary,
  },
  picker: {
    width: "90%",
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 10,
    borderStyle: "solid",
  },
  btn: {
    position: "absolute",
    bottom: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 50,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderStyle: "solid",
  },
  btnText: {
    fontFamily: "Poppins-Medium",
    color: "white",
    fontSize: 15,
  },
});
export default App;
