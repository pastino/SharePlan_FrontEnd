import React, { useState } from "react";
import SelectPhotoComp from "./SelectPhotoComp";

const SelectPhoto = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  return (
    <SelectPhotoComp
      navigation={navigation}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export default SelectPhoto;
