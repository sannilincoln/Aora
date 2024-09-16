import { View, Text } from "react-native";
import React from "react";

interface IInfoBox {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}

const InfoBox = ({
  title,
  titleStyles,
  subtitle,
  containerStyles,
}: IInfoBox) => {
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white text-center font-psemibold`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
