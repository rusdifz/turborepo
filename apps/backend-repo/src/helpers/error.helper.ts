class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: any, res: any) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
