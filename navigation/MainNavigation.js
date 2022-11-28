import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import GoalStackNavigation from "./GoalStackNavigation";
import CalendarNavigation from "./CalendarNavigation";
import GoalDetailContainer from "./GoalDetailContainer";
import SelectPhotoComp from "../screens/home/homeGoalScreen/GoalsList/InformationCreate/SelectPhotoComp";
import CameraTest from "../screens/home/CameraTest";
import CameraTestClass from "../screens/home/CameraTestClass";
import GoalEdit from "../screens/home/homeGoalScreen/GoalEdit/GoalEdit";
import SoulerProfile from "../screens/SoulingProfile/SoulerProfile";
import ProfileImageView from "../screens/SoulingProfile/ProfileImageView";
import SecondSoulerProfile from "../screens/SoulingProfileSecond/SecondSoulerProfile";
import settingMainViewNav from "./settingNavigation/settingMainViewNav";
import GoalEditNavigation from "./goalEditNavigation/GoalEditNavigation";
import GoalCompleteNavigation from "./goalEditNavigation/GoalCompleteNavigation";
import MyGoalExcellent from "../screens/home/goal/goalComponents/goalCommunication/myGoalCommunication/MyGoalExcellent";
import MyGoalFavorite from "../screens/home/goal/goalComponents/goalCommunication/myGoalCommunication/MyGoalFavorite";
import MyGoalLucky from "../screens/home/goal/goalComponents/goalCommunication/myGoalCommunication/MyGoalLucky";
import CardComments from "../screens/home/goal/goalComponents/goalCommunication/CardComments";
import GoalStageCalendal from "../screens/home/homeGoalScreen/GoalPlan/StageCalendar/GoalStageCalendal";
import Second from "../screens/home/homeGoalScreen/GoalPlan/StageCalendar/Second";
import Third from "../screens/home/homeGoalScreen/GoalPlan/StageCalendar/Third";
import Forth from "../screens/home/homeGoalScreen/GoalPlan/StageCalendar/Forth";
import Fiveth from "../screens/home/homeGoalScreen/GoalPlan/StageCalendar/Fiveth";
import EditGoalStagePlan from "../screens/home/homeGoalScreen/GoalPlan/EditGoalStagePlan";
import ToDoCalendar from "../screens/home/homeGoalScreen/GoalPlan/ToDoCalenar/ToDoCalendar";
import EditView from "../screens/CalendarCreateToDo/EditView";
import EditToDo from "../screens/CreateToDo/EditToDo";
import ToDoDetail from "../screens/ToDoDetail";
import TextEditTest from "../screens/TextEidtTest";
import NewGoalCreateView from "../screens/home/homeGoalScreen/Download/NewGoalCreateView";
import GoalIntroduce from "../screens/home/homeGoalScreen/GoalIntroduce/GoalIntroduce";
import GoalViewDiv from "../screens/home/homeGoalScreen/GoalViewDiv";
import GoalCreateView from "../screens/home/homeGoalScreen/Download/GoalCreateView";
import DownScheduleView from "../screens/home/homeGoalScreen/Download/DownScheduleView";
import CalendarView from "../screens/home/calendal/CalendarView";
import InGoalSelectDate from "../screens/home/homeGoalScreen/Download/InGoalSelectDate";
import GoalSchConfirmView from "../screens/GoalSchConfirmView";
import RejectReasonText from "../screens/GoalSchConfirmView/RejectReasonText";
import UploadHistory from "../screens/CreateToDo/UploadHistory/UploadHistory";
import HistoryConment from "../screens/ToDoDetailHistoryView/HistoryConment/HistoryConment";
import HistoryExcellent from "../screens/HistoryTab/HistoryExcellent";
import HistoryDetailView from "../screens/ToDoDetailHistoryView/HistoryDetailView";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    GoalDetailContainer,
    GoalStackNavigation,
    CalendarNavigation,
    settingMainViewNav,
    SoulerProfile,
    SecondSoulerProfile,
    SelectPhotoComp,
    CameraTest,
    CameraTestClass,
    GoalEdit,
    GoalEditNavigation,
    GoalCompleteNavigation,
    ProfileImageView,
    MyGoalExcellent,
    MyGoalFavorite,
    MyGoalLucky,
    CardComments,
    GoalStageCalendal,
    Second,
    Third,
    Forth,
    Fiveth,
    EditGoalStagePlan,
    ToDoCalendar,
    EditToDo,
    EditView,
    ToDoDetail,
    TextEditTest,
    NewGoalCreateView,
    GoalIntroduce,
    GoalViewDiv,
    GoalCreateView,
    DownScheduleView,
    CalendarView,
    InGoalSelectDate,
    GoalSchConfirmView,
    RejectReasonText,
    UploadHistory,
    HistoryConment,
    HistoryExcellent,
    HistoryDetailView,
  },
  { headerMode: "none" }
);

export default createAppContainer(MainNavigation);
