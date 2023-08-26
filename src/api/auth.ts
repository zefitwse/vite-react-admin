import request from "./request";

export function getAuth(data: any) {
  return request({
    url: "/auth",
    method: "post",
    data: data
  })
}