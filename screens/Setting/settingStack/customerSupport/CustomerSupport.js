import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import Textarea from "react-native-textarea";
import styles from "../../../../styles";
import contents from "../../../../contents";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { CREATE_SUGGESTION, SEE_SUGGESTION } from "../../SettingQueries";
import { useMutation, useQuery } from "react-apollo-hooks";
import options from "../../../../apollo";
import CustomerSupportList from "./CustomerSupportList";

const CustomerSupport = ({ navigation }) => {
  const userId = navigation.getParam("userId");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [image, setImage] = useState();

  const onChange = (text) => {
    setValue(text);
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("죄송합니다. 사진을 업로드 하기 위해 권한을 허용해주세요.");
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const [createSuggestionMutation] = useMutation(CREATE_SUGGESTION, {
    refetchQueries: () => [{ query: SEE_SUGGESTION }],
    awaitRefetchQueries: true,
  });

  const createSuggestion = async () => {
    if (image) {
      const formData = new FormData();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format: "jpeg" }
      );
      formData.append("file", {
        name: resizedPhoto.uri,
        type: "image/jpeg",
        uri: resizedPhoto.uri,
      });
      try {
        setIsLoading(true);
        const {
          data: { location },
        } = await axios.post(
          options.httpLink.toString() + "/api/upload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        await createSuggestionMutation({
          variables: {
            text: value,
            image: location[0],
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await createSuggestionMutation({
          variables: {
            text: value,
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { data } = useQuery(SEE_SUGGESTION);

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Textarea
          editable={!isLoading}
          defaultValue={value}
          onChangeText={onChange}
          containerStyle={{
            height: contents.height / 7,
            width: contents.width / 1.1,
            padding: 5,
            backgroundColor: styles.moreLightGrey,
            borderRadius: 10,
          }}
          style={{
            textAlignVertical: "top", // hack android
            height: contents.height / 7,
            fontSize: 14,
            color: "#333",
            padding: 10,
            paddingBottom: 20,
          }}
          maxLength={1000}
          placeholder={"문의사항 및 불편사항 등 자유롭게 적어주세요."}
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
        <TouchableOpacity
          disabled={isLoading}
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [5, 5],
              quality: 1,
            });
            if (!result.cancelled) {
              setImage(result.uri);
            }
          }}
        >
          <View
            style={{
              width: contents.width / 1.1,
              height: 40,
              backgroundColor: "white",
              marginTop: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginLeft: 7,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              사진첨부 (선택사항)
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: contents.width / 1.1,
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          {image ? (
            <>
              <View style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  source={{ uri: image }}
                />
                <View style={{ position: "absolute", right: 20, top: 7 }}>
                  <TouchableOpacity onPress={() => setImage(null)}>
                    <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                      이미지 삭제
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => createSuggestion()}
        >
          <View
            style={{
              marginTop: 10,
              width: 80,
              height: 40,
              backgroundColor: styles.MainColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={{ color: "white", fontWeight: "700" }}>제출</Text>
            )}
          </View>
        </TouchableOpacity>

        {userId === "joon5006@naver.com" ? (
          <View>
            {data &&
              data.seeSuggestion &&
              data.seeSuggestion.map((suggestion) => (
                <Fragment key={suggestion.id}>
                  <CustomerSupportList {...suggestion} />
                </Fragment>
              ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CustomerSupport;
