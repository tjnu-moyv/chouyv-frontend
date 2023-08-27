import type {AllShopsVO, ShopAuthVO, ShopLoginDTO, TheShopInfoVO} from "@/api/shop/type";
import request from "@/utils/request";

enum ShopAPI {
  TheShop = '/shops/',
  AllShops = '/shops/',
  Login = '/shops/login/',
  Register = '/shops/register/'
}

/**
 * 商家登录
 * @param data
 */
export const requestShopLogin = (data: ShopLoginDTO) => request.post<any, ShopAuthVO>(ShopAPI.Login, data)

/**
 * 获取某个商铺信息 包括所有的商品信息
 * @param shopId
 */
export const requestGetTheShop = (shopId: number) => request.get<any, TheShopInfoVO>(ShopAPI.TheShop + shopId)

/**
 * 获取所有商铺的信息
 */
export const requestAllShops = () => request.post<any, AllShopsVO>(ShopAPI.AllShops)
