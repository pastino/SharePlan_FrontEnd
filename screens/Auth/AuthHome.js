import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import contents from "../../contents";
import { View, Text, Image, Alert } from "react-native";
import styles from "../../styles";
import ExpoIcon from "../../components/ExpoIcon";
import * as Facebook from "expo-facebook";
import { USER_ID_DOUBLE_CHECK, SNS_CONFIRM_SECRET } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";
import Loader from "../../components/Loader";
import * as Google from "expo-google-app-auth";

const Logo = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  font-family: "flower";
  padding-bottom: 37px;
`;

const AuthHome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userIdDoubleCheckMutation] = useMutation(USER_ID_DOUBLE_CHECK);

  const logIn = useLogIn();

  const [confirmSecretMutation] = useMutation(SNS_CONFIRM_SECRET);

  const fbLogin = async () => {
    await Facebook.initializeAsync("300091930969602");
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "300091930969602",
        {
          permissions: ["public_profile", "email", "user_birthday"],
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday `
        );
        const { email, name } = await response.json();
        setIsLoading(true);
        const {
          data: { idDoubleCheck },
        } = await userIdDoubleCheckMutation({
          variables: {
            userId: email,
          },
        });
        if (idDoubleCheck) {
          const {
            data: { snsConfirmSecret },
          } = await confirmSecretMutation({
            variables: {
              userId: email,
            },
          });

          if (snsConfirmSecret !== "") {
            logIn(snsConfirmSecret);
          }
        } else {
          navigation.navigate("SnsSingUp", {
            email,
            name,
            nickname: email.split("@")[0],
            snsLogin: "facebook",
          });
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    const GOOGLE_ID =
      "958752064393-fc52ru98iqntvqi9cd6mdqarfb0fc0o6.apps.googleusercontent.com";
    const androidStandaloneAppClientId =
      "958752064393-ckpf70qcutp3pucr6lt1ggju7ksapqbl.apps.googleusercontent.com";
    try {
      setIsLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID,
        androidStandaloneAppClientId,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const { email, name } = await user.json();
        const {
          data: { idDoubleCheck },
        } = await userIdDoubleCheckMutation({
          variables: {
            userId: email,
          },
        });
        if (idDoubleCheck) {
          const {
            data: { snsConfirmSecret },
          } = await confirmSecretMutation({
            variables: {
              userId: email,
            },
          });
          if (snsConfirmSecret !== "") {
            logIn(snsConfirmSecret);
          }
        } else {
          navigation.navigate("SnsSingUp", {
            email,
            name,
            nickname: email.split("@")[0],
            snsLogin: "google",
          });
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/notificationLogo.png")}
        style={{ width: 70, height: 70 }}
      />
      <Logo>쉐어플랜</Logo>
      <AuthButton
        text={"계정 생성"}
        onPress={() => navigation.navigate("SignUp")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={{ marginTop: 15, color: styles.rightBlack, fontWeight: "700" }}
        >
          로그인
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 30,
          borderTopColor: "black",
        }}
      >
        <TouchableOpacity onPress={() => fbLogin()}>
          <View
            style={{
              width: contents.width / 2.2,
              height: 37,
              backgroundColor: "#3E5C9A",
              marginTop: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginRight: 17,
            }}
          >
            <View style={{ marginRight: 10 }}>
              <ExpoIcon name={"facebook"} color={"white"} size={20} />
            </View>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>
              Facebook 로그인
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => googleLogin()}>
          <View
            style={{
              width: contents.width / 2.2,
              height: 37,
              backgroundColor: "white",
              marginTop: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ marginRight: 10 }}>
              <ExpoIcon name={"google"} color={"black"} size={20} />
            </View>
            <Text style={{ color: "black", fontWeight: "700", fontSize: 12 }}>
              Google 로그인
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthHome;
