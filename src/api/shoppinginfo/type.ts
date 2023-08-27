import type {ResponseData} from "@/api/module/ResponseData";

export interface AddShoppingInfoDTO {
  name: string,
  phone: string,
  location: string
}

export interface AddShoppingInfoVO extends ResponseData {
  data: number
}

export interface UpdateShoppingInfoDTO {
  id: number,
  name: string | null,
  phone: string | null,
  location: string | null
}