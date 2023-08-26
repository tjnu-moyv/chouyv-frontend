/**
 * 账单返回体
 */
export interface Bill {
   createdAt: string;
   fromId: number;
   id: number;
   money: number;
   toId: number;
   type: number;
}