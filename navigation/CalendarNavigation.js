import { createStackNavigator } from "react-navigation-stack";
import CalendarView from "../screens/home/calendal/CalendarView";

export default createStackNavigator({
  CalendarView: {
    screen: CalendarView,
    navigationOptions: {
      headerShown: false
    }
  }
});
