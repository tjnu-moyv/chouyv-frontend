import request from "@/utils/request";
import type {AddShoppingInfoDTO, AddShoppingInfoVO, UpdateShoppingInfoDTO} from "@/api/shoppinginfo/type";

enum ShoppingInfoAPI {
  Add = '/shopinfo',
  Update = '/shopinfo',
  Delete = '/shopinfo',
  GetAll = '/shopinfo',
}

/**
 * 增加学生收货地址
 * @param {AddShoppingInfoDTO} data
 */
export const requestAddShoppingInfo = (data: AddShoppingInfoDTO) => request.post<any, AddShoppingInfoVO>(ShoppingInfoAPI.Add, data)

/**
 * 更新学生收货地址
 * @param {UpdateShoppingInfoDTO} data
 */
export const requestUpdateShoppingInfo = (data: UpdateShoppingInfoDTO) => request.put<any, AddShoppingInfoVO>(ShoppingInfoAPI.Update, data)

/**
 * 删除学生收货地址
 * @param id
 */
export const requestDelShoppingInfo = (id: number) => request.delete<any, AddShoppingInfoVO>(ShoppingInfoAPI.Delete, id)

/**
 * 删除学生收货地址
 */
export const requestGetAllShoppingInfo = () => request.get<any, AddShoppingInfoVO>(ShoppingInfoAPI.GetAll)