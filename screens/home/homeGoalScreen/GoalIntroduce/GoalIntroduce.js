import contents from "../../../../contents";
import styles from "../../../../styles";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ExpoIcon from "../../../../components/ExpoIcon";
import MainImage from "./IntroduceComponents/MainImage";
import IntroduceText from "./IntroduceComponents/IntroduceText";
import SalePrice from "./IntroduceComponents/SalePrice";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  UPDATE_GOAL_SALE_INFO,
  SEE_ME,
  SEE_SALE_INFO,
  GOAL_SALE_CANCLE,
} from "../../HomeQueries";
import LoadingModal from "../../../../components/LoadingModal";
import axios from "axios";
import options from "../../../../apollo";
import TargetText from "./IntroduceComponents/TargetText";
import OtherCosts from "./IntroduceComponents/OtherCosts";
import OtherCostsDesc from "./IntroduceComponents/OtherCostsDesc";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { NavigationActions } from "react-navigation";

const GoalIntroduce = ({ navigation }) => {
  const goalId = navigation.getParam("goalId");
  const goalText = navigation.getParam("value");
  const division = navigation.getParam("division");

  const category = navigation.getParam("category");
  const detailCategory = navigation.getParam("detailCategory");
  const cardPrivate = navigation.getParam("cardPrivate");
  const value = navigation.getParam("value");
  const selectDay = navigation.getParam("selectDay");
  const dDay = navigation.getParam("dDay");
  const cardColor = navigation.getParam("cardColor");
  const me = navigation.getParam("me");
  const goalInformations = navigation.getParam("goalInformations");
  const goalHistories = navigation.getParam("goalHistories");
  const id = navigation.getParam("id");
  const startDate = navigation.getParam("startDate");
  const originDDay = navigation.getParam("originDDay");
  const navComplete = navigation.getParam("complete");
  const completeDate = navigation.getParam("completeDate");
  const navGoalText = navigation.getParam("goalText");
  const keyWord = navigation.getParam("keyWord");
  const navSale = navigation.getParam("sale");
  const salePrice = navigation.getParam("salePrice");
  const mainImage = navigation.getParam("mainImage");
  const introduceText = navigation.getParam("introduceText");
  const target = navigation.getParam("target");
  const navOtherCosts = navigation.getParam("otherCosts");
  const otherCostsDesc = navigation.getParam("otherCostsDesc");
  const dayToDoesCount = navigation.getParam("dayToDoesCount");
  const seeDayToDo = navigation.getParam("seeDayToDo");

  const [loading, setLoading] = useState(false);
  const [alramConfirmModal, setAlramConfirmModal] = useState(false);
  const [precautionsModal, setPrecautionsModal] = useState(false);

  //Main Image
  const [selectedPhoto, setSelectedPhoto] = useState();

  //Target Text
  const [targetValue, setTargetValue] = useState("");

  //Introduce Text
  const [introduceValue, setIntroduceValue] = useState("");

  //Sale Pirce
  const [priceValue, setPriceValue] = useState(0);

  //Other Costs
  const [otherCostsValue, setOtherCostsValue] = useState(0);

  //Ohter Costs Description
  const [otherCostsDescValue, setOtherCostsDescValue] = useState("");

  const priceArray = priceValue ? priceValue.split(",") : null;

  const price =
    priceArray === null
      ? 0
      : priceArray.length === 1
      ? priceArray[0]
      : priceArray.length === 2
      ? priceArray[0].concat(priceArray[1])
      : priceArray.length === 3
      ? priceArray[0].concat(priceArray[1], priceArray[2])
      : priceArray.length === 4
      ? priceArray[0].concat(priceArray[1], priceArray[2], priceArray[3])
      : null;

  const otherCostsArray = otherCostsValue ? otherCostsValue.split(",") : null;

  const otherCosts =
    otherCostsArray === null
      ? 0
      : otherCostsArray.length === 1
      ? otherCostsArray[0]
      : otherCostsArray.length === 2
      ? otherCostsArray[0].concat(otherCostsArray[1])
      : otherCostsArray.length === 3
      ? otherCostsArray[0].concat(otherCostsArray[1], otherCostsArray[2])
      : otherCostsArray.length === 4
      ? otherCostsArray[0].concat(
          otherCostsArray[1],
          otherCostsArray[2],
          otherCostsArray[3]
        )
      : null;

  const [updateGoalSaleInfoMutation] = useMutation(UPDATE_GOAL_SALE_INFO, {
    refetchQueries: () => [
      { query: SEE_ME },
      { query: SEE_SALE_INFO, variables: { goalId } },
    ],
    awaitRefetchQueries: true,
  });

  const saleResistHandle = async () => {
    if (
      selectedPhoto === undefined ||
      introduceValue.length === 0 ||
      // priceValue.length === 0 ||
      price.length === 0 ||
      otherCosts.length === 0
    ) {
      ToastAndroid.show("모든 항목에 입력이 필요합니다.", ToastAndroid.SHORT);
    } else {
      setAlramConfirmModal(!alramConfirmModal);
    }
  };

  const [token, setToken] = useState(null);
  const [complete, setComplete] = useState(false);

  const alarmReceiveHandle = async ({ pushAlarm }) => {
    setAlramConfirmModal(!alramConfirmModal);
    setPrecautionsModal(!precautionsModal);
    if (pushAlarm === true) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.isDevice && status === "granted") {
        const token = await Notifications.getExpoPushTokenAsync();
        setToken(token);
      }
    } else {
      setPrecautionsModal(!precautionsModal);
      setToken(null);
    }
  };

  const precautionsModalHandle = () => {
    setPrecautionsModal(!precautionsModal);
    if (token !== null) {
      saleMutationImp({ token });
    } else {
      saleMutationImp({ token: null });
    }
  };

  const saleMutationImp = async () => {
    setLoading(true);
    const formData = new FormData([]);
    formData.append("file", {
      name: "mainImage",
      type: "image/jpeg",
      uri: selectedPhoto,
    });
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
    await updateGoalSaleInfoMutation({
      variables: {
        salePrice: 0,
        // parseInt(price),
        mainImage: location[0],
        introduceText: introduceValue,
        goalId: goalId,
        sale: "검토중",
        target: targetValue,
        otherCosts: parseInt(otherCosts),
        otherCostsDesc: otherCostsDescValue,
        alramToken: token,
      },
    });
    setComplete(true);
    setLoading(false);
  };

  const [saleCancleLoading, setSaleCancleLoading] = useState(false);

  const [goalSaleCancleMutation] = useMutation(GOAL_SALE_CANCLE, {
    variables: {
      goalId,
    },
    refetchQueries: () => [
      { query: SEE_SALE_INFO, variables: { goalId } },
      { query: SEE_ME },
    ],
    awaitRefetchQueries: true,
  });

  const registCancleHandle = async () => {
    setSaleCancleLoading(true);
    await goalSaleCancleMutation();
    setSaleCancleLoading(false);
  };

  useEffect(() => {
    if (complete === true) {
      const backAction = () => {
        navigation.navigate(
          NavigationActions.navigate({
            routeName: "TabNavigation",
            action: NavigationActions.navigate({
              routeName: "Tab1",
              action: NavigationActions.navigate({
                routeName: "HomeDiv",
                action: NavigationActions.navigate({
                  routeName: "HomeGoal",
                }),
              }),
            }),
          })
        );
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    } else {
      null;
    }
  }, [complete]);

  const { data, loading: saleInfoLoading } = useQuery(SEE_SALE_INFO, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const sale = data && data.seeSaleInfo && data.seeSaleInfo.sale;

  const salePriceData = data && data.seeSaleInfo && data.seeSaleInfo.salePrice;
  const targetData = data && data.seeSaleInfo && data.seeSaleInfo.target;
  const mainImageData = data && data.seeSaleInfo && data.seeSaleInfo.mainImage;
  const introduceTextData =
    data && data.seeSaleInfo && data.seeSaleInfo.introduceText;
  const otherCostsData =
    data && data.seeSaleInfo && data.seeSaleInfo.otherCosts;
  const otherCostsDescData =
    data && data.seeSaleInfo && data.seeSaleInfo.otherCostsDesc;
  const saleRejectTextData =
    data && data.seeSaleInfo && data.seeSaleInfo.saleRejectText;
  const categoryData = data && data.seeSaleInfo && data.seeSaleInfo.category;
  const detailCategoryData =
    data && data.seeSaleInfo && data.seeSaleInfo.detailCategory;

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 60,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 10,
          flexDirection: "row",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            division === "sale" || complete === true
              ? navigation.navigate(
                  NavigationActions.navigate({
                    routeName: "TabNavigation",
                    action: NavigationActions.navigate({
                      routeName: "Tab1",
                      action: NavigationActions.navigate({
                        routeName: "HomeDiv",
                        action: NavigationActions.navigate({
                          routeName: "HomeGoal",
                        }),
                      }),
                    }),
                  })
                )
              : navigation.navigate("GoalEdit")
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ExpoIcon name={"chevron-left"} />
            <Text style={{ fontWeight: "700" }}>
              목표/스케쥴 공유(다운로드)
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {sale === null ? (
          <TouchableOpacity onPress={() => saleResistHandle()}>
            {saleInfoLoading ? null : (
              <View style={{ marginRight: 30 }}>
                <ExpoIcon name={"check"} />
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    color: styles.darkGreyColor,
                    fontWeight: "700",
                  }}
                >
                  제출
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : sale === "검토중" ? (
          <View style={{ marginRight: 30, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => registCancleHandle()}
            >
              <View
                style={{
                  marginRight: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.darkGreyColor,
                    textDecorationLine: "underline",
                  }}
                >
                  등록취소
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontWeight: "700", color: styles.Wine }}>
              검토중
            </Text>
          </View>
        ) : sale === "승인" ? (
          <View style={{ marginRight: 30, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => registCancleHandle()}
            >
              <View
                style={{
                  marginRight: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.darkGreyColor,
                    textDecorationLine: "underline",
                  }}
                >
                  등록취소
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontWeight: "700", color: styles.Wine }}>
              승인완료
            </Text>
          </View>
        ) : sale === "반려" ? (
          <>
            <View style={{ marginRight: 10 }}>
              <Text
                style={{ fontWeight: "700", color: styles.Wine, fontSize: 10 }}
              >
                승인이 거절되었습니다.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("GoalEdit", {
                  category: category,
                  detailCategory: detailCategory,
                  cardPrivate: cardPrivate,
                  value: value,
                  selectDay: selectDay,
                  dDay: dDay,
                  cardColor: cardColor,
                  me: me,
                  goalInformations: goalInformations,
                  goalHistories: goalHistories,
                  id: id,
                  startDate: startDate,
                  originDDay: originDDay,
                  complete: navComplete,
                  completeDate: completeDate,
                  goalText: navGoalText,
                  keyWord: keyWord,
                  sale: navSale,
                  salePrice: salePrice,
                  mainImage: mainImage,
                  introduceText: introduceText,
                  target: target,
                  otherCosts: navOtherCosts,
                  otherCostsDesc: otherCostsDesc,
                  dayToDoesCount: dayToDoesCount,
                  seeDayToDo,
                })
              }
            >
              <View style={{ marginRight: 10 }}>
                <Text
                  style={{
                    fontWeight: "700",
                    textDecorationLine: "underline",
                    color: styles.darkGreyColor,
                    fontSize: 12,
                  }}
                >
                  목표수정
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      {saleInfoLoading ? (
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {sale === "반려" ? (
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
                {saleRejectTextData}
              </Text>
            </View>
          ) : null}

          {sale === null ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              {/* <SalePrice
                priceValue={priceValue}
                setPriceValue={setPriceValue}
              /> */}
              {/* <OtherCosts
                otherCostsValue={otherCostsValue}
                setOtherCostsValue={setOtherCostsValue}
              />
              {otherCosts > 0 ? (
                <OtherCostsDesc
                  otherCostsDescValue={otherCostsDescValue}
                  setOtherCostsDescValue={setOtherCostsDescValue}
                />
              ) : null}
              <TargetText
                targetValue={targetValue}
                setTargetValue={setTargetValue}
              /> */}
              <IntroduceText
                introduceValue={introduceValue}
                setIntroduceValue={setIntroduceValue}
              />
              <MainImage
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
              />
            </View>
          ) : (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View>
                <Image
                  source={{ uri: mainImageData }}
                  style={{
                    width: contents.width,
                    height: contents.width / 1.5,
                  }}
                  resizeMode={"cover"}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Text
                  style={{
                    color: styles.darkGreyColor,
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {categoryData} > {detailCategoryData}
                </Text>
                <Text style={{ marginTop: 10, fontWeight: "700" }}>
                  {goalText}
                </Text>
                {/* <Text style={{ marginTop: 20, fontWeight: "700" }}>금액</Text>
                <Text>
                  {salePriceData
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  원
                </Text>
                <View style={{ marginTop: 30 }}>
                  <Text style={{ fontWeight: "700" }}>기타비용</Text>
                  <Text>
                    {otherCostsData
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    원
                  </Text>
                </View>
                {otherCosts > 0 ? (
                  <View style={{ marginTop: 30 }}>
                    <Text style={{ fontWeight: "700" }}>기타비용 설명</Text>
                    <Text style={{}}>{otherCostsDescData}</Text>
                  </View>
                ) : null} */}
                {/* <View style={{ marginTop: 30 }}>
                  <Text style={{ fontWeight: "700" }}>목표기간</Text>
                  <Text style={{}}>{schedulePeriod} 일</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                  <Text style={{ fontWeight: "700" }}>스케쥴</Text>
                  <Text style={{}}>{toDoLength} 건</Text>
                </View> */}
                {/* <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: "700" }}>
                    History(스케줄 상세정보)
                  </Text>
                  <Text style={{}}>27 건</Text>
                </View> */}
                {/* <View style={{ marginTop: 30 }}>
                  <Text style={{ fontWeight: "700" }}>대상</Text>
                  <Text style={{}}>{targetData}</Text>
                </View> */}
                <Text style={{ fontWeight: "700", marginTop: 20 }}>설명</Text>
                <Text>{introduceTextData}</Text>
                {/* <View style={{ flexDirection: "row" }}>
                <Image
                  source={
                    me && me.avatar
                      ? { uri: me && me.avatar }
                      : require("../../../../assets/noAvatar.png")
                  }
                  style={{ width: 60, height: 60 }}
                  resizeMode={"contain"}
                />
                <Text style={{ marginTop: 5, marginLeft: 5 }}>
                  {me && me.nickname}
                </Text>
              </View> */}
              </View>
            </View>
          )}
        </ScrollView>
      )}
      <LoadingModal
        isLoading={loading}
        loadingText={"승인을 위한 정보 등록중 입니다."}
      />
      <LoadingModal
        isLoading={saleCancleLoading}
        loadingText={"등록을 취소 중입니다."}
      />
      <Modal
        isVisible={alramConfirmModal}
        onBackdropPress={() => setAlramConfirmModal(!alramConfirmModal)}
        onRequestClose={() => setAlramConfirmModal(!alramConfirmModal)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>
                승인결과 알림을 받으시겠습니까?
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: styles.Wine,
                  fontWeight: "700",
                }}
              >
                확정 시 push 알림을 보내드립니다.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => alarmReceiveHandle({ pushAlarm: false })}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alarmReceiveHandle({ pushAlarm: true })}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>예</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={precautionsModal}
        onBackdropPress={() => setPrecautionsModal(!precautionsModal)}
        onRequestClose={() => setPrecautionsModal(!precautionsModal)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 230,
                padding: 15,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 12 }}>
                - 다운로드(공유) 등록 시 해당 목표의 정보수정
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 12, paddingLeft: 10 }}
              >
                및 추가가 불가합니다.
              </Text>
              <Text style={{ fontWeight: "700", fontSize: 12, marginTop: 10 }}>
                - 다운로드(공유) 등록 취소는 언제든지 가능하며,
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 12, paddingLeft: 10 }}
              >
                취소 후 수정 권한이 다시 부여됩니다.
              </Text>
              <Text style={{ fontWeight: "700", fontSize: 12, marginTop: 10 }}>
                - 다운로드(공유) 등록 후 1~2일 정도의 검토
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 12, paddingLeft: 10 }}
              >
                기간이 있으며, 부적절한 내용, 기준에 부적합 시
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 12, paddingLeft: 10 }}
              >
                승인이 거절될 수 있습니다.
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: styles.Wine,
                  fontWeight: "700",
                }}
              >
                위 내용에 동의하면 `확인`을 눌러 진행 바랍니다.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPrecautionsModal(!precautionsModal);
                  setToken(null);
                }}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => precautionsModalHandle()}>
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default GoalIntroduce;
