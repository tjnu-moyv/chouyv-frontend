// api url 枚举
import type {RetrieveAllAvailableOrdersResponse} from "@/api/run/type";
import request from "@/utils/request";

enum RunAPI {
  RetrieveAllAvailableOrdersURL = '/run/list'
}

/**
 * 获取可接的所有订单
 * @param pageNum 默认起始1
 * @param pageSize 默认大小10条
 * @return {RetrieveAllAvailableOrdersResponse}
 */
export const requestOrdersForRunner = (pageNum: number = 1, pageSize: number = 10): RetrieveAllAvailableOrdersResponse => {
  const url: string = `${RunAPI.RetrieveAllAvailableOrdersURL}?page=${pageNum}&pageSize=${pageSize}`
  return request.get<any, RetrieveAllAvailableOrdersResponse>(url)
}
