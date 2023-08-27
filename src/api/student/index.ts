import request from "@/utils/request";
import type {StudentAuthResponse, StudentLoginDTO, StudentRegisterDTO} from "@/api/student/type";

enum StudentAPI {
  Login = '/students/login',
  Register = '/students/register',
  GetInfo = '/students',
  OrderInfo = '/students/order/',
  GenerateOrder = '/students/order',
  ConfirmOrder = '/students/order/',
  UpdatePwd = '//students/pwd',
}

/**
 * 登录接口
 * @param {StudentLoginDTO} data
 * @return {StudentAuthResponse}
 */
export const requestStudentLogin = (data: StudentLoginDTO) => request.post<any, StudentAuthResponse>(StudentAPI.Login, data)

/**
 * 注册接口
 * @param {StudentRegisterDTO} data
 */
export const requestStudentRegister = (data: StudentRegisterDTO) => request.post<any, StudentAuthResponse>(StudentAPI.Register, data)

export const requestStudentInfo = () => request.get<any, >()