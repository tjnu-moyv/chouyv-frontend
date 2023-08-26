/**
 * 单个商品的购物车
 */
export interface OrderProductsItem {
   count: number;
   description: string;
   /**
    * 商品主键(shop_products_id)
    */
   id: number;
   /**
    * 单价
    */
   price: number;
}