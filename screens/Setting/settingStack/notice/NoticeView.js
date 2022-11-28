import React, { Fragment } from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from "../../../../styles";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import contents from "../../../../contents";
import { useQuery } from "react-apollo-hooks";
import { SEE_NOTICE } from "../../SettingQueries";
import moment from "moment";
import NoticeViewList from "./NoticeViewList";

const NoticeView = ({ navigation }) => {
  const userId = navigation.getParam("userId");

  const { data } = useQuery(SEE_NOTICE);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: contents.width,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {data &&
            data.seeNotice &&
            data.seeNotice.map(notice => (
              <Fragment key={notice.id}>
                <NoticeViewList {...notice} userId={userId} />
              </Fragment>
            ))}
        </View>

        {userId === "joon5006@naver.com" ? (
          <View
            style={{
              width: contents.width,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("NoticeCreate", { userId })}
            >
              <View
                style={{
                  marginTop: 30,
                  width: 110,
                  height: 40,
                  backgroundColor: styles.MainColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  공지사항 추가
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default NoticeView;
