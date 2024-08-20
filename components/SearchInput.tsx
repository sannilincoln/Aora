import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

interface ISearchInput {
  value?: string;
  handleChangeText?: (e: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, handleChangeText, ...props }: ISearchInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-14 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row focus:border-secondary items-center  space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular  text-base mt-0.5 "
        value={value}
        placeholder={props.placeholder}
        // onChangeText={(e) => handleChangeText(e)}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
