export interface IVideoCard {
  Video: IPost;
}
export interface IPost {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id: string;
  $permissions?: any[];
  $tenant?: string;
  $updatedAt?: string;
  creator?: ICreator;
  prompt?: string;
  thumbnail?: string;
  title?: string;
  video?: string;
}

interface ICreator {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id?: string;
  $permissions?: any[];
  $tenant?: string;
  $updatedAt?: string;
  accountId?: string;
  avatar: string;
  email?: string;
  username: string;
}
