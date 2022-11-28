import { createStackNavigator } from "react-navigation-stack";
import GoalStack from "../screens/home/goal/GoalStack";
import GoalStackTwo from "../screens/home/goal/GoalStackTwo";
import GoalStackThree from "../screens/home/goal/GoalStackThree";
import GoalStackFour from "../screens/home/goal/GoalStackFour";

export default createStackNavigator({
  GoalStack: {
    screen: GoalStack,
    navigationOptions: {
      headerShown: false
    }
  },
  GoalStackTwo: {
    screen: GoalStackTwo,
    navigationOptions: {
      headerShown: false
    }
  },
  GoalStackThree: {
    screen: GoalStackThree,
    navigationOptions: {
      headerShown: false
    }
  },
  GoalStackFour: {
    screen: GoalStackFour,
    navigationOptions: {
      headerShown: false
    }
  }
});
