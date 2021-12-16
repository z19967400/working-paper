<template>
  <div class="authenticationAdmin-box">
    <span class="title">律师认证新增/编辑 </span>
    <el-divider></el-divider>
    <div class="newEdit-wrap">
      <div :style="{ height: height + 'px' }" class="newEdit-box">
        <el-form
          ref="form"
          :rules="data.rules"
          :model="edit"
          label-width="80px"
          class="demo-form-inline"
          :inline="true"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="会员ID">
                <span class="text-title">{{ edit.member_id }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员姓名">
                <span class="text-title">{{ member_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-radio-group v-model="edit.lawyer_sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="律师姓名">
                <el-input v-model="edit.lawyer_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号" prop="">
                <el-input v-model="edit.lawyer_IDCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄" prop="">
                <el-input v-model="edit.lawyer_age"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机号码" prop="">
                <el-input v-model="edit.lawyer_phone_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电子邮箱" prop="">
                <el-input v-model="edit.lawyer_email"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="地区" prop="">
                <comAddress :address="regions" @emitAddress="getAddress"></comAddress>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="律所全称" prop="">
                <el-input v-model="edit.law_firm_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="律所地区" prop="">
                <comAddress
                  :address="lawFirmRegions"
                  name="地区"
                  @emitAddress="getAddress2"
                ></comAddress>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="律所地址" prop="">
                <!-- <comAddress :address="lawFirmRegions" @emitAddress="getAddress2"></comAddress> -->
                <el-input v-model="edit.law_firm_address_detailed"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="8">
                <el-form-item label="执业证号" prop="">
                  <el-input v-model="edit.license_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有效期" prop="">
                  <el-date-picker
                    v-model="edit.term_validity"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="执业证照">
                <el-upload
                  drag
                  class="avatar-uploader"
                  :action="burl + '/Upload/UploadImage?type=4'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="edit.practice_license"
                    :src="
                      strIntercept(edit.practice_license) == 'https:' ||
                      strIntercept(edit.practice_license) == 'http:'
                        ? edit.practice_license
                        : 'http://file.debteehelper.com/' +
                          edit.practice_license
                    "
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年检页照">
                <el-upload
                  drag
                  class="avatar-uploader"
                  :action="burl + '/Upload/UploadImage?type=4'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2"
                >
                  <img
                    v-if="edit.annual_inspection"
                    :src="
                      strIntercept(edit.annual_inspection) == 'https:' ||
                      strIntercept(edit.practice_license) == 'http:'
                        ? edit.annual_inspection
                        : 'http://file.debteehelper.com/' +
                          edit.annual_inspection
                    "
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="专长">
              <el-tag
                :key="index"
                v-for="(tag, index) in edit.expertise"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ 新增</el-button
              >
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="简介">
              <el-input
                type="textarea"
                v-model="edit.brief_introduction"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="审核状态">
              <el-radio-group v-model="edit.audit_status">
                <el-radio label="Audit_states_0">待审核</el-radio>
                <el-radio label="Audit_states_2">通过</el-radio>
                <el-radio label="Audit_states_1">未通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="审核反馈">
              <el-input
                type="textarea"
                v-model="edit.audit_feedback"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item style="bottom:0;" class="edit-bottom-bin">
              <el-button
                type="primary"
                :loading="data.submitType"
                @click="submitForm('form')"
                >确定</el-button
              >
              <el-button @click="quxiao">取消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/user'
import { comAddress } from '../../../components/index'
import { baseURL } from '../../../utils/request'
@Component({
  components: {
    comAddress
  }
})
export default class About extends Vue {
  // data
  data: any = {
    submitType: false,
    rules: {
      //
    }
  }
  height: number = 0
  burl: string = ''
  member_name: number = 0 //会员姓名
  regions: string = '' //地区
  lawFirmRegions: any = '' //律所地区
  inputVisible: boolean = false
  inputValue: string = ''
  edit: any = {
    id: 0, //律师ID
    member_id: 0, //会员ID
    lawyer_name: '', //律师姓名
    lawyer_IDCard: '', //身份证号
    lawyer_age: 0, //年龄
    lawyer_sex: '', //性别
    lawyer_phone_number: '', //手机号码
    lawyer_email: '', //邮箱
    lawyer_country: '', //所在地址 国家
    lawyer_province: '', //所在地址 省
    lawyer_city: '', //所在地址 区县
    lawyer_detailed: '', //所在地址 详细地址
    law_firm_name: '', //律所全称
    law_firm_address_country: '', //律所地区 国家
    law_firm_address_province: '', //律所地区 省
    law_firm_address_city: '', //律所地区 市
    law_firm_address_county: '', //律所地区 区县
    law_firm_address_detailed: '', //律所地区 详细地址
    license_number: '', //执业证号
    term_validity: '', //执业证有效期
    practice_license: '', //执业证照
    annual_inspection: '', //年检页照
    expertise: [], //专长
    audit_status: '', //审核状态
    brief_introduction: '' //简介
  }
  created() {
    let self: any = this
    self.height = document.body.offsetHeight - 220
    self.burl = baseURL
  }

  mounted() {
    let self: any = this
    self.getInfo(self.$route.params.id)
  }

  beforeDestroy() {
    //
  }

  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.submitType = true
        let parmas: any = Object.assign({}, self.edit)
        if (parmas.expertise.length == 0) {
          parmas.expertise = ''
        } else {
          parmas.expertise = JSON.stringify(parmas.expertise)
            .replace(/"/g, '')
            .replace('[', '')
            .replace(']', '')
        }
        Api.saveLawInfo(parmas).then((res: any) => {
          if (res.state) {
            self.resetForm('form')
            self.$message.success(res.msg)
            setTimeout(() => {
              this.data.submitType = false
              // self.$router.push({
              //   path: '/settings/news'
              // })
            }, 1000)
          } else {
            self.$message.warning(res.msg)
            this.data.submitType = false
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //重置表单
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.resetFields()
  }
  //获取律师信息
  getInfo(id: number) {
    let self: any = this
    Api.getLawInfo(id).then((res: any) => {
      self.member_name = res.data.member_name
      self.lawFirmRegions = [
        res.data.law_firm_address_country,
        res.data.law_firm_address_province,
        res.data.law_firm_address_city,
        res.data.law_firm_address_county
      ]
      Object.keys(self.edit).forEach((key: string) => {
        if (key == 'expertise') {
          self.edit[key] = res.data[key].split(',')
          // } else if (key == 'audit_status') {
          //   self.getType(res.data[key])
        } else {
          self.edit[key] = res.data[key]
        }
      })
    })
  }
  //执业证照上传
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      self.edit.practice_license = res.data.FileUrl + res.data.FileExtension
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  beforeAvatarUpload(file: any) {
    // const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isJPG) {
    //   this.$message.error("上传头像图片只能是 JPG 格式!");
    // }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }
  //年检页照上传
  handleAvatarSuccess2(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      self.edit.annual_inspection = res.data.FileUrl + res.data.FileExtension
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  beforeAvatarUpload2(file: any) {
    // const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isJPG) {
    //   this.$message.error("上传头像图片只能是 JPG 格式!");
    // }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }
  //获取地址栏子组件选择值
  getAddress(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
    // Object.keys(this.ruleForm).forEach((key: string) => {
    //   this.ruleForm[key] = data[key];
    // });
  }
  getAddress2(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
    // Object.keys(this.ruleForm).forEach((key: string) => {
    //   this.ruleForm[key] = data[key];
    // });
  }
  handleClose(tag: any) {
    this.edit.expertise.splice(this.edit.expertise.indexOf(tag), 1)
  }

  showInput() {
    let self = this
    self.inputVisible = true
    // self.$nextTick(() => {
    //   self.$refs.saveTagInput.$refs.input.focus();
    // });
  }

  handleInputConfirm() {
    let inputValue = this.inputValue
    if (inputValue) {
      this.edit.expertise.push(inputValue)
    }
    this.inputVisible = false
    this.inputValue = ''
  }
  //字典编码转化
  getType(code: string) {
    let self: any = this
    Api.GetType('Audit_states').then((res: any) => {
      let data: any = res.data.filter((item: any) => {
        return item.dic_code == code
      })
      if (data.length != 0) {
        self.edit.audit_status = data[0].dic_content
      }
    })
  }
  //取消
  quxiao() {
    let self: any = this
    self.resetForm('form')
    self.$router.push({ path: '/lawyer/authentication' })
  }
  //字符串截取
  strIntercept(str: string) {
    let arr: string[] = str.split('/')
    let val: string = arr[0]
    return val
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.authenticationAdmin-box {
  & .title {
    font-size: $Text-font;
    color: $Secondary-text;
    height: 32px;
    line-height: 32px;
  }
  & .el-divider--horizontal {
    margin: 5px 0 20px 0;
  }
  .newEdit-wrap {
    width: 100%;
    min-height: 100%;
    background-color: $main-body-bgColor;
    .newEdit-box {
      overflow-y: auto;
      .el-form {
        width: 1000px;
        .el-form-item__content {
          line-height: normal;
        }
        .ql-container {
          height: 300px;
        }
        .text-title {
          height: 40px;
          line-height: 40px;
          display: inline-block;
        }
        .el-radio-group {
          position: relative;
          top: 12px;
        }
      }
    }
  }
  .el-upload-dragger {
    width: auto;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-textarea__inner {
    width: 600px;
    height: 150px;
  }
}
</style>
