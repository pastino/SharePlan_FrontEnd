import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import contents from "../../contents";
import styles from "../../styles";
import { useMutation } from "react-apollo-hooks";
import { SALE_CONFIRM, GOAL_SALE_CONFIRM } from "../home/HomeQueries";
import ExpoIcon from "../../components/ExpoIcon";

const RejectReasonText = ({ navigation: { goBack }, navigation }) => {
  const [loading, setLoading] = useState(false);
  const userId = navigation.getParam("userId");
  const id = navigation.getParam("id");

  const [value, setValue] = useState("");

  const onChange = (text) => {
    setValue(text);
  };

  const [saleConfirmMutation] = useMutation(SALE_CONFIRM, {
    refetchQueries: () => [{ query: GOAL_SALE_CONFIRM, variables: { userId } }],
    awaitRefetchQueries: true,
  });

  const saleConfirmHandle = async () => {
    setLoading(true);
    await saleConfirmMutation({
      variables: {
        goalId: id,
        saleConfirm: "반려",
        saleRejectText: value,
      },
    });
    setLoading(false);
    goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: contents.width,
          height: 60,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text style={{ fontWeight: "700" }}>승인 거절내용</Text>
        <TouchableOpacity onPress={() => saleConfirmHandle()}>
          <ExpoIcon name={"check"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={"승인 거절 내용"}
              multiline={true}
              style={{
                width: contents.width / 1.03,
                height: 500,
                padding: 10,
                borderWidth: 1,
                borderColor: styles.lightGreyColor,
                justifyContent: "flex-start",
                textAlignVertical: "top",
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RejectReasonText;
