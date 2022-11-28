import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ExpoIcon from "../components/ExpoIcon";

class HomeDivScrollable extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
    this.tabs = ["format-list-bulleted", "bullseye-arrow"];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(
      this.setAnimationValue.bind(this)
    );
  }

  setAnimationValue({ value }) {
    this.icons.forEach((icon, i) => {
      const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon
                  name={tab}
                  size={20}
                  color={
                    this.props.activeTab === i ? "black" : "rgb(204,204,204)"
                  }
                />
                <Text
                  style={{
                    color: styles.darkGreyColor,
                    fontSize: 7,
                    fontWeight: "700",
                    textAlign: "center",
                    color:
                      this.props.activeTab === i ? "black" : "rgb(204,204,204)",
                  }}
                >
                  {tab === "format-list-bulleted" ? "해야할 일" : "나의 목표"}
                </Text>
              </View>
            </TouchableOpacity>
            // <TouchableOpacity
            //   key={tab}
            //   onPress={() => this.props.goToPage(i)}
            //   style={styles.tab}
            // >
            // //   <ExpoIcon
            //     name={tab}
            // color={
            //   this.props.activeTab === i
            //     ? "rgb(59,89,152)"
            //     : "rgb(204,204,204)"
            // }
            //   />
            // </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: "row",
    paddingTop: 7,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
});

export default HomeDivScrollable;
