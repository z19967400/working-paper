<template>
  <div class="obligorInfo-wrap">
    <div class="info">
      <div class="box">
        <p>
          <span>委托批次号</span><span>{{ data.debtor.batch_no }}</span>
        </p>
        <p>
          <span>会员ID</span><span>{{ data.debtor.member_id }}</span>
        </p>
        <p>
          <span>债权人名称</span><span>{{ data.debtor.creditor_name }}</span>
        </p>
      </div>
      <div class="box">
        <p>
          <span>委托编号</span><span>{{ data.debtor.debtor_number }}</span>
        </p>
        <p>
          <span>会员名称</span><span>{{ data.debtor.name }}</span>
        </p>
        <p>
          <span>债务人名称</span><span>{{ data.debtor.debtor_name }}</span>
        </p>
      </div>
      <div class="box">
        <p>
          <span>创建时间</span><span>{{ data.debtor.time }}</span>
        </p>
        <p>
          <span>债权人ID</span><span>{{ data.debtor.id }}</span>
        </p>
        <p>
          <span>用户手机号码</span><span>{{ data.debtor.phone_number }}</span>
        </p>
      </div>
    </div>
    <div class="from">
      <el-form
        :model="data.info"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="反馈来源" prop="feedback_source">
          <el-select
            size="small"
            v-model="data.info.feedback_source"
            placeholder="请选择反馈来源"
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
            :file-list="filelist"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户备注" prop="member_remarks">
          <el-input
            type="textarea"
            v-model="data.info.member_remarks"
          ></el-input>
        </el-form-item>
        <el-form-item label="对接客服" prop="customer_service_admin_id">
          <el-select
            size="small"
            v-model="data.info.customer_service_admin_id"
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
          <el-input type="textarea" v-model="data.info.back_remarks"></el-input>
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
import * as Api from '../../../../api/business'
import { baseURL } from '../../../../utils/request'
@Component({})
export default class About extends Vue {
  // prop
  @Prop() info!: any
  // Watch
  @Watch('info', { deep: true })
  infoChangeVal(newVal: any, oldVal: any) {
    Object.keys(this.data.info).forEach((key: string) => {
      this.data.info[key] = newVal.dto[key]
    })
    this.filelist = Object.assign(this.data.info.data)
    if (this.filelist.length > 0) {
      this.filelist.forEach((item: any) => {
        item['name'] = item.file_name
        item['url'] = item.file_path
      })
    }
    if (newVal.debtor == null) {
      this.data.debtor = {}
    } else {
      this.data.debtor = newVal.debtor
    }
  }
  // data
  data: any = {
    info: {
      id: 0,
      debtor_id: 0,
      feedback_source: '',
      customer_service_admin_id: 0,
      member_remarks: '',
      member_ip: '',
      member_phone: '',
      back_remarks: '',
      data: []
    },
    debtor: {},
    feedbackoption: [],
    kefuoption: []
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
  filelist: any = []
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
  //文件上传
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      let files: any = {
        file_name: res.data.FileName + res.data.FileExtension,
        file_path:
          'http://file.zhaizhubang.net' +
          res.data.FileUrl +
          res.data.FileExtension,
        file_size: ''
      }
      this.data.info.data.push(files)
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  //确定
  determine() {
    this.$emit('add', this.data.info)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.obligorInfo-wrap {
  width: 100%;
  height: 600px;
  overflow-y: auto;
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
          margin-right: 10px;
          font-size: 12px;
          color: $Secondary-text;
        }
        & > span:last-child {
          font-size: 12px;
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
