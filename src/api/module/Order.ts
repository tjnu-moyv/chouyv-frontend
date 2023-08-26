/**
 * 订单返回体
 */
export interface Order {
   createdAt: string;
   id: number;
   isDeleted: number;
   runId: number | null;
   shopId: number;
   status: number;
   studentId: number;
   targetTime: string;
   totalPrice: number;
   type: number;
   updatedAt: string;
}