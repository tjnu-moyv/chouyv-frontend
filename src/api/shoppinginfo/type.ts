import type {BaseVO} from "@/api/module/BaseVO";

export interface AddShoppingInfoDTO {
  name: string,
  phone: string,
  location: string
}

export interface AddShoppingInfoVO extends BaseVO {
  data: number
}

export interface UpdateShoppingInfoDTO {
  id: number,
  name: string | null,
  phone: string | null,
  location: string | null
}