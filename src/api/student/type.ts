import type {BaseVO} from "@/api/module/BaseVO";
import type {Auth} from "@/api/module/Auth";
import type {Order} from "@/api/module/Order";
import type {OrderProductsItem} from "@/api/module/OrderProductsItem";

export interface StudentLoginDTO {
  username: string,
  password: string
}

export interface StudentRegisterDTO {
  username: string,
  password: string,
  checkPwd: string,
}

export interface GenerateOrderDTO {
  /**
   * 订单的状态-0-堂食(用户取 食堂吃 不外带) 1-带走(打包, 需配送费) 2-找跑腿(run_id不可空)
   */
  type: number;
  shopId: number;
  products: {
    count: number;
    description: string;
    /**
     * 商品主键(shop_products_id)
     */
    id: number;
  }[];
}

export interface ConfirmOrderDTO {
  orderId: number;
  password: string;
}

export interface StudentAuthVO extends BaseVO {
  data: Auth
}

export interface GenerateOrderVO extends BaseVO {
  data: {
    orderId: number;
    totalPrice: number;
  }
}

export interface GetOrderInfoVO extends BaseVO {
  data: {
    order: Order;
    orderShopProductsItems: OrderProductsItem[];
  }
}

export interface ConfirmOrderVO extends BaseVO {
  data: any
}
