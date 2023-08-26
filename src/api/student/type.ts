import type {ResponseData} from "@/api/module/ResponseData";
import type {Auth} from "@/api/module/Auth";

export interface StudentLogin {
  username: string,
  password: string
}

export interface StudentAuthResponse extends ResponseData {
  data: Auth
}
