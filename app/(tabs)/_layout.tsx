import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import {
  useWindowDimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabButtonProps {
  icon: any;
  label: string;
  accessibilityState?: { selected?: boolean };
  onPress?: (e: GestureResponderEvent) => void;
}

const TabButton = ({
  icon,
  label,
  accessibilityState,
  onPress,
}: TabButtonProps) => {
  const focused = accessibilityState?.selected;
  const color = focused ? "#ffa001" : "#cdcde0";

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

const TabsLayout = () => {
  const { height: windowHeight } = useWindowDimensions();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  const tabBarHeight = Math.min(
    Math.max(60, windowHeight * 0.04 + safeAreaBottom),
    80
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: tabBarHeight,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon={icons.home} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon={icons.bookmark} label="Bookmark" />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon={icons.plus} label="Create" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon={icons.profile} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

// optin to makeit into components

// import React from "react";
// import { Tabs } from "expo-router";
// import { icons } from "../../constants";
// import CustomTabBar from "../../components/CustomTabBar";

// const TabsLayout = () => {
//   return (
//     <Tabs
//       tabBar={(props) => <CustomTabBar {...props} icons={icons} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen name="home" />
//       <Tabs.Screen name="bookmark" />
//       <Tabs.Screen name="create" />
//       <Tabs.Screen name="profile" />
//     </Tabs>
//   );
// };

// export default TabsLayout;
