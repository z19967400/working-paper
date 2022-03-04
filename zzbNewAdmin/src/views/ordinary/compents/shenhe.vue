<template>
  <div class="shenhe">
    <div class="shenhe-box">
      <el-divider content-position="left">债权人信息</el-divider>
      <el-row v-if="data.info.creditor_type === 'Creditor_states_1'">
        <el-col :span="5" class="lable">身份证人像面</el-col>
        <el-col :span="12">
          <img
            class="img"
            @click="preview(data.info.id_card_img_01)"
            :src="data.info.id_card_img_01"
          />
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="5" class="lable">营业执照</el-col>
        <el-col :span="12">
          <img
            class="img"
            @click="preview(data.info.license_img_url)"
            :src="data.info.license_img_url"
          />
        </el-col>
      </el-row>
      <el-row v-if="data.info.creditor_type === 'Creditor_states_1'">
        <el-col :span="5" class="lable">身份证国徽面</el-col>
        <el-col :span="12">
          <img
            class="img"
            @click="preview(data.info.id_card_img_02)"
            :src="data.info.id_card_img_02"
          />
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="5" class="lable">代理人授权书</el-col>
        <el-col :span="12">
          <img
            class="img"
            v-if="substr(data.info.agent_authorization) !== 'pdf'"
            @click="preview(data.info.agent_authorization)"
            :src="data.info.agent_authorization"
          />
          <el-link v-else type="success">{{
            sblicet(data.info.agent_authorization)
          }}</el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="lable">债权人名称</el-col>
        <el-col :span="12">{{ data.info.creditor_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="lable">{{
          data.info.creditor_type === 'Creditor_states_1'
            ? '身份证号码'
            : '统一社会信用代码'
        }}</el-col>
        <el-col :span="12">{{
          data.info.creditor_type === 'Creditor_states_1'
            ? data.info.agent_id_number
            : data.info.license_no
        }}</el-col>
      </el-row>
      <div v-if="data.info.creditor_type === 'Creditor_states_1'">
        <el-row>
          <el-col :span="5" class="lable">手机号码</el-col>
          <el-col :span="12">{{ data.info.phone_number }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">电子邮箱</el-col>
          <el-col :span="12">{{ data.info.email }}</el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="5" class="lable">代理人姓名</el-col>
          <el-col :span="12">{{ data.info.agent_name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">代理人身份证号</el-col>
          <el-col :span="12">{{ data.info.agent_id_number }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">代理人手机号码</el-col>
          <el-col :span="12">{{ data.info.phone_number }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">代理人电子邮箱</el-col>
          <el-col :span="12">{{ data.info.email }}</el-col>
        </el-row>
      </div>
      <el-divider content-position="left">审核</el-divider>
      <el-form :model="data.shenhe" label-width="120px">
        <el-form-item label="审核状态">
          <el-radio-group v-model="data.shenhe.audit_status">
            <el-radio label="Audit_states_0">待审核</el-radio>
            <el-radio label="Audit_states_1">未通过</el-radio>
            <el-radio label="Audit_states_2">已通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核反馈">
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="审核反馈将呈现给用户"
              v-model="data.shenhe.audit_feedback"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="后台备注">
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="后台备注仅后台查看"
              v-model="data.shenhe.back_remarks"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({})
export default class shenhe extends Vue {
  @Prop() row!: any
  data: any = {
    info: {},
    shenhe: {
      id: 0,
      audit_status: '',
      audit_feedback: '',
      back_remarks: ''
    }
  }
  @Watch('row', { immediate: true, deep: true })
  rowChangeVal(newVal: any, oldVal: any) {
    this.data.info = newVal
    Object.keys(this.data.shenhe).forEach((key: string) => {
      this.data.shenhe[key] = newVal[key]
    })
  }
  //打开图片
  preview(file: string) {
    window.open(file)
  }
  //提交审核
  onSubmit() {
    this.$emit('onSubmit', this.data.shenhe)
  }
  //关闭弹窗
  close() {
    this.$emit('close')
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
.shenhe {
  & .shenhe-box {
    overflow-y: auto;
    max-height: 500px;
    padding-top: 10px;
  }
  & .lable {
    text-align: right;
    padding-right: 10px;
    color: #606266;
  }
  & .img {
    width: 100px;
    cursor: pointer;
  }
  & .el-row {
    margin-bottom: 10px;
    min-height: 32px;
    line-height: 32px;
  }
}
</style>
