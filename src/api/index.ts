import request from "@/utils/request";

// example
export function get(params: {providerId: string}) {
  return request({
    url: "",
    method: "get",
    params,
  });
}

export function post(params: {prompt: string, modelType: string}) {
  return request({
    url: "",
    method: "post",
    data: params,
  });
}