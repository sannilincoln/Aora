import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import { IPost } from "@/Interface/Ipost";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

interface IVideos {}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, isLoading, refetch } = useAppWrite({ fn: getAllPosts });
  const { data: latestPosts } = useAppWrite({ fn: getLatestPosts });
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    //re call vidoes if any new vidoes
    await refetch();
    setRefreshing(false);
  };

  // console.log(posts);

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={({ $id }) => $id.toString()}
        renderItem={({ item }) => <VideoCard Video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search for a video topic" />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                {" "}
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first to add videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
