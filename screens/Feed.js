import React from "react";
import SearchBar from "../components/SearchBar";
import { View } from "react-native";
import contents from "../contents";
import PostView from "./Feed/PostView";

export default class extends React.Component {
  render() {
    return <PostView navigation={this.props.navigation} />;
  }
}
