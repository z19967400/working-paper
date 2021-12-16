<template>
  <div class="edit-warp">
    <span class="title">开发任务新增/编辑 </span>
    <el-divider></el-divider>
    <div class="edit-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :style="{ height: height + 'px' }"
      >
        <el-form-item label="功能名称" prop="function_name">
          <el-col :span="6">
            <el-input v-model="ruleForm.function_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-col :span="5">
            <el-select v-model="ruleForm.priority" placeholder="请选择优先级">
              <el-option label="低" value="低"></el-option>
              <el-option label="中" value="中"></el-option>
              <el-option label="高" value="高"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <div class="inline">
          <el-form-item label="项目" prop="project_name">
            <el-input v-model="ruleForm.project_name"></el-input>
          </el-form-item>
          <el-form-item label="版本" prop="version_number">
            <el-input v-model="ruleForm.version_number"></el-input>
          </el-form-item>
          <el-form-item label="模块" prop="module_name">
            <el-input v-model="ruleForm.module_name"></el-input>
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="前端负责人" prop="front_end">
            <el-select v-model="ruleForm.front_end" placeholder="请选择员工">
              <el-option label="周润南" value="周润南"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="后端负责人" prop="back_end">
            <el-select v-model="ruleForm.back_end" placeholder="请选择员工">
              <el-option label="赵晨晨" value="赵晨晨"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="计划发布时间" required>
          <el-col :span="6">
            <el-form-item prop="release_time">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.release_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="前端开发进度" prop="front_end_progress">
          <el-radio-group v-model="ruleForm.front_end_progress">
            <el-radio label="0">未开始</el-radio>
            <el-radio label="1">开发中</el-radio>
            <el-radio label="2">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="后台开发进度" prop="back_end_progress">
          <el-radio-group v-model="ruleForm.back_end_progress">
            <el-radio label="0">未开始</el-radio>
            <el-radio label="1">开发中</el-radio>
            <el-radio label="2">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目总进度" prop="total_progress">
          <el-radio-group v-model="ruleForm.total_progress">
            <el-radio label="0">未开始</el-radio>
            <el-radio label="1">开发中</el-radio>
            <el-radio label="2">待测试</el-radio>
            <el-radio label="3">测试中</el-radio>
            <el-radio label="4">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能描述" prop="function_description">
          <el-col :span="12">
            <el-input
              type="textarea"
              v-model="ruleForm.function_description"
              rows="10"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="edit-bottom-bin">
          <el-button
            type="primary"
            :loading="data.loading"
            @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiOptions, ApiData } from '../../types/index'
import * as Api from '../../api/api'
@Component({})
export default class About extends Vue {
  //提交的表格数据
  ruleForm: ApiOptions['develEdit'] = {
    id: 0,
    function_name: '', //功能名称
    project_name: '', //项目名称
    version_number: '', //版本号
    module_name: '', //模块名称
    priority: '', //优先级
    front_end: '', //前端负责人
    back_end: '', //后端负责人
    release_time: null, //计划发布时间
    front_end_progress: '0', //前端开发状态
    back_end_progress: '0', //后台开发状态
    total_progress: '0', //项目开发总进度
    function_description: '' //功能描述
  }
  //data
  data: ApiData['develEdit'] = {
    loading: false
  }
  rules: any = {
    function_name: [
      { required: true, message: '请输入功能名称', trigger: 'blur' },
      { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
    ],
    priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
    project_name: [
      { required: true, message: '请输入项目名称', trigger: 'blur' },
      { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
    ],
    version_number: [
      { required: true, message: '请输入版本号', trigger: 'blur' },
      { max: 5, message: '长度不能超过5个字符', trigger: 'blur' }
    ],
    module_name: [
      { required: true, message: '请输入模块名称', trigger: 'blur' },
      { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
    ],
    front_end: [{ required: true, message: '请选择员工', trigger: 'change' }],
    back_end: [{ required: true, message: '请选择员工', trigger: 'change' }],
    release_time: [
      {
        type: 'string',
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }
    ],
    front_end_progress: [
      {
        required: true,
        message: '请选择前端开发状态',
        trigger: 'change'
      }
    ],
    back_end_progress: [
      { required: true, message: '请选择后端开发状态', trigger: 'change' }
    ],
    total_progress: [
      { required: true, message: '请选择开发总进度', trigger: 'change' }
    ],
    function_description: [
      { required: true, message: '请输入文本', trigger: 'blur' },
      { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
    ]
  }
  height: number = 0
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    if (self.$route.query.id != 0) {
      self.getInfo(self.$route.query.id)
    }
  }
  //获取详情
  getInfo(id: number) {
    let self: any = this
    Api.getProgressInfo(id)
      .then((res: any) => {
        res.data.back_end_progress = res.data.back_end_progress.toString()
        res.data.front_end_progress = res.data.front_end_progress.toString()
        res.data.total_progress = res.data.total_progress.toString()
        self.ruleForm = res.data
      })
      .catch(() => {
        self.$message({
          message: '网络错误',
          type: 'warning'
        })
      })
  }
  //提交
  submitForm(formName: string) {
    let form: any = this.$refs[formName]
    let self: any = this
    form.validate((valid: Boolean) => {
      if (valid) {
        self.data.loading = true
        Api.addProgress(this.ruleForm)
          .then((res: any) => {
            if (res.data == 0) {
              self.$message({
                message: '操作失败',
                type: 'warning'
              })
            } else {
              self.$message.success('操作成功')
              self.data.loading = false
              self.$router.push({
                path: '/develManage/develList'
              })
            }
          })
          .catch(() => {
            self.$message.error('网络错误')
            self.data.loading = false
          })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //取消
  resetForm(formName: string) {
    let form: any = this.$refs[formName]
    let self: any = this
    form.resetFields()
    self.$router.push({
      path: '/develManage/develList'
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';
.edit-warp {
  min-height: 100%;
  width: 100%;
  background-color: $main-body-bgColor;
  & .title {
    font-size: $Text-font;
    color: $Secondary-text;
    height: 32px;
    line-height: 32px;
  }
  & .el-divider--horizontal {
    margin: 5px 0 20px 0;
  }
  .edit-box {
    .el-form {
      width: 100%;
      overflow-y: auto;
      .inline {
        display: flex;
      }
    }
  }
}
.el-textarea__inner {
  height: 300px;
}
</style>
