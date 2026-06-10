
export type QData = {
  page?: number;
  limit?: number;
  id?: string;
  [key: string]: any;
};

export type TPaginationExtra = {
  page: number,
  limit: number,
  total?: number,
  getTotal?: boolean | number,
  withGroup?: boolean | number,
  withOutData?: boolean | number
}
export type TApiError = {
  errors?: { msg: string }[]
}
export interface TResponse<T = null> extends TApiError {
  success: boolean,
  message: string,
  code: number,
  data: T,
  extra?: TPaginationExtra
}

export interface TResponseWithQData<T> extends TResponse<T> {
  qData: QData;
}