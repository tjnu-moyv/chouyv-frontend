import type {ResponseData} from "@/api/module/ResponseData";
import type {Order} from "@/api/module/Order";
import type {ShopInfo} from "@/api/module/ShopInfo";

export interface RetrieveAllAvailableOrdersResponse extends ResponseData {
  data: {
    /**
     * 当前页 默认1
     */
    current: number;
    list: {
      order: Order,
      shop: ShopInfo
    }[];
    /**
     * 每页显示条数 默认10
     */
    size: number;
    /**
     * 返回记录的总数
     */
    total: number;
  }
}