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

interface IPostPagination {
  posts: IPost[],
  currentPage: number,
  nextPage: string | null,
  totalPostCount: number,
  pageCount: number
}

interface IResponse {
  message: string,
  description: string,
}

interface IPostResponse extends IResponse {
  data: IPostPagination
}

export type {
  ILoginForm,
  IRegisterForm,
  IPost,
  IPostPagination,
  IResponse,
  IPostResponse,
};
