import request from "@/utils/request";
import type {StudentAuthResponse, StudentLogin} from "@/api/student/type";

enum StudentAPI {
  LOGIN = '/students/login',
  REGISTER = '/students/register'
}

/**
 * 登录接口
 * @param {StudentLogin} studentLogin
 * @return {StudentAuthResponse}
 */
export const requestStudentLogin = (studentLogin: StudentLogin) => request.post<any, StudentAuthResponse>(StudentAPI.LOGIN, studentLogin)
