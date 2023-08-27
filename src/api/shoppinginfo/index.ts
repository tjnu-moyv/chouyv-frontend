import request from "@/utils/request";
import type {AddShoppingInfoDTO, AddShoppingInfoVO, UpdateShoppingInfoDTO} from "@/api/shoppinginfo/type";

enum ShoppingInfoAPI {
  AddShoppingInfo = '/shopinfo',
  UpdateShoppingInfo = '/shopinfo',
  DelShoppingInfo = '/shopinfo',
  GetAllShoppingInfo = '/shopinfo',
}

/**
 * 增加学生收货地址
 * @param {AddShoppingInfoDTO} data
 */
export const requestAddShoppingInfo = (data: AddShoppingInfoDTO) => request.post<any, AddShoppingInfoVO>(ShoppingInfoAPI.AddShoppingInfo, data)

/**
 * 更新学生收货地址
 * @param {UpdateShoppingInfoDTO} data
 */
export const requestUpdateShoppingInfo = (data: UpdateShoppingInfoDTO) => request.put<any, AddShoppingInfoVO>(ShoppingInfoAPI.UpdateShoppingInfo, data)

/**
 * 删除学生收货地址
 * @param id
 */
export const requestDelShoppingInfo = (id: number) => request.delete<any, AddShoppingInfoVO>(ShoppingInfoAPI.DelShoppingInfo, id)

/**
 * 删除学生收货地址
 */
export const requestGetAllShoppingInfo = () => request.get<any, AddShoppingInfoVO>(ShoppingInfoAPI.GetAllShoppingInfo)