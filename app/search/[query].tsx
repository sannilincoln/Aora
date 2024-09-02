import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

interface IVideos {}

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { query } = useLocalSearchParams();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppWrite({ fn: () => searchPosts(`${query}`) });

  useEffect(() => {
    refetch();
  }, [query]);
  // console.log(posts);

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={({ $id }) => $id.toString()}
        renderItem={({ item }) => <VideoCard Video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={query}
                placeholder="Search for a video topic"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
