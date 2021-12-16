<template>
  <div v-loading="data.loading" class="seeCreditor">
    <div class="creditor">
      <!-- <el-row class="zrn-row">
        <span class="el-form-item__label">审核状态
        </span>
        <span class="value">{{data.audit_status}}</span>
      </el-row> -->
      <el-row class="zrn-row">
        <span class="el-form-item__label">营业执照</span>
        <span class="value">
          <el-tooltip class="item" effect="dark" content="点击查看营业执照" placement="top">
            <img @click="preview(data.license_img_url)" class="img" :src="data.license_img_url" />
          </el-tooltip>
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">债权人名称</span>
        <span class="value">{{data.creditor_name}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">统一社会信用代码</span>
        <span class="value">{{data.license_no}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">办公地址</span>
        <span class="value">
          {{data.detailed_address}}
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">创建人</span>
        <span class="value">
          {{data.create_name}}
        </span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">创建时间</span>
        <span class="value">
          {{data.create_time}}
        </span>
      </el-row>
    </div>
    <el-divider content-position="left">管理员</el-divider>
    <div v-for="(item,index) in data.admin_list" :key="index" class="adminCell">
      <el-row class="zrn-row">
        <span class="el-form-item__label">审核状态
        </span>
        <span class="value">{{item.audit_status == 'Audit_states_0'?'待审核':item.audit_status == 'Audit_states_1'?'未通过':"已通过"}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">真实姓名
        </span>
        <span class="value">{{item.admin_name}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">身份证号</span>
        <span class="value">{{item.id_number}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">手机号码</span>
        <span class="value">{{item.admin_phone_number}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">电子邮箱</span>
        <span class="value">{{item.admin_email}}</span>
      </el-row>
      <el-row class="zrn-row">
        <span class="el-form-item__label">管理员授权书</span>
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
import * as Api from '../../api/creditor'

@Component({})
export default class About extends Vue {
  @Prop() seeId!: any
  // data
  data: any = {
    loading: false,
    id: 0,
    creditor_name: '', //债群人名称
    detailed_address: '', //办公地址
    license_no: '', //统一社会代码
    license_img_url: '',
    audit_status: '', //审核状态
    audit_feedback: '', //审核反馈
    create_time: '', //创建时间
    create_name: '', //创建人
    admin_list: [], //管理员列表
  }
  @Watch('seeId', { immediate: true })
  seeIdChangeVal(newId: any, oldId: any) {
    if (newId != 0 && newId != null && newId != '') {
      this.data.loading = true
      Api.getcreditor(newId).then((res: any) => {
        res.data.creditor.create_time = res.data.creditor.create_time.replace('T', ' ')
        res.data.creditor.create_time = res.data.creditor.create_time.substring(
          0,
          res.data.creditor.create_time.lastIndexOf(':')
        )
        res.data.creditor.audit_status =
          res.data.creditor.audit_status == 'Audit_states_0'
            ? '待审核'
            : res.data.creditor.audit_status == 'Audit_states_1'
            ? '未通过'
            : '已通过'
        Object.keys(res.data.creditor).forEach((key: string) => {
          this.data[key] = res.data.creditor[key]
        })
        this.data.admin_list = res.data.creditor_admin
        this.data.loading = false
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
