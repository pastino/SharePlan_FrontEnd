import React from "react";
import { View, Text } from "react-native";
import contents from "../../../../contents";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ServiceTerms = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("UseTerm")}>
          <View
            style={{
              width: contents.width / 1.03,
              height: 60,
              backgroundColor: "white",
              marginTop: 7,
              borderRadius: 10,
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 15, marginLeft: 20 }}>
              이용약관
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <View
            style={{
              width: contents.width / 1.03,
              height: 60,
              backgroundColor: "white",
              marginTop: 7,
              borderRadius: 10,
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 15, marginLeft: 20 }}>
              개인정보 처리방침
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServiceTerms;
