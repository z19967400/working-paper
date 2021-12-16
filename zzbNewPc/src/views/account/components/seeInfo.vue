<template>
  <div v-loading="data.loading" class="seeCreditor">
    <div class="creditor">
      <!-- <el-row class="zrn-row">
        <span class="el-form-item__label">所属账户
        </span>
        <span class="value">{{data.admin_account}}</span>
      </el-row> -->
      <el-row class="zrn-row">
        <span class="el-form-item__label">管理员头像</span>
        <span class="value">
          <el-tooltip class="item" effect="dark" content="点击查看管理员头像" placement="top">
            <img @click="preview(data.admin_head_img)" class="img" :src="data.admin_head_img" />
          </el-tooltip>
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">登录名</span>
        <span class="value">{{data.admin_account}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">真实姓名</span>
        <span class="value">{{data.admin_name}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">身份证号</span>
        <span class="value">
          {{data.id_number}}
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">手机号码</span>
        <span class="value">
          {{data.admin_phone_number}}
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">电子邮箱</span>
        <span class="value">
          {{data.admin_email}}
        </span>
      </el-row>
      <!-- <el-row class="zrn-row">
        <span class="el-form-item__label">总账户权限</span>
        <span class="value">
          {{data.is_super == 1?'开放':'关闭'}}
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">子账户权限</span>
        <span class="value">
          {{data.is_super == 1?'开放':'关闭'}}
        </span>
      </el-row> -->
    </div>
    <el-divider content-position="left">债权人信息</el-divider>
    <div v-for="(item,index) in data.list" :key="index" class="adminCell">
      <el-row class="zrn-row">
        <span class="el-form-item__label">债权人名称
        </span>
        <span class="value">{{item.creditor_name}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">授权书</span>
        <span class="value">
          <el-tooltip class="item" effect="dark" content="点击查看授权委托书" placement="top">
            <span class="textUrl" v-if="substr(item.authorization_file) == '.pdf'" @click="preview(item.authorization_file)">{{sblicet(item.authorization_file)}}</span>
            <img v-else @click="preview(item.authorization_file)" class="img" :src="item.authorization_file" />
          </el-tooltip>
        </span>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/Accounts'

@Component({})
export default class About extends Vue {
  @Prop() seeData!: any
  // data
  data: any = {
    loading: false,
    id: 0,
    account_name: '',
    admin_account: '',
    admin_head_img: '',
    admin_name: '',
    admin_email: '',
    admin_phone_number: '',
    is_account_admin: '',
    is_super: '',
    list: [],
  }
  @Watch('seeData', { immediate: true })
  seeIdChangeVal(newVal: any, oldVal: any) {
    let self: any = this
    if (newVal != null && newVal != '') {
      self.data.loading = true
      Object.keys(self.data).forEach((key: string) => {
        if (newVal[key] != undefined) {
          self.data[key] = newVal[key]
        }
      })
      Api.GetCreditorListV2(newVal.id).then((res: any) => {
        self.data.list = res.data
        self.data.loading = false
      })
    }
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }

  preview(url: string) {
    window.open(url)
  }
  //截取小数点后字符
  substr(val: string) {
    if (val == null || val == '') {
      return null
    }
    let result: string = val.substring(val.lastIndexOf('.'))
    return result
  }
  //字符截取
  sblicet(val: string) {
    let var1: string = val.substring(val.lastIndexOf('/') + 1)
    let var2: any = var1.substring(0, var1.indexOf('_'))
    return var2
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.seeCreditor {
  max-height: 600px;
  overflow-y: auto;
  padding-top: 10px;
  & .adminCell {
    box-shadow: 0 0px 5px #ccc;
    width: 90%;
    margin: 0px auto 20px auto;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    & .el-form-item__label {
      width: 110px !important;
    }
    & .el-form-item {
      height: auto !important;
      min-height: 40px;
      margin-bottom: 20px;
    }
    & .el-icon-close {
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      z-index: 1111;
    }
  }
  & .zrn-row {
    min-height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: start;
    & .el-form-item__label {
      width: 140px;
    }
    & .value {
      color: #303133;
      margin-left: 20px;
      & .img {
        width: 120px;
        cursor: pointer;
      }
      & .textUrl {
        color: #67c23a;
        cursor: pointer;
      }
    }
  }
}
</style>
