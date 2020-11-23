<template>
  <div class="enroll">

   <div class="imgs" ref="imageDom" v-show="isDom">
      <img alt="" src="../assets/img/qualifications.jpg"  class="qualifications" />
      <p class="myname">{{name}}</p>
      <p class="content">
       自{{startTime}}至{{endTime}}，参加{{trainName}}，完成全部课程，予以结业。
      </p>
      <p class="time">{{time}}</p>
   </div>

   <div v-show="!isDom" class="qualificationsImg">
    <img :src="imgUrl" alt="" >
   </div>

   <div @click="clickGeneratePicture" v-show="isDom" class="createImg">点击此处生成证书</div>

   <div v-show="!isDom" class="text">
      <p class="congratulations">恭喜您完成全部学业，请再接再厉</p>
      <p class="preserve">长按证书保存图片</p>
   </div>

  </div>
</template>
<script>
  import html2canvas from "html2canvas";
  import {getCertificationInfo} from "../assets/js/api.js";
  export default {
    name: "Enroll",
    data(){
      return{
        imgUrl:"",
        name:"",
        startTime:"",
        endTime:"",
        trainName:"",
        time:"",
        isDom:true,
        train_class_id:null,
        user_id:null
      }
    },
    created(){
      this.train_class_id = this.$route.query.train_class_id;
      this.user_id = this.$route.query.user_id;
      this._getCertificationInfo();

    },
    methods:{
      _getCertificationInfo(){
        let data={
          user_id:this.user_id,
          train_class_id:this.train_class_id
        }
        getCertificationInfo(data).then(res=>{
          if(res.status == true){
            this.name = res.data.user_info.username;
            this.time = res.data.train_class_info.certificate_date;
            this.startTime = res.data.train_class_info.start_time_show;
            this.endTime = res.data.train_class_info.end_time_show;
            this.trainName = res.data.train_class_info.train_name
          }
        })
      },
      clickGeneratePicture() {
        html2canvas(this.$refs.imageDom,
         { allowTaint:true,}
        ).then(canvas => {
          // 转成图片，生成图片地址
          this.imgUrl = canvas.toDataURL("image/png");
          this.isDom = false;
        }).catch((e) =>  console.log(e));;
      }
    }
  }
</script>
<style lang="stylus" scoped> 
  @import "../assets/css/common.styl"
  .imgs
    position:relative
    .qualifications
      width:100%;
    .myname
      position:absolute
      top:33%
      left:13%
      font-size:12px
    .content
      position:absolute
      text-indent:2em
      top:45%
      left:16%
      right:16%
      height:44px
      font-size:10px
      line-height:180%
    .time
      position:absolute
      top:80%
      right:13%
      font-size:6px
  .qualificationsImg
    img
      width:100%;
  .createImg
    margin-top:20px !important
    color:$color-text-f
    font-size:$font-size-medium-x 
    isbtn()
  .text
    text-align: center
    .congratulations
      font-size:$font-size-large
      font-weight:$font-weight-blod 
    .preserve
      margin-top:10px
      font-size:$font-size-medium-x 
</style>
