export enum ErrorMessages {
  Required,
  ExpectedString,
  ExpectedNumber,
}

export const errorMessages: Record<ErrorMessages, string> = {
  [ErrorMessages.Required]: "This field is required",
  [ErrorMessages.ExpectedString]: "Wrong type! Only a string is allowed.",
  [ErrorMessages.ExpectedNumber]: "Wrong type! Only a number is allowed.",
};
