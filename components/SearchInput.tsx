import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  KeyboardTypeOptions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

interface ISearchInput {
  initialQuery?: string;
  // handleChangeText?: (e: string) => void;
  placeholder?: string;
}

const SearchInput = ({ initialQuery, ...props }: ISearchInput) => {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-14 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row focus:border-secondary items-center  space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular  text-base mt-0.5 "
        value={query}
        placeholder={props.placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search result across database"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
