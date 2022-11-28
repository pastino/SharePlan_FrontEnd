import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import styles from "../../styles";
import axios from "axios";
import options from "../../apollo";
import SelectPhotoComp from "../home/homeGoalScreen/GoalsList/InformationCreate/SelectPhotoComp";
import { useMutation } from "react-apollo-hooks";
import { EDIT_USER } from "./SettingQueries";
import { SEE_ME } from "../home/HomeQueries";

const ProfileImage = ({ profileModifyVisible, setProfileModifyVisible }) => {
  const [isLoading, setIsLoading] = useState();
  const [selected, setSelected] = useState([]);
  const [profileImage, setProfileImage] = useState();

  const [eidtProfileImageMutation] = useMutation(EDIT_USER, {
    refetchQueries: () => [{ query: SEE_ME }],
    awaitRefetchQueries: true
  });

  const selectedPhoto = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("file", {
      name: profileImage.filename,
      type: "image/jpeg",
      uri: profileImage.uri
    });

    try {
      const {
        data: { location }
      } = await axios.post(options.uri.toString() + "/api/upload", formData, {
        headers: {
          "content-type": " linepart/form-data"
        }
      });
      await eidtProfileImageMutation({
        variables: {
          avatar: location[0]
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setProfileModifyVisible(!profileModifyVisible);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={profileModifyVisible}
      onBackdropPress={() =>
        isLoading ? null : setProfileModifyVisible(!profileModifyVisible)
      }
      onRequestClose={() =>
        isLoading ? null : setProfileModifyVisible(!profileModifyVisible)
      }
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: styles.BlueSky,
            borderRadius: 10,
            width: 320,
            height: 700,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 500
            }}
          >
            <SelectPhotoComp
              completeToDoStyle={true}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              profileImageModify={true}
              selected={selected}
              setSelected={setSelected}
              isLoading={isLoading}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 50 }}>
            <TouchableOpacity
              onPress={() => setProfileModifyVisible(!profileModifyVisible)}
              disabled={isLoading}
            >
              <View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "700" }}>
                  선택취소
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectedPhoto()}
              disabled={isLoading}
            >
              <View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginLeft: 20
                }}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ fontSize: 15, fontWeight: "700" }}>
                    선택완료
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileImage;
