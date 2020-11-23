<template>
  <div class="form">
    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
        name="userName"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="organization"
        name="organization"
        label="单位"
        placeholder="单位"
        :rules="[{ required: true, message: '请填写单位' }]"
      />
      <van-field
        v-model="contactNum"
        name="contactNum"
        label="电话"
        placeholder="电话"
        :rules="[{ pattern, message: '请填写正确手机号' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="button" @click='onSubmit' :disabled='buttonLock'>
          提交
        </van-button>
      </div>
    </van-form>

    
  </div>
</template>
<script>
  import {setTrainUser} from "../assets/js/api.js";
  import { Toast } from 'vant';
  let submitLocks =false;
  export default {
    name: "Form",
     data() {
      return {
        train_class_id:null,
        userName: '',
        contactNum:'',
        organization:'',
        pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
        buttonLock:false
      };
    },
    created(){
      this.train_class_id = this.$route.query.train_class_id;
    },
    methods: {
      onSubmit() {
        if(submitLocks){
          return false ;
        }
        submitLocks = true;
        let _this = this;
        let data = {
          train_class_id:this.train_class_id,
          user_name:this.userName,
          contact_num:this.contactNum,
          organization:this.organization
        }
        
        setTrainUser(data).then(res=>{
          this.buttonLock = true;
          submitLocks = false;
          if(res.status == true){
              localStorage.setItem('userId',res.data.user_info.id);
              Toast.success({
                message:res.msg,
                duration:1000
              });
             setTimeout(function(){
                _this.$router.push({ path: '/'});
              },2000);  
          } 
        })
      },
    },
  }
</script>
<style lang="stylus" scoped>
  @import "../assets/css/common.styl"
  .form /deep/ .van-button--info
    background-color: $color-banckground-is;
    border: 1px solid $color-banckground-is;
    font-size:$font-size-large
  .form
    padding: 40px 40px 0;
    
</style>
