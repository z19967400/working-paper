<template>
  <div class="newEdit-box">
    <span class="title">新闻中心新增/编辑 </span>
    <el-divider></el-divider>
    <div class="newEdit-wrap">
      <div :style="{ height: height + 'px' }" class="newEdit-box">
        <el-form
          ref="form"
          :rules="data.rules"
          :model="edit"
          label-width="80px"
        >
          <el-form-item label="标题" prop="title">
            <el-col :span="12">
              <el-input v-model="edit.title"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="图片地址" prop="img_url">
            <el-col :span="12">
              <el-input v-model="edit.img_url"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新闻地址" prop="news_url">
            <el-col :span="18">
              <el-input v-model="edit.news_url"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="内容" prop="introduction">
            <el-col :span="24">
              <ueditor
                @getVal="ueditorVal"
                :value="edit.introduction"
              ></ueditor>
            </el-col>
          </el-form-item>
          <el-form-item style="bottom:0;" class="edit-bottom-bin">
            <el-button
              type="primary"
              :loading="data.submitType"
              @click="submitForm('form')"
              >确定</el-button
            >
            <el-button
              @click="
                resetForm('form')
                $router.push({ path: '/settings/news' })
              "
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/settings'
import { ueditor } from '../../../components/index'
import { SettingsOptions } from '../../../types/index'
@Component({
  components: {
    ueditor
  }
})
export default class About extends Vue {
  // data
  data: any = {
    submitType: false,
    rules: {
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
      ],
      img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
      introduction: [
        { required: true, message: '请输入内容', trigger: 'blur' }
      ],
      news_url: [{ required: true, message: '请输入新闻地址', trigger: 'blur' }]
    }
  }
  height: number = 0
  edit: SettingsOptions['newEdit'] = {
    id: 0,
    title: '',
    img_url: '',
    introduction: '',
    news_url: ''
  }
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    let self: any = this
    if (self.$route.query.data == null) {
      self.edit.id = 0
      self.resetForm('form')
    } else {
      let data: any = JSON.parse(self.$route.query.data)
      let editData: any = self.edit
      editData.id = data.id
      editData.title = data.title
      editData.img_url = data.img_url
      editData.introduction = data.introduction
      editData.news_url = data.news_url
    }
  }

  mounted() {
    //
  }

  beforeDestroy() {
    //
  }

  //编辑器内容
  ueditorVal(val: any) {
    let self: any = this
    self.edit.introduction = val
  }

  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: Boolean) => {
      if (valid) {
        this.data.submitType = true
        Api.newEdit(self.edit)
          .then((res: any) => {
            if (res.data == 1) {
              self.resetForm('form')
              self.$message.success(res.msg)
              setTimeout(() => {
                this.data.submitType = false
                self.$router.push({
                  path: '/settings/news'
                })
              }, 1000)
            } else {
              self.$message.warning(res.msg)
              this.data.submitType = false
            }
          })
          .catch(() => {
            self.$message.error('网络错误')
            this.data.submitType = false
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
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.newEdit-box {
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
        width: 800px;
        .el-form-item__content {
          line-height: normal;
        }
        .ql-container {
          height: 300px;
        }
      }
    }
  }
}
</style>
