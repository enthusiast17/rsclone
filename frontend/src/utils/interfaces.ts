interface ILoginForm {
  email: string,
  password: string,
}

interface IRegisterForm {
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
}

interface IUser {
  fullName: string,
  email: string,
  username: string,
  birthdayDate: Date | null,
  avatar: string | null,
  aboutme: string | null,
}

interface IProfile extends IUser {
  postsCount: number,
  followersCount: number,
  followingCount: number,
  groupsCount: number,
  isFollowing: boolean,
}

interface IComment {
  user: IUser,
  id: string,
  postId: string,
  contentText: string,
  createdDate: string,
}

interface IPost {
  user: IUser,
  id: string,
  contentText: string,
  contentImage: string | null,
  createdDate: string,
  likesCount: number,
  isUserLiked: boolean,
  commentsCount: number,
  comments: IComment[],
}

interface IPostList {
  posts: IPost[],
  currentPage: number,
  nextPage: number | null,
  totalPostCount: number,
  pageCount: number,
  newPosts: IPost[],
}

interface IAuth {
  fullName: string | null,
  email: string | null,
  username: string | null,
  avatar: string | null,
}

interface IMessage {
  id: string,
  user: IUser,
  contentText: string,
  createdDate: string,
}

interface IResponse {
  message: string,
  description: string,
}

interface IPostListResponse extends IResponse {
  data: IPostList,
}

interface IPostResponse extends IResponse {
  data: IPost,
}

interface IPostEditedResponse extends IResponse {
  data: { contentText: string, contentImage: string | null }
}

interface IAuthResponse extends IResponse {
  data: IAuth,
}

interface ICommentListResponse extends IResponse {
  data: IComment[],
}

interface ICommentResponse extends IResponse {
  data: IComment,
}

interface IProfileResponse extends IResponse {
  data: IProfile,
}

interface IFollowersResponse extends IResponse {
  data: IUser[],
}

interface ISearchResponse extends IResponse {
  data: IUser[],
}

interface IMessagesResponse extends IResponse {
  data: IMessage[],
}

interface IRouteInfo {
  id: string;
}

export type {
  ILoginForm,
  IRegisterForm,
  IUser,
  IProfile,
  IComment,
  IPost,
  IPostList,
  IAuth,
  IMessage,
  IResponse,
  IPostListResponse,
  IPostResponse,
  IPostEditedResponse,
  IAuthResponse,
  ICommentListResponse,
  ICommentResponse,
  IProfileResponse,
  IFollowersResponse,
  ISearchResponse,
  IMessagesResponse,
  IRouteInfo,
};
