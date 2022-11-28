import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const ExpoIcon = ({ name, color, focused = false, size = 30 }) => (
  <MaterialCommunityIcons
    name={name}
    color={color}
    size={size}
    focused={focused}
  />
);

ExpoIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  focused: PropTypes.bool
};

export default ExpoIcon;
