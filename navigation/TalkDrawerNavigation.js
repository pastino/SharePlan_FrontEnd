import TalkDrawer from "../screens/Talk/talkDrawer/TalkDrawer";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import contents from "../contents";
import MainNavigation from "./MainNavigation";

const TalkDrawerNavigation = createDrawerNavigator({
  contentComponent: TalkDrawer,
  drawerWidth: 350,
  drawerType: "slide"
});

export default createAppContainer(TalkDrawerNavigation);
