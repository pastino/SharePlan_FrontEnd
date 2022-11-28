import React from "react";
import styled from "styled-components";
import contents from "../../contents";
import { GoodText } from "./GoodText";
import { GoodPerson } from "./GoodText";
import PropTypes from "prop-types";

const View = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  width: ${contents.width / 1.2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 15px;
  font-family: "flower";
`;

//명언도 목표에 맞게 띄워주기

const GoodPhrase = ({ marginTop }) => {
  const GoodTextNumber = Math.floor(Math.random() * GoodText.length);
  const PhraseGenerator = GoodText[GoodTextNumber];
  const creatorGenerator = GoodPerson[GoodTextNumber];
  return (
    <View style={{ marginTop: marginTop }}>
      <Container>
        <Text>{PhraseGenerator}</Text>
        <Text style={{ marginTop: 10 }}>- {creatorGenerator} -</Text>
      </Container>
    </View>
  );
};

GoodPhrase.propTypes = {
  marginTop: PropTypes.number
};

export default GoodPhrase;
