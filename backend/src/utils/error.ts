import { Response, Request } from 'express';

class ErrorJSON extends Error {
  public statusCode: number;

  public message: string;

  public description: string;

  constructor(statusCode: number, message: string, description: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.description = description;
  }
}

const handleError = (error: ErrorJSON, _: Request, res: Response) => {
  const { statusCode, message, description } = error;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    description,
  });
};

export {
  ErrorJSON,
  handleError,
};
