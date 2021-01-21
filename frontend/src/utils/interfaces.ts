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

interface IPost {
  user: {
    fullName: string,
    avatar: string | null,
  }
  id: string,
  contentText: string,
  contentImage: string | null,
  createdDate: Date,
}

interface IPostList {
  posts: IPost[],
  currentPage: number,
  nextPage: number | null,
  totalPostCount: number,
  pageCount: number
  newPosts: IPost[],
}

interface IAuth {
  fullName: string | null,
  avatar: string | null,
}

interface IResponse {
  message: string,
  description: string,
}

interface IPostListResponse extends IResponse {
  data: IPostList
}

interface IPostResponse extends IResponse {
  data: IPost
}

interface IAuthResponse extends IResponse {
  data: IAuth,
}

interface IRouteInfo {
  id: string;
}

export type {
  ILoginForm,
  IRegisterForm,
  IPost,
  IPostList,
  IAuth,
  IResponse,
  IPostListResponse,
  IPostResponse,
  IAuthResponse,
  IRouteInfo,
};
