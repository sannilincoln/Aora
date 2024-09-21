import { Models } from "react-native-appwrite";

export interface CustomUser extends Models.User<object> {
  username?: string;
  avatar?: string;
}
