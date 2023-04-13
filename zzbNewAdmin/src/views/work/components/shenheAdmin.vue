<template>
  <div class="shenheAdmin-wrap">
    <div class="shenhe-box">
      <el-row>
        <el-col :span="5" class="lable">债权人名称</el-col>
        <el-col class="value" :span="8">{{ shenhe.creditor_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="lable">管理员姓名</el-col>
        <el-col class="value" :span="8">{{ shenhe.admin_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="lable">营业执照</el-col>
        <el-col style="position: relative;top:4px;" :span="12">
          <img
            class="img"
            @click="preview(shenhe.license_img_url)"
            :src="shenhe.license_img_url"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="lable">代理人授权书</el-col>
        <el-col style="position: relative;top:5px;" :span="8">
          <div
            v-if="
              shenhe.authorization_file != null &&
                shenhe.authorization_file != ''
            "
          >
            <img
              class="img"
              v-if="substr(shenhe.authorization_file) !== '.pdf'"
              @click="preview(shenhe.authorization_file)"
              :src="shenhe.authorization_file"
            />
            <el-link
              v-else
              type="success"
              @click="preview(shenhe.authorization_file)"
              >{{ sblicet(shenhe.authorization_file) }}</el-link
            >
          </div>
          <el-upload
            :on-preview="preview"
            :on-exceed="exceed"
            :limit="1"
            :action="burl + '/Upload/UploadImage?type=7&original_name=true'"
            :on-change="handleChange"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('authorization_file', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">更换授权书</el-button>
          </el-upload>
        </el-col>
        <el-col style="position: relative;top:5px;" :span="8">
          <div style="line-height: 1.5;">
            <span style="font-size:12px;color:#606366;display:block;"
              >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span
            >
            <el-link style="font-size:12px;" @click="upSq" type="success"
              >下载授权委托书模板</el-link
            >
          </div>
        </el-col>
      </el-row>
      <el-form :model="shenhe" label-width="120px">
        <el-form-item label="审核状态">
          <el-radio-group v-model="shenhe.audit_status">
            <el-radio label="Audit_states_0">待审核</el-radio>
            <el-radio label="Audit_states_1">未通过</el-radio>
            <el-radio label="Audit_states_2">已通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span style="position: relative;top:-10px;">
              审核反馈
              <span style="font-size:12px;color:#909399;display:block;"
                >(此处反馈将直接反馈给用户)</span
              >
            </span>
          </template>
          <el-col :span="20">
            <span></span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="审核反馈将呈现给用户"
              v-model="shenhe.audit_feedback"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span style="position: relative;top:-10px;">后台备注</span>
          </template>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="后台备注仅后台查看"
              v-model="shenhe.back_remarks"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-divider v-if="shenhe.history.length > 0" content-position="left"
        >授权委托书更换记录</el-divider
      >
      <div style="padding-bottom:20px;">
        <el-table
          v-show="shenhe.history.length > 0"
          :data="shenhe.history"
          border
          max-height="300"
          style="width: 80%;margin:auto;"
        >
          <el-table-column prop="authorization_file" label="授权委托书文件">
            <template slot-scope="scope">
              <div
                style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;"
              >
                <span
                  @click="preview(scope.row.authorization_file)"
                  style="color:rgb(103, 194, 58);cursor: pointer;"
                  >{{ sblicet(scope.row.authorization_file) }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="更换时间" width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div style="text-align: center;">
      <el-button type="primary" @click="shenheSubmit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { baseURL } from '../../../utils/request'
@Component({})
export default class shenheAdmin extends Vue {
  @Prop({}) data!: any
  @Watch('data', { immediate: true, deep: true })
  dataChange(newVal: any, oldVal: any) {
    this.shenhe = newVal
  }
  shenhe: any = {
    history: []
  }
  fileList: any = []
  burl: string = ''
  loading: boolean = false
  created() {
    this.burl = baseURL
  }
  //图片预览
  preview(url: any) {
    if (url.name != undefined) {
      let path: string =
        'https://file.debteehelper.com' +
        url.response.data.FileUrl +
        url.response.data.FileExtension
      window.open(path)
    } else {
      window.open(url)
    }
  }
  //字符截取
  sblicet(val: string) {
    let var1: string = val.substring(val.lastIndexOf('/') + 1)
    let var2: any = var1.substring(0, var1.indexOf('_'))
    return var2
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.state) {
      let item: any = [
        {
          name: file.name,
          url:
            'https://file.debteehelper.com' +
            file.response.data.FileUrl +
            file.response.data.FileExtension
        }
      ]
      self.fileList = item
      self.shenhe[prop] = item[0].url
    } else {
      this.$message.warning(res.msg)
    }
  }
  //截取小数点后字符
  substr(val: string) {
    if (val == null || val == '') {
      return null
    }
    let result: string = val.substring(val.lastIndexOf('.'))
    return result
  }
  exceed(files: any, fileList: any) {
    this.$message.warning('请先删除已上传文件')
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    this.loading = true
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.loading = false
      this.$message.error('上传大小不能超过 50MB!')
    }
    return isLt2M
  }
  //下载授权书
  upSq() {
    window.open(
      'https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx'
    )
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3)
  }
  shenheSubmit() {
    this.$emit('submit', this.shenhe)
  }
  close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table1-wrap {
  width: 100%;
  & .shenhe-box {
    overflow-y: auto;
    max-height: 500px;
  }
  & .lable {
    text-align: right;
    padding-right: 20px;
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
