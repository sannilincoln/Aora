import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  GestureResponderEvent,
} from "react-native";

interface TabButtonProps {
  icon: any;
  label: string;
  accessibilityState?: { selected?: boolean };
  onPress?: (e: GestureResponderEvent) => void;
  activeColor?: string;
  inactiveColor?: string;
}

const TabButton = ({
  icon,
  label,
  accessibilityState,
  onPress,
  activeColor = "#ffa001",
  inactiveColor = "#cdcde0",
}: TabButtonProps) => {
  const focused = accessibilityState?.selected;
  const color = focused ? activeColor : inactiveColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 items-center justify-center"
    >
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6 mb-1"
        tintColor={color}
      />
      <Text style={{ color, fontSize: 12, fontFamily: "pregular" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;
