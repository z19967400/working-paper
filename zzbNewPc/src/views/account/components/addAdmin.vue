<template>
  <div class="add-wrap" v-loading="loading" element-loading-text="加载中">
    <span @click="close" class="el-icon-close"></span>
    <el-form :model="data" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <div id="sroll" class="sroll">
        <el-form-item style="display:none;" v-if="id === undefined" label="所属账户">
          <el-col :span="22">
            <el-select style="width:100%;" v-model="data.member_vip_account_id" placeholder="请选择所属账户">
              <el-option v-for="item in accounts" :key="item.id" :label="item.account_name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员头像">
          <el-upload drag class="avatar-uploader" :action="burl + '/Upload/UploadImage?type=0'" :show-file-list="false" :on-success="(res,file)=>{handleAvatarSuccess('admin_head_img',res,file)}" :before-upload="beforeAvatarUpload">
            <img v-if="data.admin_head_img" :src="data.admin_head_img" class="avatar" />
            <i style="font-size:28px;margin-top:20px;color:#909399;" v-else class="el-icon-upload2"></i>
            <span style="display:block;position: relative;top: -15px;color:#909399;">上传</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="登录名" prop="admin_account">
          <el-col :span="22">
            <el-input v-model="data.admin_account"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="真实姓名" prop="admin_name">
          <el-col :span="22">
            <el-input :disabled="disabled" placeholder="请填写真实姓名，已免影响后续操作" v-model="data.admin_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_number">
          <el-col :span="22">
            <el-input :disabled="disabled" v-model="data.id_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" prop="admin_phone_number">
          <el-col :span="22">
            <el-input :disabled="disabled" v-model="data.admin_phone_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="admin_email">
          <el-col :span="22">
            <el-input v-model="data.admin_email"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item>
          <span slot="label">
            <span>总账户权限</span>
            <el-tooltip effect="dark" placement="right">
              <span slot="content">总账户权限：可查看及操作所有账户下发起的委托<br /><br />子账户权限：仅能查看及操作当前账户下发起的委托<br /><br />总账户和子账户权限均关闭：仅能查看及操作当前管理员发起的委托</span>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-col :span="22">
            <el-radio-group v-model="data.is_super">
              <el-radio label="开放"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item v-show="data.is_super != '开放'">
          <span slot="label">
            <span>子账户权限</span>
            <el-tooltip effect="dark" placement="right">
              <span slot="content">总账户权限：可查看及操作所有账户下发起的委托<br /><br />子账户权限：仅能查看及操作当前账户下发起的委托<br /><br />总账户和子账户权限均关闭：仅能查看及操作当前管理员发起的委托</span>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-col :span="22">
            <el-radio-group v-model="data.is_account_admin">
              <el-radio label="开放"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item> -->
        <el-divider v-if="!disabled" content-position="left">债权人设置</el-divider>
        <div v-show="!disabled" ref="creditorlist" class="creditorList">
          <div v-for="(item,index) in data.creditor_list" :key="index" class="creditorCell">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i @click="delectCreditor(index)" class="el-icon-close"></i>
            </el-tooltip>
            <el-row class="zrn-row">
              <span class="el-form-item__label">债权人名称
              </span>
              <span class="value">{{item.name}}</span>
            </el-row>
            <el-row class="zrn-row">
              <span class="el-form-item__label">授权书</span>
              <span class="value">
                <el-tooltip class="item" effect="dark" content="点击查看授权委托书" placement="top">
                  <span class="textUrl" v-if="substr(item.authorization_file) == '.pdf'" @click="preview2(item.authorization_file)">{{sblicet(item.authorization_file)}}</span>
                  <img v-else @click="preview2(item.authorization_file)" class="img" :src="item.authorization_file" />
                </el-tooltip>
              </span>
            </el-row>
          </div>
        </div>
        <el-form v-show="addCreditorType" :model="addCreditor" :rules="addCreditorRules" ref="ruleForm2" label-width="110px" class="addCreditor">
          <el-tooltip class="item" effect="dark" content="关闭" placement="top">
            <i @click="addCreditorClose" class="el-icon-close"></i>
          </el-tooltip>
          <el-form-item label="债权人名称" prop="admin_name">
            <el-col :span="22">
              <el-input size="small" v-model="addCreditor.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="授权书" prop="authorization_img">
            <el-col :span="12">
              <el-upload class="upload-demo" :on-preview="preview" :on-exceed="exceed" :limit='1' :action="burl + '/Upload/UploadImage?type=7'" :on-change="handleChange" :on-success="(res,file)=>{handleAvatarSuccess('authorization_file',res,file)}" :before-upload="beforeAvatarUpload" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="10">
              <div v-if="!disabled" style="line-height: 1.5;">
                <span style="font-size:12px;color:#606366;display:block;">请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span>
                <el-link style="font-size:12px;" @click="upSq" type="success">下载授权委托书模板</el-link>
              </div>
              <div v-else style="line-height: 1.5;">
                <span style="font-size:12px;color:#606366;display:block;">不可修改，如需修改管理员身份证号及授权委托书，请联系债主帮客服4006 321 918</span>
              </div>
            </el-col>
          </el-form-item>
          <el-button style="display:block;margin:auto;" type="primary" @click="addCreditorQruy" size="small">确定</el-button>
        </el-form>
        <el-row v-show="!disabled" class="addAdmin-btns">
          <span style="width:110px;display:inline-block;line-height: 32px;" class="el-form-item__label">选择债权人</span>
          <el-select style="width:280px;margin-right:20px;" v-model="addCreditor.creditor_id" size="small" placeholder="请选择">
            <el-option v-for="(item,index) in creditors" :key="index" :label="item.creditor_name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="selectQruy" size="small">确定</el-button>
        </el-row>
      </div>
      <el-form-item class="footer-btns">
        <el-button :disabled="data.btnType" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { verifyPhone, verifyEmall } from '../../../utils/common'
import * as Api from '../../../api/Accounts'
import { baseURL, pp } from '../../../utils/request'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
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
  // prop
  @Prop({
    required: false,
    default: '',
  })
  addData!: any
  @Prop({}) btnType!: boolean
  @Prop({}) status!: boolean
  @Prop({}) id!: any
  @Prop({}) accounts!: any
  @Watch('addData', { deep: true })
  addDataChangeVal(newVal: any, oldVal: any) {
    let self: any = this
    self.$nextTick(() => {
      let data: any = JSON.parse(JSON.stringify(newVal))
      this.data.creditor_list = []
      Object.keys(self.data).forEach((key: string) => {
        if (data[key] != undefined && data[key] != null) {
          if (key == 'authorization_img') {
            self.data[key] = data[key]
            let item: any = [{ name: '上传的文件', url: data[key] }]
            if (item[0].url != '') {
              self.fileList = item
            }
          } else {
            if (data[key] != undefined) {
              self.data[key] = data[key]
            }
          }
        }
      })
    })
  }
  @Watch('btnType', { deep: true })
  btnTypeChangeVal(newVal: any, oldVal: any) {
    let self: any = this
    self.data.btnType = newVal
  }
  @Watch('status', { deep: true, immediate: true })
  statusChangeVal(newVal: boolean, oldVal: boolean) {
    let slef: any = this
    slef.disabled = newVal
  }
  // data
  data: any = {
    id: 0,
    member_vip_account_id: 0,
    admin_name: '',
    admin_head_img: '',
    admin_phone_number: '',
    admin_email: '',
    admin_account: '',
    id_number: '',
    is_super: '关闭',
    is_account_admin: '关闭',
    audit_status: '',
    audit_feedback: '',
    btnType: false,
    creditor_list: [],
  }
  disabled: boolean = false
  loading: boolean = false
  rules: any = {
    admin_name: [{ required: true, message: '请输入管理员真实姓名', trigger: 'blur' }],
    admin_account: [{ required: true, message: '请输入​管理员账户登录名', trigger: 'blur' }],
    id_number: [{ required: true, message: '请输入管理员身份证', trigger: 'blur' }],
    admin_email: [{ required: true, validator: this.validateEmall, trigger: 'blur' }],
    admin_phone_number: [{ required: true, validator: this.validatePhone, trigger: 'blur' }],
  }
  addCreditorRules: any = {
    authorization_file: [{ required: true, message: '请上传授权书', trigger: 'blur' }],
  }
  submitType: boolean = false
  burl: string = ''
  fileList: any = []
  creditors: any = []
  addCreditorType: boolean = false
  addCreditor: any = {
    creditor_id: '',
    authorization_file: '',
    name: '',
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let qz: string = pp === 'production' ? '/api/' : '/api/pt'
    this.burl = baseURL + qz
    this.getAccountCreditors()
  }
  //确定
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        self
          .$confirm('您确定新增管理员吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            self.data.loading = true
            let parmas: any = Object.assign({}, self.data)
            parmas.is_super = parmas.is_super == '开放' ? 1 : 0
            parmas.is_account_admin = parmas.is_account_admin == '开放' ? 1 : 0
            if (!self.disabled && self.data.creditor_list.length <= 0) {
              self.$message.warning('请设置债权人')
              return false
            }
            setTimeout(() => {
              this.$emit('determine', parmas)
            }, 200)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消新增',
            })
          })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  // 取消
  resetForm(formName: string) {
    let self: any = this
    self.$nextTick(() => {
      let form: any = this.$refs[formName]
      self.fileList = []
      form.resetFields()
      self.$emit('cancel')
    })
  }
  //关闭
  close() {
    this.addCreditorClose()
    this.data.creditor_list = []
    this.resetForm('ruleForm')
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    this.loading = true
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.loading = false
      this.$message.error('上传头像图片大小不能超过 50MB!')
    }
    return isLt2M
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      if (prop === 'authorization_file') {
        self.addCreditor[prop] =
          'https://file.debteehelper.com' + res.data.FileUrl + res.data.FileExtension
        let item: any = [
          {
            name: file.name,
            url:
              'https://file.debteehelper.com' +
              file.response.data.FileUrl +
              file.response.data.FileExtension,
          },
        ]
        self.fileList = item
      } else {
        self.data[prop] =
          'https://file.debteehelper.com' + res.data.FileUrl + res.data.FileExtension
      }
    } else {
      this.$message.warning(res.data.Msg)
    }
    this.loading = false
  }
  //下载授权书
  upSq() {
    window.open('http://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx')
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3)
  }
  //图片预览
  preview2(url: string) {
    window.open(url)
  }
  preview(file: any) {
    if (file.url == undefined) {
      let url: string =
        'https://file.debteehelper.com' +
        file.response.data.FileUrl +
        file.response.data.FileExtension
      window.open(url)
    } else {
      window.open(file.url)
    }
  }
  exceed(files: any, fileList: any) {
    this.$message.warning('请先删除已上传文件')
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
  //获取账户下所有债权人
  getAccountCreditors() {
    Api.getAccountCreditors().then((res: any) => {
      this.creditors = res.data
    })
  }
  //关闭债权人选择面板
  addCreditorClose() {
    let self: any = this
    self.addCreditorType = false
    self.addCreditor.authorization_file = ''
    self.fileList = []
    self.$nextTick(() => {
      self.$refs['ruleForm2'].resetFields()
    })
  }
  //确定选择的债权人
  selectQruy() {
    const list: any = this.data.creditor_list.filter((item: any) => {
      return item.creditor_id == this.addCreditor.creditor_id
    })
    if (list.length > 0) {
      this.$message.warning('请勿重复添加')
      return false
    }
    const file: any = this.creditors.filter((item: any) => {
      return item.id == this.addCreditor.creditor_id
    })[0]
    this.addCreditor.name = file.creditor_name
    this.addCreditorType = true
    this.$nextTick(() => {
      const scrollDom: any = document.getElementById('sroll')
      scrollDom.scrollTop = scrollDom.scrollHeight
    })
  }
  //确定新增债权人
  addCreditorQruy() {
    const item: any = Object.assign({}, JSON.parse(JSON.stringify(this.addCreditor)))
    let creditor_list: any = this.data.creditor_list
    let from: any = this.$refs['ruleForm2']
    from.validate((valid: Boolean) => {
      if (valid) {
        const list: any = creditor_list.filter((item2: any) => {
          return item2.creditor_id == item.creditor_id
        })

        creditor_list.push(item)
        this.addCreditorClose()
      }
    })
  }
  //删除分配的债权人
  delectCreditor(index: number) {
    const slef: any = this
    slef
      .$confirm('您确定删除该债权人吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        slef.data.creditor_list.splice(index, 1)
      })
      .catch(() => {
        slef.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.add-wrap {
  width: 100%;
  .el-icon-close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    font-size: 16px;
  }
  .el-textarea {
    width: 100% !important;
    .el-textarea__inner {
      height: 100px;
    }
  }
  .sroll {
    max-height: 500px;
    overflow-y: auto;
  }
  .footer-btns {
    position: relative;
    top: 0px;
    margin-top: 10px;
    text-align: center;
    & .el-form-item__content {
      margin-left: 0px !important;
    }
  }
  .el-upload-dragger {
    width: 100px !important;
  }
  .el-upload {
    margin-right: 20px !important;
  }
  .el-upload-dragger {
    height: 100px !important;
  }
  & .el-form-item {
    height: auto !important;
  }
  & .el-tooltip__popper {
    width: 100px !important;
  }
  // & .el-icon-close {
  //   right: 5px !important;
  //   top: 2px !important;
  // }
  & .el-icon-close-tip {
    display: none !important;
  }
  & .creditorCell,
  & .addCreditor {
    box-shadow: 0 0px 5px #ccc;
    width: 80%;
    margin: 0px auto 20px auto;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    & .el-form-item {
      height: auto !important;
      min-height: 40px;
      margin-bottom: 20px;
    }
    & .el-icon-close,
    & .el-icon-back {
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
      min-width: 110px;
    }
    & .value {
      color: #303133;
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
