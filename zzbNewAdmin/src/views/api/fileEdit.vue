<template>
  <div class="fileEdit-wrap">
    <span class="title">文档新增/编辑 </span>
    <el-divider></el-divider>
    <div class="fileEdit-box">
      <el-form
        ref="form"
        :rules="data.rules"
        :model="data.edit"
        label-width="80px"
        :style="{ height: height + 'px' }"
      >
        <el-form-item label="文档名称" prop="record_name">
          <el-col :span="12">
            <el-input v-model="data.edit.record_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="文档版本" prop="version_number">
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="6"
              v-model="data.edit.version_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="record_info">
          <el-col :span="20">
            <ueditor
              @getVal="ueditorVal"
              :value="data.edit.record_info"
            ></ueditor>
          </el-col>
        </el-form-item>
        <el-form-item style="margin-bottom:0;" class="edit-bottom-bin">
          <el-button
            :loading="data.submitType"
            type="primary"
            @click="submitForm('form')"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../api/api'
import { ueditor } from '../../components/index'
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
      record_name: '',
      version_number: '',
      record_info: `<p></p><p><br></p><ol></ol>` // 富文本编辑器默认内容
    },
    submitType: false,
    editor: null, // 富文本编辑器对象
    editorOption: {
      //  富文本编辑器配置
      theme: 'snow',
      placeholder: '请输入详情'
    },
    rules: {
      record_name: [
        { required: true, message: '请输入文档名称', trigger: 'blur' },
        { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
      ],
      // version_number: [
      //   {
      //     required: true,
      //     message: '请输入文档版本号',
      //     trigger: 'blur'
      //   },
      //   { max: 5, message: '长度不能超过5个字符', trigger: 'blur' }
      // ],
      record_info: [{ required: true, message: '请输入内容', trigger: 'blur' }]
    }
  }
  height: number = 0
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    let self: any = this
    if (self.$route.query.id == null) {
      self.data.edit.id = 0
      self.resetForm('form')
    } else {
      const ID: number = self.$route.query.id
      this.getFillInfo(ID)
    }
  }

  mounted() {
    //
  }

  beforeDestroy() {
    //
  }
  //获取文档详情
  getFillInfo(id: number) {
    Api.GetByid(id).then((res: any) => {
      let data: any = res.data
      let editData: any = this.data.edit
      editData.id = data.id
      editData.record_name = data.record_name
      editData.version_number = data.version_number
      editData.record_info = data.record_info
    })
  }
  //编辑器内容
  ueditorVal(val: any) {
    this.data.edit.record_info = val
  }

  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        this.data.submitType = true
        Api.fileEdit(self.data.edit).then((res: any) => {
          if (res.data == 1) {
            self.resetForm('form')
            self.$message.success(res.msg)
            setTimeout(() => {
              this.data.submitType = false
              self.$router.push({
                path: '/file/file'
              })
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
    from.resetFields()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.fileEdit-wrap {
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
  .fileEdit-box {
    .el-form {
      overflow-y: auto;
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
