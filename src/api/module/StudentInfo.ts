import type {ShoppingInfo} from "./ShoppingInfo";

/**
 * 学生信息返回体
 */
export interface StudentInfo {
   arrayOfShoppingInfo: ShoppingInfo[];
   createdAt: string;
   id: number;
   role: number;
   username: string;
}
