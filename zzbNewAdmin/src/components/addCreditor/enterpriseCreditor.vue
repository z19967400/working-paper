<template>
  <div class="addVip-wrap">
    <div class="addVip-box">
      <el-form
        :model="add"
        :rules="data.rules"
        :inline="true"
        class="demo-form-inline demo-ruleForm"
        ref="ruleForm"
        label-width="135px"
        :style="{ height: height + 'px' }"
      >
        <!-- <el-form-item label="债权人类型" prop="id_type">
          <el-select v-model="add.creditor_type" @change="creditorChange" placeholder="选择类型">
            <el-option label="企业" value="Creditor_states_0"></el-option>
            <el-option label="个人" value="Creditor_states_1"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="证件类型" prop="id_type">
          <el-select v-model="add.id_type" placeholder="选择证照类型">
            <el-option v-if="add.creditor_type == 'Creditor_states_1'" label="身份证" :value="1"></el-option>
            <el-option v-if="add.creditor_type == 'Creditor_states_1'" label="士官证" :value="2"></el-option>
            <el-option v-if="add.creditor_type == 'Creditor_states_1'" label="护照" :value="3"></el-option>
            <el-option v-if="add.creditor_type == 'Creditor_states_1'" label="港澳台通行证" :value="4"></el-option>
            <el-option v-if="add.creditor_type == 'Creditor_states_0'" label="营业执照" :value="5"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="upBox" v-if="add.id_type == 5" label="营业执照">
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=0'"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('license_img_url', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="add.license_img_url"
              :src="add.license_img_url"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i
            v-show="add.license_img_url"
            @click="preview(add.license_img_url)"
            class="el-icon-zoom-in preview"
          ></i>
        </el-form-item>
        <!-- <el-form-item v-if="add.id_type != 5" label="证照图片">
          <div class="uploads">
            <div class="upBox">
              <el-upload drag class="avatar-uploader" :action="burl + '/Upload/UploadImage?type=0'" :show-file-list="false" :on-success="(res,file)=>{handleAvatarSuccess('id_card_img_01',res,file)}" :before-upload="beforeAvatarUpload">
                <img v-if="add.id_card_img_01" :src="add.id_card_img_01" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i v-show="add.id_card_img_01" @click="preview(add.id_card_img_01)" class="el-icon-search preview"><span class="preview-text">+</span></i>
            </div>
            <div class="upBox">
              <el-upload drag class="avatar-uploader" :action="burl + '/Upload/UploadImage?type=0'" :show-file-list="false" :on-success="(res,file)=>{handleAvatarSuccess('id_card_img_02',res,file)}" :before-upload="beforeAvatarUpload">
                <img v-if="add.id_card_img_02" :src="add.id_card_img_02" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i v-show="add.id_card_img_02" @click="preview(add.id_card_img_02)" class="el-icon-search preview"><span class="preview-text">+</span></i>
            </div>
          </div>
        </el-form-item> -->
        <el-form-item label="统一社会信用代码" prop="license_no">
          <el-input
            style="width:330px;"
            placeholder="上传证照自动填充"
            v-model="add.license_no"
          ></el-input>
        </el-form-item>
        <el-form-item label="债权人名称" prop="creditor_name">
          <el-input
            style="width:330px;"
            placeholder="上传证照自动填充"
            v-model="add.creditor_name"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item v-if="add.creditor_type == 'Creditor_states_0'">
          <div slot="label">
            <span>代理人姓名</span>
            <el-tooltip class="item" effect="dark" content="仅供旧版系统数据迁移所需" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-input v-model="add.agent_name"></el-input>
        </el-form-item>
        <el-form-item v-if="add.creditor_type == 'Creditor_states_0'">
          <div slot="label">
            <span>代理人身份证</span>
            <el-tooltip class="item" effect="dark" content="仅供旧版系统数据迁移所需" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-input v-model="add.agent_id_number"></el-input>
        </el-form-item>
        <el-form-item class="upBox" v-if="add.creditor_type == 'Creditor_states_0'">
          <div slot="label">
            <span>授权书</span>
            <el-tooltip class="item" effect="dark" content="仅供旧版系统数据迁移所需" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div> -->
        <!-- <el-upload drag class="avatar-uploader" :action="burl + '/Upload/UploadImage?type=0'" :show-file-list="false" :on-success="(res,file)=>{handleAvatarSuccess('agent_authorization',res,file)}" :before-upload="beforeAvatarUpload">
            <img v-if="add.agent_authorization" :src="add.agent_authorization" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i v-show="add.agent_authorization" @click="preview(add.agent_authorization)" class="el-icon-search preview"><span class="preview-text">+</span></i>
        </el-form-item> -->
        <!-- <el-form-item label="公司电话">
          <el-input v-model="add.phone_number"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所在地区">
          <comAddress @emitAddress="getRegion" :address="data.address"></comAddress>
        </el-form-item> -->
        <el-form-item label="办公地址" prop="detailed_address">
          <el-input
            style="width:330px;"
            v-model="add.detailed_address"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="电子邮箱" prop="email">
          <el-input style="width:330px;" v-model="add.email"></el-input>
        </el-form-item>-->
        <el-form-item label="后台备注">
          <el-input type="textarea" v-model="add.back_remarks"></el-input>
        </el-form-item>
      </el-form>
      <el-col class="edit-bottom-bin" :span="12">
        <el-button
          style="margin-left: 135px;"
          type="primary"
          :loading="data.submitType"
          @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { baseURL } from '../../utils/request'
import * as Api from '../../api/user'
import { UserOptions } from '../../types/index'
import { verifyPhone, verifyEmall } from '../../utils/common'
import { comAddress } from '../index'
import { api } from '../../../../zzbPc/src/assets/js/api'
@Component({
  components: {
    comAddress
  }
})
export default class About extends Vue {
  //prop
  @Prop() userData?: any
  //watch
  @Watch('userData', { deep: true, immediate: true })
  userDataChange(newVal: any, oldVal: any) {
    let self: any = this
    if (newVal.add) {
      self.add = {
        id: 0,
        member_id: 0,
        member_vip_admin_id: 0,
        creditor_name: '',
        creditor_type: 'Creditor_states_0',
        agent_name: '',
        agent_id_number: '',
        agent_authorization: '',
        phone_number: '',
        email: '',
        country: '',
        province: '',
        city: '',
        county: '',
        detailed_address: '',
        id_type: 5,
        id_card_img_01: '',
        id_card_img_02: '',
        license_no: '',
        license_img_url: '',
        back_remarks: ''
      }
      return false
    }
    if (newVal != null) {
      Object.keys(self.add).forEach((key: string) => {
        if (newVal[key] != undefined) {
          self.add[key] = newVal[key]
        }
      })
      if (self.add['creditor_type'] == 'Creditor_states_0') {
        self.add.id_type = 5
      }
      this.data.address = [
        newVal.country,
        newVal.province,
        newVal.city,
        newVal.county
      ]
    }
  }
  //邮箱规则验证
  validateEmall = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyEmall(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  //手机号码验证
  validatePhone = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyPhone(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  // data
  data: any = {
    submitType: false,
    rules: {
      Creditor_states: [
        { required: true, message: '请上传证照', trigger: 'blur' }
      ],
      id_type: [
        { required: true, message: '请选择债权人类型', trigger: 'blur' }
      ],
      creditor_name: [
        { required: true, message: '请输入债权人', trigger: 'blur' }
      ],
      email: [
        {
          required: true,
          validator: this.validateEmall,
          trigger: 'blur'
        }
      ],
      phone_number: [
        {
          required: true,
          validator: this.validatePhone,
          trigger: 'blur'
        }
      ],
      license_no: [
        {
          required: true,
          message: '请输入统一社会信用代码、',
          trigger: 'blur'
        }
      ]
    },
    debt_types: [],
    address: ''
  }
  add: any = {
    id: 0,
    member_id: 0,
    member_vip_admin_id: 0,
    creditor_name: '',
    creditor_type: 'Creditor_states_0',
    agent_name: '',
    agent_id_number: '',
    agent_authorization: '',
    phone_number: '',
    email: '',
    country: '',
    province: '',
    city: '',
    county: '',
    detailed_address: '',
    id_type: 5,
    id_card_img_01: '',
    id_card_img_02: '',
    license_no: '',
    license_img_url: '',
    back_remarks: ''
  }
  height: number = 0
  burl: string = ''
  created() {
    // this.height = document.body.offsetHeight - 180;
    this.height = 350
  }

  mounted() {
    this.burl = baseURL
  }

  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        this.$emit('determine', self.add)
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      // this.$message.success(res.data.Msg)
      self.add[prop] =
        'http://file.debteehelper.com' +
        res.data.FileUrl +
        res.data.FileExtension
      if (self.add.id_type == 1 || self.add.id_type == 5) {
        if (prop == 'id_card_img_01' || prop == 'license_img_url') {
          self.recognition(self.add.id_type, self.add[prop], prop)
        }
      }
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    const isok = this.add.id_type == ''
    if (isok) {
      this.$message.warning('请先选择证照类型!')
    }
    return !isok
  }
  //上传之后识别证照
  recognition(type: number | string, path: string, prop: string) {
    let self: any = this
    let ttp: any = type == 1 ? 0 : 2
    Api.Recognition(ttp, path).then((res: any) => {
      if (prop == 'id_card_img_01') {
        self.add.license_no = res.data.num
        self.add.creditor_name = res.data.name
      } else {
        self.add.license_no = res.data.reg_num
        self.add.creditor_name = res.data.name
      }
    })
  }

  //重置表单
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.resetFields()
    this.$emit('cancel')
  }
  //获取子组件地区返回值
  getRegion(data: any) {
    let add: any = this.add
    Object.keys(add).forEach((key: string) => {
      if (data[key] != undefined) {
        add[key] = data[key]
      }
    })
  }
  //图片预览
  preview(url: string) {
    window.open(url)
  }
  //债权人种类切换
  creditorChange(val: string) {
    if (val == 'Creditor_states_1') {
      this.add.id_type = 1
    } else {
      this.add.id_type = 5
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.addVip-wrap {
  width: 100%;
  min-height: 100%;
  background-color: $main-body-bgColor;
  .addVip-box {
    .el-form {
      overflow-y: auto;
      // height: 450px;
      .el-form-item__content {
        line-height: normal;
      }
      .ql-container {
        height: 300px;
      }
    }
  }
  .el-textarea__inner {
    width: 420px;
    height: 100px;
  }
  .el-select {
    width: 202px;
  }
  .el-upload-dragger {
    width: 100px !important;
  }
  .el-upload {
    margin-right: 20px !important;
  }
  .el-form-item {
    display: flex;
  }
  .uploads {
    display: flex;
  }
  .el-form-item__label {
    min-width: 100px;
  }
  .upBox {
    position: relative;
    .preview {
      position: absolute;
      right: 25px;
      top: 5px;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>
