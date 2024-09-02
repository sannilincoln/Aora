import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";

import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video, VideoProps } from "expo-av";

interface ITrending {
  posts: IPost[];
}
interface IPost {
  $id: number;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: { scale: 1 },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  // console.log(item.video);
  const videoRef = useRef(null);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: "https://www.w3schools.com/html/mov_bbb.mp4",
          }}
          className="h-72 w-52 mt-3 bg-white/10 rounded-[33px]"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          // isMuted
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => {
            console.log("Error loading video:", error);
            alert(
              "Video failed to load. Please try a different format or check your network connection."
            );
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: ITrending) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const handleViewableItems = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={handleViewableItems}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
