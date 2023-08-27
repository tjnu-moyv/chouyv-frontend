import type {BaseVO} from "@/api/module/BaseVO";
import type {MoneyAccount} from "@/api/module/MoneyAccount";

export interface PayDOT {
  /**
   * 订单主键
   */
  orderId: number;
  /**
   * 确认 保障
   */
  password: string;
}

export interface SelfBalanceVO extends BaseVO {
  data: null | {
    cny: number
  }
}

export interface PayVO extends BaseVO {
  data: null | {
    balance: number,
    bill: {
      id: number;
      type: number;
      toId: number;
      money: number;
      fromId: number;
      createdAt: string;
    }
  }
}

export interface NewAccountVO extends BaseVO {
  data: null | MoneyAccount
}