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

interface IResponse {
  message: string,
  description: string,
}

export type {
  ILoginForm,
  IRegisterForm,
  IResponse,
};
