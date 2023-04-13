<template>
  <div class="addCreditor">
    <el-form
      v-if="creditor_type == 'Creditor_states_0'"
      v-loading="loading"
      :model="data"
      label-width="140px"
    >
      <el-form-item label="营业执照">
        <el-col class="upBox" :span="20">
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
              v-if="data.license_img_url"
              :src="data.license_img_url"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              营业执照为最新版原文件拍照照片，要求文件四角都在图片内，清晰无遮挡，图片水印不可与办理业务无关。支持jpg、jpeg、png格式文件，文件须小于10M
            </div>
          </el-upload>
        </el-col>
        <!-- <i v-show="data.license_img_url" @click="preview(data.license_img_url)" class="el-icon-zoom-in preview"></i> -->
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <el-input
          style="width:330px;"
          placeholder="上传证照自动填充"
          v-model="data.license_no"
        ></el-input>
      </el-form-item>
      <el-form-item label="债权人名称">
        <el-input
          style="width:330px;"
          placeholder="上传证照自动填充"
          v-model="data.creditor_name"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="办公地址">
        <el-input
          style="width:330px;"
          placeholder="请填写办公地址"
          v-model="data.detailed_address"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <el-form v-else v-loading="loading" :model="data" label-width="140px">
      <el-form-item label="身份证人像面" class="zhengzhao">
        <el-col class="upBox" :span="20">
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=7'"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('id_card_img_01', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="data.id_card_img_01"
              :src="data.id_card_img_01"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i
            v-show="data.id_card_img_01"
            @click="preview(data.id_card_img_01)"
            class="el-icon-search preview"
            ><span class="preview-text">+</span></i
          >
          <span class="upBox-tip">可将文件拖曳至框内上传</span>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证国徽面" class="zhengzhao">
        <el-col class="upBox" :span="20">
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=7'"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('id_card_img_02', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="data.id_card_img_02"
              :src="data.id_card_img_02"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i
            v-show="data.id_card_img_02"
            @click="preview(data.id_card_img_02)"
            class="el-icon-search preview"
            ><span class="preview-text">+</span></i
          >
          <span class="upBox-tip">可将文件拖曳至框内上传</span>
        </el-col>
      </el-form-item>
      <el-form-item label="债权人名称">
        <el-col :span="18">
          <el-input
            placeholder="可自动填充或手动修改"
            v-model="data.creditor_name"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-col :span="18">
          <el-input
            placeholder="可自动填充或手动修改"
            v-model="data.agent_id_number"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-col :span="18">
          <el-input
            placeholder="请填写手机号码"
            v-model="data.phone_number"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-col :span="18">
          <el-input
            placeholder="请填写电子邮箱"
            v-model="data.email"
          ></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '../../../api/user'
import { baseURL } from '../../../utils/request'
interface addDataType {
  id: number //id
  creditor_name: string //债权人名称
  agent_name: string //代理人姓名
  agent_id_number: string //代理人身份证号
  agent_authorization: string //代理人授权书
  phone_number: string //代理人手机号码
  email: string //代理人邮箱
  id_card_img_01: string //身份证正面
  id_card_img_02: string //身份证反面
  license_no: string //证照编号
  license_img_url: string //证照图片正面
}
@Component({})
export default class addCreditor extends Vue {
  @Prop({}) row!: addDataType
  data: addDataType = {
    id: 0,
    creditor_name: '',
    agent_name: '',
    agent_id_number: '',
    agent_authorization: '',
    phone_number: '',
    email: '',
    id_card_img_01: '',
    id_card_img_02: '',
    license_no: '',
    license_img_url: ''
  }
  burl: string = baseURL
  loading: boolean = false
  creditor_type: string = ''
  @Watch('row', { immediate: true, deep: true })
  rowChangeVal(newVal: any, oldVal: any) {
    this.creditor_type = newVal.creditor_type
    Object.keys(this.data).forEach((key: string) => {
      this.data[key] = newVal[key]
    })
  }

  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.state) {
      self.data[prop] =
        'http://file.debteehelper.com' +
        res.data.FileUrl +
        res.data.FileExtension
      if (prop === 'license_img_url' || prop === 'id_card_img_01') {
        self.myRecognition(self.data[prop], prop)
      }
    } else {
      this.$message.warning(res.msg)
    }
  }
  //证照识别
  myRecognition(img_path: string, prop: string) {
    let self: any = this
    self.loading = true
    if (prop === 'license_img_url' || prop === 'id_card_img_01') {
      Api.Recognition(2, img_path).then((res2: any) => {
        if (res2.state) {
          self.data['creditor_name'] = res2.data.name
          self.data['license_no'] = res2.data.reg_num
          self.$message.success(
            '上传成功，请确认债权人名称和统一社会信用代码识别正确。'
          )
        } else {
          self.$message.warning('图片识别失败')
        }
        self.loading = false
      })
    } else {
      Api.Recognition(0, img_path).then((res2: any) => {
        if (res2.state) {
          self.data.creditor_name = res2.data.name
          self.data.agent_id_number = res2.data.num
          self.$message.success(
            '上传成功，请确认债权人名称和身份证号码识别正确。'
          )
        } else {
          self.$message.warning('图片识别失败')
        }
        self.loading = false
      })
    }
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.$message.error('上传大小不能超过 50MB!')
    }
    return isLt2M
  }
  //打开图片
  preview(file: string) {
    window.open(file)
  }
  //关闭弹窗
  close() {
    this.data = {
      id: 0,
      creditor_name: '',
      agent_name: '',
      agent_id_number: '',
      agent_authorization: '',
      phone_number: '',
      email: '',
      id_card_img_01: '',
      id_card_img_02: '',
      license_no: '',
      license_img_url: ''
    }
    this.$emit('close')
  }
  //提交
  onSubmit() {
    this.$emit('onSubmit', this.data)
  }
}
</script>
<style lang="scss">
.addCreditor {
  & .upBox {
    position: relative;
    .el-upload__tip {
      width: 50%;
      display: inline-block;
      line-height: 1.5;
      float: right;
    }
    .avatar {
      max-width: 100%;
      max-height: 100%;
      // max-height: 100%;
      margin: auto;
      object-fit: contain;
    }
    .preview {
      position: absolute;
      // right: 20px;
      left: 83px;
      top: 0;
      cursor: pointer;
      font-size: 18px;
      .preview-text {
        position: absolute;
        top: 2px;
        right: 5px;
        font-size: 12px;
      }
    }
    .upBox-tip {
      position: absolute;
      bottom: -20px;
      font-size: 12px;
      color: #409eff;
    }
  }
  & .el-upload-dragger {
    width: 100px !important;
  }
}
</style>
