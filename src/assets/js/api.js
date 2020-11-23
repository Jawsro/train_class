import {HttpRequest} from "./request.js"

//用户信息
export function getUserTrainInfo(data){
  return HttpRequest.getRequest({
     method: "POST",
      url: "/api/train_user/getUserTrainInfo",
      data: data
  })
}

//活动信息
 export function getTrainInfo(data){
   return HttpRequest.getRequest({
     method: "POST",
      url: "/api/train_user/getTrainInfo",
      data: data
  })
 }

 //报名
 export function setTrainUser(data){
    return HttpRequest.getRequest({
     method: "POST",
      url: "/api/train_user/signin",
      data: data
  })
 }

 //生出证书
 export function getCertificationInfo(data){
   return HttpRequest.getRequest({
     method: "POST",
      url: "/api/train_user/getCertificationInfo",
      data: data
  })
 }