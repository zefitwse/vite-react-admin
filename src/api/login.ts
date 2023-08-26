import request from "./request";

export function useLogin(data: any) {
  return request({
    url: "/login",
    method: "post",
    data: data
  })
}