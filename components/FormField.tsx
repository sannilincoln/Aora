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

interface IFormField {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}: IFormField) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={props.placeholder}
          onChangeText={(e) => handleChangeText(e)}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={props.keyboardType}
          placeholderTextColor="#7B7B8B"
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
