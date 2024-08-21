import { error } from "console";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

interface ICreateAccount {}

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sanni.aora",
  projectId: "66c333e8002bb9141e41",
  databaseId: "66c3377c003a83d8cce7",
  usersCollectionId: "66c33a6100039abf3604",
  videosCollectionId: "66c33ab8001147547842",
  storageId: "66c33feb0015ef948dbc",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  videosCollectionId,
  storageId,
} = appwriteConfig;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const seesion = await account.createEmailPasswordSession(email, password);
    return seesion;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("accountId", (await currentAccount).$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videosCollectionId);

    return posts.documents;
  } catch (error) {
    throw new Error(String(error));
  }
};
