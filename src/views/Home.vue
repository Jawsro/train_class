<template>
  <div class="home">
    <div class="main">
        <p class="title">
         {{trainName}}
        </p>
        <div class="time">
          <p>培训时间 : {{startTime}}至{{endTime}} </p>
          <p>培训地点 : {{trainAddress}}</p>
        </div>
        <div class="enroll" v-show="examineStatus == '未报名'? true : false">
          <router-link :to="{path: '/form', query: {train_class_id:trainClassid}}">人员签到</router-link>
         </div>
         <div class="noQualifications" v-show="examineStatus == '未审核' || examineStatus == '未通过'? true : false" @click="handleClick">
          <span>生成证书</span>
       </div>
       <div class="isQualifications" v-show="examineStatus == '已通过'? true : false" @click="handleClick">
          <span>生成证书</span>
        </div>

        <div class="danger" v-show="examineStatus == '未审核' || examineStatus == '未通过'? true : false">
          <p>提示：本次培训证书为电子版,培训</p>
          <p>结束后点击“生成证书”保存即可。</p>
        </div>
    </div>
    <div class="foot">
      <span>宜昌市群众艺术馆</span>
    </div>
  </div>
</template>

<script>
import {getTrainInfo,getUserTrainInfo} from "../assets/js/api.js";
import { Dialog } from 'vant';
export default {
  name: "Home",
  data(){
    return{
      examineStatus:'',
      trainName:'',
      startTime:'',
      endTime:'',
      trainAddress:'',
      trainClassid:null,
      userId:null,
    }
  },
  created(){
    
    this.getTrainInfo()
  },
  methods:{
    _getUserTrainInfo(){
      this.userId = localStorage.getItem('userId');
      if(this.userId == null || this.userId == undefined){
        this.examineStatus = '未报名'
      }else{
          let userData={
            train_class_id: this.trainClassid,
            user_id:this.userId
          }
          getUserTrainInfo(userData).then(result=>{
            if(result.status == true){
                if(result.code == 200){//200表示已签到
                  let auditStatus = result.data.train_sign_info.audit_status;
                  if(auditStatus == "未审核"){
                    this.examineStatus = '未审核'
                  }else if(auditStatus == "未通过"){
                    this.examineStatus = '未通过'
                  } else{
                    this.examineStatus = '已通过'
                  }
                }else if(result.code == 0){
                  this.examineStatus = '未报名'
                }
            }
            
          })
        }
    },
    handleClick(){
      this.userId = localStorage.getItem('userId');
      if(this.userId == null || this.userId == undefined){
        this.examineStatus = '未报名'
      }else{
          let userData={
            train_class_id: this.trainClassid,
            user_id:this.userId
          }
          getUserTrainInfo(userData).then(result=>{
            if(result.status == true){
                if(result.code == 200){//200表示已签到
                  let auditStatus = result.data.train_sign_info.audit_status;
                  if(auditStatus == "未审核"){
                    this.examineStatus = '未审核' 
                     Dialog.alert({
                        message: '您的证书暂未审核，请您耐心等候',
                    })
                  }else if(auditStatus == "未通过"){
                    this.examineStatus = '未通过'
                    Dialog.alert({
                        message: '非常抱歉，您的证书没有通过审核',
                    })
                  } else{
                    this.examineStatus = '已通过'
                    this.$router.push({ path: '/enroll', query: {train_class_id:this.trainClassid,user_id:this.userId}});
                  }
                }else if(result.code == 0){
                  this.examineStatus = '未报名'
                }
            }
            
          })
        }
    },
    getTrainInfo(){
        // let windowUrl = location.href;
        // this.trainClassid = windowUrl.split("train_class_id=")[1];
        this.trainClassid = 2
        this.userId = localStorage.getItem('userId');
        let data={
          train_class_id:this.trainClassid,
        }
        getTrainInfo(data).then(res=>{
          if(res.status == true){
            let result = res.data;
            this.trainName = result.train_name;
            this.trainAddress = result.train_address;
            this.startTime = result.start_time_show;
            this.endTime = result.end_time_show;
          }
          
        })
        this._getUserTrainInfo()
    }
  },
};
</script>
<style lang="stylus" scoped> 
  @import "../assets/css/common.styl"
  .home
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    padding:0 15px;
    background:url("../assets/img/bg.png") no-repeat center center;
    background-size:100% 100%;
    .main
      margin-top:$margin-top-max
      .danger
        font-weight:$font-weight-blod
        font-size:$font-size-medium 
        color:red
        margin-top:20px
        text-align: center;
      .title
        font-size:$font-size-large-x;
        text-align: center;
        font-weight:550;
        color:#1E4393;
      .time
        margin-top:40px;
        text-align:center;
        width:100%;
        p
          font-size:$font-size-medium;
          line-height:24px;
          
      .enroll
        isbtn()
        a
          color:$color-text-f;
          font-size:$font-size-large;
      .noQualifications
        nobtn()
      .isQualifications
        isbtn()
        color:$color-text-f;
        font-size:$font-size-large;
        a
          color:$color-text-f;
          font-size:$font-size-large;
    .foot
      position:absolute;
      bottom:4px;
      left:0;
      right:0;
      text-align:center;
      font-size:$font-size-medium ;
      color:$color-text-f;
</style>
