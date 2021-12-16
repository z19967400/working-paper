<template>
  <div class="pdfLogEdit-wrap">
    <span class="title">PDF模板新增/编辑 </span>
    <el-divider></el-divider>
    <div :style="{ height: height + 'px' }" class="pdfLogEdit-box">
      <el-form
        ref="form"
        :rules="data.rules"
        :model="data.edit"
        label-width="80px"
      >
        <el-form-item label="邮件标题" prop="email_title">
          <el-col :span="6">
            <el-input v-model="data.edit.email_title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-col :span="6">
            <el-input v-model="data.edit.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="调用码" prop="use_code">
          <el-col :span="6">
            <el-input v-model="data.edit.use_code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数" prop="parameter">
          <el-col :span="9">
            <el-input type="textarea" v-model="data.edit.parameter"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="pdf类别" prop="pdf_type">
          <el-col :span="6">
            <el-select v-model="data.edit.pdf_type" placeholder="请选择pdf类别">
              <el-option v-for="item in types" :key="item.id" :label="item.dic_content" :value="item.dic_code">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item> -->

        <el-form-item label="内容" prop="template_content">
          <el-col :span="12">
            <ueditor
              @getVal="ueditorVal"
              :value="data.edit.template_content"
            ></ueditor>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="margin-left:80px;" class="edit-bottom-bin">
        <el-button
          type="primary"
          :loading="data.submitType"
          @click="submitForm('form')"
          >确定</el-button
        >
        <el-button @click="resetForm('form')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/template'
import { ueditor } from '../../../components/index'
@Component({
  components: {
    ueditor
  }
})
export default class About extends Vue {
  // data
  data: any = {
    edit: {
      id: 0,
      name: '',
      use_code: '',
      // pdf_type: '',
      parameter: '',
      email_title: '',
      template_content: `<p></p><p><br></p><ol></ol>`
    },
    submitType: false,
    rules: {
      name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
      ],
      use_code: [
        { required: true, message: '请输入使用码', trigger: 'blur' },
        { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
      ],
      // pdf_type: [{ required: true, message: '请选择pdf类别', trigger: 'change' }],
      template_content: [
        { required: true, message: '请编辑内容', trigger: 'blur' }
      ],
      parameter: [{ required: true, message: '请输入参数', trigger: 'blur' }],
      email_title: [
        { required: true, message: '请输入邮件标题', trigger: 'blur' },
        { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
      ]
    }
  }
  types: Array<any> = []
  height: number = 0
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    let self: any = this
    self.getEntrustType('Entrust_type')
    if (self.$route.query.data == null) {
      self.data.edit.id = 0
      self.fileList = []
      self.resetForm('form')
    } else {
      let data: any = JSON.parse(self.$route.query.data)
      let editData: any = this.data.edit
      Object.keys(editData).forEach((key: string) => {
        if (key == 'template_content') {
          editData[key] = data[key] + ''
        } else {
          editData[key] = data[key]
        }
      })
    }
  }

  mounted() {
    //
  }

  beforeDestroy() {
    //
  }
  //查询字典获取委托类别
  getEntrustType(category_code: string) {
    Api.getDicInfoList(category_code).then((res: any) => {
      this.types = res.data
    })
  }
  //编辑器内容
  ueditorVal(val: any) {
    this.data.edit.template_content = val
  }

  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        this.data.submitType = true
        Api.PdfModelEdit(self.data.edit).then((res: any) => {
          if (res.data == 1) {
            self.resetForm('form')
            self.$message.success(res.msg)
            setTimeout(() => {
              this.data.submitType = false
              self.$router.push({
                path: '/Template/pdf'
              })
            }, 1000)
          } else {
            self.$message.warning(res.msg)
            this.data.submitType = false
          }
        })
      } else {
        self.$message.warning('请上传模板')
      }
    })
  }
  //重置表单
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
    let self: any = this
    self.$router.go(-1)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.pdfLogEdit-wrap {
  width: 100%;
  min-height: 100%;
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
  .pdfLogEdit-box {
    overflow-y: auto;
    .el-form {
      .el-form-item__content {
        line-height: normal;
      }
      .ql-container {
        height: 300px;
      }
    }
  }
}
</style>
