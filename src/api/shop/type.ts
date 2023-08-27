import {BaseVO} from "@/api/module/BaseVO";
import {Auth} from "@/api/module/Auth";
import type {ShopInfo} from "@/api/module/ShopInfo";
import type {ShopProducts} from "@/api/module/ShopProducts";

export interface ShopLoginDTO {
  username: string,
  password: string
}

export interface ShopRegisterDTO {
  username: string,
  password: string,
  checkPwd: string,
}

export interface ShopAuthVO extends BaseVO {
  data: Auth
}

export interface TheShopInfoVO extends BaseVO {
  data: {
    shop: ShopInfo;
    shopProducts: ShopProducts[];
  }
}

export interface AllShopsVO extends BaseVO {
  data: ShopInfo[]
}
