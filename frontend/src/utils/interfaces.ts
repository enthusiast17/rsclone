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
  contentText: string,
  contentImage: string | null,
  createdDate: Date,
}

interface IPostList {
  posts: IPost[],
  currentPage: number,
  nextPage: string | null,
  totalPostCount: number,
  pageCount: number
}

interface IAuth {
  fullName: string | null,
  avatar: string | null,
}

interface IResponse {
  message: string,
  description: string,
}

interface IPostResponse extends IResponse {
  data: IPostList
}

interface IAuthResponse extends IResponse {
  data: IAuth,
}

export type {
  ILoginForm,
  IRegisterForm,
  IPost,
  IPostList,
  IAuth,
  IResponse,
  IPostResponse,
  IAuthResponse,
};
