import request from "@/utils/request";
import type {NewAccountVO, PayDOT, PayVO, SelfBalanceVO} from "@/api/money/type";

enum PayAPI {
  SelfBalance = '/money/',
  Pay = '/money/pay/',
  NewAccount = '/money/new/',
}

export const requestSelfBalance = () => request.post<any, SelfBalanceVO>(PayAPI.SelfBalance)

export const requestPay = (data: PayDOT) => request.post<any, PayVO>(PayAPI.Pay, data)

export const requestNewAccount = () => request.post<any, NewAccountVO>(PayAPI.NewAccount)