<template>
  <div class="addObligor-wrap">
    <div class="search">
      <div style="display:flex;width:50%;">
        <span>委托编号</span>
        <el-input
          style="display:inline-block;width:150px;"
          size="small"
          placeholder="请输入委托编号"
          v-model="data.input"
        >
        </el-input>
      </div>
      <el-button
        type="primary"
        @click="retrieval"
        size="small"
        icon="el-icon-search"
        plain
        >检索</el-button
      >
    </div>
    <el-divider></el-divider>
    <div class="info">
      <div class="box">
        <p>
          <span>会员ID</span><span>{{ data.info.member_id }}</span>
        </p>
        <p>
          <span>债务人ID</span><span>{{ data.info.debtor_no }}</span>
        </p>
      </div>
      <div class="box">
        <p>
          <span>会员名称</span><span>{{ data.info.name }}</span>
        </p>
      </div>
      <div class="box">
        <p>
          <span>债权人名称</span><span>{{ data.info.debtor_name }}</span>
        </p>
      </div>
    </div>
    <div class="from">
      <el-form
        :model="addData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="反馈来源" prop="feedback_source">
          <el-select
            size="small"
            v-model="addData.feedback_source"
            placeholder="请选择来源"
          >
            <el-option
              v-for="(item, index) in data.feedbackoption"
              :key="index"
              :label="item.dic_content"
              :value="item.dic_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            drag
            :action="baseURL + '/Upload/UploadImage?type=3'"
            :on-success="handleAvatarSuccess"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户备注" prop="member_remarks">
          <el-input type="textarea" v-model="addData.member_remarks"></el-input>
        </el-form-item>
        <el-form-item label="对接客服" prop="customer_service_admin_id">
          <el-select
            size="small"
            v-model="addData.customer_service_admin_id"
            placeholder="请选择客服"
          >
            <el-option
              v-for="(item, index) in data.kefuoption"
              :key="index"
              :label="item.real_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后台备注" prop="back_remarks">
          <el-input type="textarea" v-model="addData.back_remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="determine">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { businessOptions } from '../../../../types/views/business.interface'
import * as Api from '../../../../api/business'
import { baseURL } from '../../../../utils/request'
@Component({})
export default class About extends Vue {
  // prop
  // Watch
  // data
  data: any = {
    input: '',
    info: {
      member_id: '', //会员ID
      name: '', //会员名称
      debtor_name: '', //债务人名称
      debtor_no: '' //债权人ID
    },
    feedbackoption: [],
    kefuoption: []
  }
  addData: businessOptions['addFeedback'] = {
    id: 0,
    debtor_id: 0,
    feedback_source: '',
    customer_service_admin_id: 0,
    member_remarks: '',
    member_ip: '',
    member_phone: '',
    back_remarks: '',
    data: []
  }
  rules: any = {
    feedback_source: [
      { required: true, message: '请选择反馈来源', trigger: 'change' }
    ],
    member_remarks: [
      { required: true, message: '请输入用户备注', trigger: 'blur' }
    ],
    customer_service_admin_id: [
      { required: true, message: '请选择对接客服', trigger: 'change' }
    ],
    back_remarks: [
      { required: true, message: '请输入后台备注', trigger: 'blur' }
    ]
  }
  baseURL: string = ''
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    self.baseURL = baseURL
    self.getFeedback()
    self.getKefuList()
  }
  //债务人检索
  retrieval() {
    Api.obligorRetrieval(this.data.input).then((res: any) => {
      Object.keys(this.data.info).forEach((key: string) => [
        (this.data.info[key] = res.data[key])
      ])
    })
  }
  //确定
  determine() {
    this.$emit('add', this.addData)
  }
  //文件上传成功回调
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      self.$message.success(res.data.Msg)
      let files: any = {
        file_name: res.data.FileName + res.data.FileExtension,
        file_path:
          'http://file.zhaizhubang.net' +
          res.data.FileUrl +
          res.data.FileExtension,
        file_size: ''
      }
      self.addData.data.push(files)
    } else {
      self.$message.warning(res.data.Msg)
    }
  }
  //获取反馈来源
  getFeedback() {
    Api.GetType('Source_of_feedback').then((res: any) => {
      this.data.feedbackoption = res.data
    })
  }
  //获取客服列表
  getKefuList() {
    Api.getKefu().then((res: any) => {
      this.data.kefuoption = res.data
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.addObligor-wrap {
  width: 100%;
  height: 600px;
  overflow-y: auto;
  & > .search {
    display: flex;
    span {
      line-height: 32px;
      height: 32px;
      width: 100px;
    }
    button {
      height: 32px;
      i,
      span {
        position: relative;
        top: -9px;
      }
    }
  }
  & .el-divider {
    margin: 10px 0;
  }
  & > .info {
    display: flex;
    .box {
      width: 33%;
      p {
        color: $General-colors;
        font-size: 14px;
        margin: 0;
        margin-bottom: 10px;
        line-height: 32px;
        & > span:first-child {
          margin-right: 20px;
          font-size: 12px;
          color: $Secondary-text;
        }
        & > span:last-child {
          color: $Main-characters;
        }
      }
    }
  }
  & > .from {
    .el-upload {
      width: 200px;
    }
    .el-upload-dragger {
      width: 200px;
      .el-icon-upload {
        margin: 0;
        line-height: inherit;
        position: relative;
        top: 15px;
      }
    }
    .el-textarea {
      width: 400px;
      .el-textarea__inner {
        height: 100px;
      }
    }
  }
}
</style>
