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

interface IComment {
  user: {
    fullName: string,
    email: string,
    avatar: string | null,
  },
  id: string,
  postId: string,
  contentText: string,
  createdDate: string,
}

interface IPost {
  user: {
    fullName: string,
    email: string,
    avatar: string | null,
  }
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
  avatar: string | null,
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

interface IAuthResponse extends IResponse {
  data: IAuth,
}

interface ICommentListResponse extends IResponse {
  data: IComment[],
}

interface ICommentResponse extends IResponse {
  data: IComment,
}

interface IRouteInfo {
  id: string;
}

export type {
  ILoginForm,
  IRegisterForm,
  IComment,
  IPost,
  IPostList,
  IAuth,
  IResponse,
  IPostListResponse,
  IPostResponse,
  IAuthResponse,
  ICommentListResponse,
  ICommentResponse,
  IRouteInfo,
};
