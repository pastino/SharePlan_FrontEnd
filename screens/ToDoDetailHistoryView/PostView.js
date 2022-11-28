import React, { Fragment } from "react";
import { View, Text, Image } from "react-native";
import contents from "../../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../styles";

const PostView = ({ files }) => {
  const oneImageUrl = files && files[0] && files[0].url;
  const oneImageRatio = files && files[0] && files[0].postRatio;
  const twoImageUrl = files && files[1] && files[1].url;
  const twoImageRatio = files && files[1] && files[1].postRatio;
  const twoMinmunRatio =
    oneImageRatio < twoImageRatio ? oneImageRatio : twoImageRatio;
  const threeImageUrl = files && files[2] && files[2].url;
  const threeImageRatio = files && files[2] && files[2].url;
  const fourImageUrl = files && files[3] && files[3].url;
  const fourImageRatio = files && files[3] && files[3].url;

  return (
    <View style={{}}>
      {files.length === 1 ? (
        <Image
          source={{ uri: oneImageUrl }}
          style={{
            width: contents.width,
            height:
              contents.width / (oneImageRatio < 0.65 ? 0.65 : oneImageRatio),
          }}
        />
      ) : files.length === 2 ? (
        <View
          style={{
            flexDirection:
              oneImageRatio < 1.1 || twoImageRatio < 1.1 ? "row" : "column",
          }}
        >
          <Image
            source={{ uri: oneImageUrl }}
            style={{
              marginRight:
                oneImageRatio < 1.1 || twoImageRatio < 1.1 ? 2 : null,
              width: twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
              height:
                contents.width /
                (twoMinmunRatio > 1
                  ? 2
                  : twoMinmunRatio < 1
                  ? twoMinmunRatio / 0.4
                  : twoMinmunRatio),
            }}
          />
          <Image
            source={{ uri: twoImageUrl }}
            style={{
              marginTop: twoMinmunRatio > 1 ? 2 : null,
              width: twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
              height:
                contents.width /
                (twoMinmunRatio > 1
                  ? 2
                  : twoMinmunRatio < 1
                  ? twoMinmunRatio / 0.4
                  : twoMinmunRatio),
            }}
          />
        </View>
      ) : files.length === 3 ? (
        oneImageRatio > 1.1 ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight:
                  oneImageRatio < 1.1 || twoImageRatio < 1.1 ? 2 : null,
                width:
                  twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
                height:
                  contents.width /
                  (twoMinmunRatio > 1
                    ? 2
                    : twoMinmunRatio < 1
                    ? twoMinmunRatio / 0.4
                    : twoMinmunRatio),
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginTop: twoMinmunRatio > 1 ? 2 : null,
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: twoMinmunRatio > 1 ? 2 : null,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight:
                  oneImageRatio < 1.1 || twoImageRatio < 1.1 ? 2 : null,
                width:
                  twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
                height: 400,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginTop: twoMinmunRatio > 1 ? 2 : null,
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
            </View>
          </View>
        )
      ) : files.length === 4 ? (
        oneImageRatio <= 0.9 ? (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight: 2,
                width: contents.width / 1.6,
                height: 490,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              />

              <Image
                source={{ uri: fourImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              />
            </View>
          </View>
        ) : oneImageRatio > 0.9 && oneImageRatio <= 1.1 ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: oneImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <Image
                source={{ uri: fourImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
            </View>
          </View>
        ) : oneImageRatio > 1.1 ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight:
                  oneImageRatio < 1.1 || twoImageRatio < 1.1 ? 2 : null,
                width:
                  twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
                height: 230,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 3,
                  height: 130,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 3,
                  height: 130,
                }}
              />
              <Image
                source={{ uri: fourImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width / 3,
                  height: 130,
                }}
              />
            </View>
          </View>
        ) : null
      ) : files.length > 4 ? (
        oneImageRatio <= 0.9 ? (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight: 2,
                width: contents.width / 1.6,
                height: 490,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              />
              <View
                style={{
                  width: contents.width - contents.width / 1.6,
                  height: 490 / 3,
                }}
              >
                <Image
                  source={{ uri: fourImageUrl }}
                  style={{
                    marginTop: 2,
                    width: contents.width - contents.width / 1.6,
                    height: 490 / 3,
                  }}
                />
                <View
                  style={{
                    width: contents.width - contents.width / 1.6,
                    height: 490 / 3,
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                    }}
                  >
                    더보기
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                      textAlign: "center",
                    }}
                  >{`+${" "}${files.length - 4}`}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : oneImageRatio > 0.9 && oneImageRatio <= 1.1 ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: oneImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 2,
                  height: 200,
                }}
              />
              <View style={{ width: contents.width / 2, height: 200 }}>
                <Image
                  source={{ uri: fourImageUrl }}
                  style={{
                    marginTop: 2,
                    width: contents.width / 2,
                    height: 200,
                  }}
                />
                <View
                  style={{
                    width: contents.width / 2,
                    height: 200,
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                    }}
                  >
                    더보기
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                      textAlign: "center",
                    }}
                  >{`+${" "}${files.length - 4}`}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : oneImageRatio > 1.1 ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Image
              source={{ uri: oneImageUrl }}
              style={{
                marginRight:
                  oneImageRatio < 1.1 || twoImageRatio < 1.1 ? 2 : null,
                width:
                  twoMinmunRatio < 1.1 ? contents.width / 2 : contents.width,
                height: 230,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: twoImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 3,
                  height: 130,
                }}
              />
              <Image
                source={{ uri: threeImageUrl }}
                style={{
                  marginTop: 2,
                  marginRight: 2,
                  width: contents.width / 3,
                  height: 130,
                }}
              />
              <View style={{ width: contents.width / 3, height: 130 }}>
                <Image
                  source={{ uri: fourImageUrl }}
                  style={{
                    marginTop: 2,
                    width: contents.width / 3,
                    height: 130,
                  }}
                />
                <View
                  style={{
                    width: contents.width / 3,
                    height: 130,
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                    }}
                  >
                    더보기
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      color: styles.moreLightGrey,
                      textAlign: "center",
                    }}
                  >{`+${" "}${files.length - 4}`}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null
      ) : null}
    </View>
  );
};

export default PostView;
