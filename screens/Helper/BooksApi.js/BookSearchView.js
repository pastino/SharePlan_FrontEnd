import React, { useEffect, useState } from "react";
import { View, Text, Image, Linking } from "react-native";
import axios from "axios";
import contents from "../../../contents";
import moment from "moment";
import styles from "../../../styles";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK b8436871f48e65a3ff97c0c33d5f4dfb", // 공통으로 요청 할 헤더
  },
});

const blogSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};

const BookSearchView = ({ search, value }) => {
  const [bookData, setBookData] = useState();
  const [bookModal, setBookModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (value.length !== 0) {
      blogSearchHttpHandler();
    }
  }, [value]);

  const blogSearchHttpHandler = async () => {
    // paramter 설정
    const params = {
      query: value,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 10, // 한 페이지에 보여 질 문서의 개수
    };
    const {
      data: { documents },
    } = await blogSearch(params); // api 호출
    setBookData(documents);
  };

  const bookClickHandle = ({ thumbnail, title, link }) => {
    setThumbnail(thumbnail);
    setTitle(title);
    setLink(link);
    setBookModal(!bookModal);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {bookData
        ? bookData
            .filter((book) => book.thumbnail && book.sale_price !== -1)
            .map((book) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  bookClickHandle({
                    thumbnail: book.thumbnail,
                    title: book.title,
                    link: book.url,
                  })
                }
              >
                <View
                  key={Math.random().toString()}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: contents.width / 1.03,
                    flexWrap: "wrap",
                    borderBottomColor: styles.lightGreyColor,
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 57,
                    }}
                  >
                    <Image
                      source={{ uri: book ? book.thumbnail : null }}
                      style={{
                        width: contents.width / 4.5,
                        height: (contents.width / 4.5) * 2,
                      }}
                      resizeMode={"contain"}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 20,
                        width: contents.width - contents.width / 3.2,
                        marginRight: 40,
                      }}
                    >
                      <Text style={{ marginTop: 10 }}>제목: {book.title}</Text>
                      <Text style={{ marginTop: 10 }}>
                        저자: {book.authors}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        정가: {book.sale_price}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        출판일: {moment(book.datetime).format("YYYY.M.D")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text ellipsizeMode="tail" numberOfLines={3} style={{}}>
                      {book.contents}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))
        : null}
      <Modal
        isVisible={bookModal}
        onBackdropPress={() => setBookModal(!bookModal)}
        onRequestClose={() => setBookModal(!bookModal)}
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
              borderRadius: 10,
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: thumbnail }}
              style={{ width: 70, height: 120 }}
            />
            <Text style={{ width: 250, textAlign: "center", marginTop: 10 }}>
              {title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 80,
                  height: 35,
                  backgroundColor: styles.MainColor,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    textAlign: "center",
                  }}
                  onPress={() => Linking.openURL(link)}
                >
                  정보 더보기
                </Text>
              </View>
              <View
                style={{
                  width: 80,
                  height: 35,
                  backgroundColor: styles.MainColor,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  도서함에 넣기
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookSearchView;
