import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import contents from "../../contents";
import styles from "../../styles";
import BookSearchView from "./BooksApi.js/BookSearchView";
import ExpoIcon from "../../components/ExpoIcon";

const BookHelper = () => {
  const [value, setValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [search, setSearch] = useState(false);

  const onChange = (text) => {
    setValue(text);
  };

  return (
    <View
      style={{
        borderTopColor: styles.lightGreyColor,
        borderTopWidth: 1.5,
      }}
    >
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 10, fontWeight: "700" }}>도서함 추가</Text>
      </View>
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
          style={{
            width: contents.width / 1.5,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: styles.lightGreyColor,
          }}
        />
        <ExpoIcon name={"view-sequential"} color={"white"} size={17} />
        {/* <TouchableOpacity onPress={() => setSearch(true)}>
          <View
            style={{
              width: 70,
              height: 35,
              backgroundColor: styles.MainColor,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <Text style={{ color: "white" }}>검색</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      <View>
        <BookSearchView search={search} value={value} />
      </View>
    </View>
  );
};

export default BookHelper;
