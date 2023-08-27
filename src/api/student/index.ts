import request from "@/utils/request";
import type {
  ConfirmOrderDTO,
  ConfirmOrderVO,
  GenerateOrderDTO,
  GenerateOrderVO,
  GetOrderInfoVO,
  StudentAuthVO,
  StudentLoginDTO,
  StudentRegisterDTO
} from "@/api/student/type";
import type {StudentInfo} from "@/api/module/StudentInfo";

enum StudentAPI {
  Login = '/students/login',
  Register = '/students/register',
  GetInfo = '/students',
  OrderInfo = '/students/order/',
  GenerateOrder = '/students/order',
  ConfirmOrder = '/students/order/',
  // UpdatePwd = '//students/pwd',
}

/**
 * 登录接口
 * @param {StudentLoginDTO} data
 * @return {StudentAuthVO}
 */
export const requestStudentLogin = (data: StudentLoginDTO) => request.post<any, StudentAuthVO>(StudentAPI.Login, data)

/**
 * 注册接口
 * @param {StudentRegisterDTO} data
 */
export const requestStudentRegister = (data: StudentRegisterDTO) => request.post<any, StudentAuthVO>(StudentAPI.Register, data)

/**
 * 获取学生信息
 */
export const requestStudentInfo = () => request.get<any, StudentInfo>(StudentAPI.GetInfo)

/**
 * 查询订单情况
 * @param orderId
 */
export const requestOrderInfo = (orderId: number) => request.get<any, GetOrderInfoVO>(StudentAPI.OrderInfo + orderId)

/**
 * 订单生成接口
 * @param data
 */
export const requestGenerateOrder = (data: GenerateOrderDTO) => request.post<any, GenerateOrderVO>(StudentAPI.GenerateOrder, data)

/**
 * 消费者确认收货
 * @param data
 */
export const requestConfirmOrder = (data: ConfirmOrderDTO) => request.put<any, ConfirmOrderVO>(StudentAPI.ConfirmOrder, data)

// export const requestUpdatePwd = (data: ) => request.post<any, >()