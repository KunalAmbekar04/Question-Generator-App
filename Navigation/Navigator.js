import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../Screens/CategoriesScreen";
import QuestionListScreen from "../Screens/QuestionListScreen";
import SummaryScreen from "../Screens/SummaryScreen";
import WikiSearchScreen from "../Screens/WikiSearchScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WikiSearch"
          component={WikiSearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="QuestionList" component={QuestionListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
