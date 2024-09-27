import React from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "./TabButton";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  icons: { [key: string]: any };
}

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  icons,
}: CustomTabBarProps) => {
  const { height: windowHeight } = useWindowDimensions();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  const tabBarHeight = Math.min(
    Math.max(60, windowHeight * 0.04 + safeAreaBottom),
    80
  );

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#161622",
        borderTopWidth: 1,
        borderTopColor: "#232533",
        height: tabBarHeight,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={index}
            icon={icons[route.name.toLowerCase()]}
            label={label}
            onPress={onPress}
            accessibilityState={{ selected: isFocused }}
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
