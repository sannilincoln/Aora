import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { Models } from "react-native-appwrite";

interface FormState {
  title: string;
  video: ImagePicker.ImagePickerAsset | null;
  thumbnail: ImagePicker.ImagePickerAsset | null;
  prompt: string;
}

interface CreateVideoParams {
  title: string;
  video: ImagePicker.ImagePickerAsset;
  thumbnail: ImagePicker.ImagePickerAsset;
  prompt: string;
  userId: string;
}

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext() as { user: Models.User<object> };
  // const typedUser = user as Models.User<object>;

  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const assetToFile = async (
    asset: ImagePicker.ImagePickerAsset
  ): Promise<File> => {
    const response = await fetch(asset.uri);
    const blob = await response.blob();
    return new File([blob], asset.fileName || "file", { type: asset.mimeType });
  };

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.video || !form.title) {
      return Alert.alert("please fill in all the fields");
    }
    const videoFile = await assetToFile(form.video);
    const thumbnailFile = await assetToFile(form.thumbnail);

    setUploading(true);
    try {
      if (!user) {
        return Alert.alert("Please login to continue");
      }
      await createVideo({
        ...form,
        userId: user.$id,
        video: videoFile,
        thumbnail: thumbnailFile,
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", String(error)); // Handle non-Error types
      }
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center ">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form?.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={"cover"}
              />
            ) : (
              <View className="w-full h-16 px-4 border-2 border-black-200 flex-row space-x-2 bg-black-100 rounded-2xl justify-center items-center ">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit and Publish"
          containerStyles="mt-7"
          isLoading={uploading}
          handlePress={submit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
