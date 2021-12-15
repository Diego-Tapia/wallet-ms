import { IPaginationInfo } from "./pagination-info.interface";

export interface IApiResponse<T> {
  status: number; 
  success: boolean;
  data?: T;
  info?: IPaginationInfo;
  message: string;
}