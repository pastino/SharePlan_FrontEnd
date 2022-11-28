import React from "react";
import SwitchToggle from "@dooboo-ui/native-switch-toggle";

const SlideToggle = ({ isSwitch, onPressHandle, disabled }) => {
  return disabled ? null : (
    <SwitchToggle
      switchOn={isSwitch}
      onPress={onPressHandle}
      circleColorOff="#999999"
      circleColorOn="green"
    />
  );
};

export default SlideToggle;
