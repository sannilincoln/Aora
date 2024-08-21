import { View, Text, FlatList } from "react-native";
import React from "react";

interface ITrending {
  posts: IPost[];
}
interface IPost {
  $id: number;
}

const Trending = ({ posts }: ITrending) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.$id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
