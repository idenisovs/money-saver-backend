export type SuccessCallback<T> = (result: T) => void;
export type ErrorCallback<T = Error> = (error: T) => void;