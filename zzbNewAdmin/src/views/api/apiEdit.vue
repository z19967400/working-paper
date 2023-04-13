<template>
  <div class="apiEdit-wrap">
    <span class="title"
      >{{ $route.query.type == 0 ? '接口' : '页面' }}新增/编辑
    </span>
    <el-divider></el-divider>
    <div class="apiEdit-box">
      <el-form
        :model="data.edit"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{ height: height + 'px' }"
      >
        <el-form-item label="名称" prop="api_name">
          <el-col :span="6">
            <el-input v-model="data.edit.api_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="域名" prop="api_domain">
          <el-col :span="6">
            <el-input v-model="data.edit.api_domain"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="路径" prop="api_path">
          <el-col :span="6">
            <el-input v-model="data.edit.api_path"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="$route.query.type != 1"
          label="类别"
          prop="api_type"
        >
          <el-col :span="6">
            <el-select
              v-model="data.edit.api_type"
              placeholder="请选择接口类别"
            >
              <el-option label="用户端" value="2"></el-option>
              <el-option label="平台管理" value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item v-if="$route.query.type == 1" label="菜单">
          <el-col :span="6">
            <el-select v-model="data.class_three_id" placeholder="请选择菜单">
              <el-option
                v-for="(item, index) in data.menu"
                :key="index"
                :label="item.menu_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="$route.query.type == 0 && $route.query.type != 1"
          label="请求方式"
          prop="request_way"
        >
          <el-col :span="6">
            <el-select
              v-model="data.edit.request_way"
              placeholder="请选择请求方式"
            >
              <el-option label="GET" value="0"></el-option>
              <el-option label="POST" value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="$route.query.type != 1"
          label="当前版本"
          prop="version_number"
        >
          <el-col :span="2">
            <el-input v-model="data.edit.version_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="$route.query.type != 1"
          label="详情"
          prop="api_info"
        >
          <el-col :span="12">
            <ueditor @getVal="ueditorVal" :value="data.edit.api_info"></ueditor>
          </el-col>
        </el-form-item>
      </el-form>

      <el-col class="edit-bottom-bin" :span="12">
        <el-button
          style="margin-left: 100px;"
          type="primary"
          :loading="data.submitType"
          @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../api/api'
import { ApiOptions } from '../../types/views/api.interface'
import { ueditor } from '../../components/index'
import { api } from '../../../../zzbPc/src/assets/js/api'
@Component({
  components: {
    ueditor
  }
})
export default class About extends Vue {
  // data
  data: ApiOptions = {
    edit: {
      id: 0,
      api_type: '',
      api_name: '',
      api_domain: '',
      api_path: '',
      request_way: '',
      version_number: '',
      api_info: `<p></p><p><br></p><ol></ol>` // 富文本编辑器默认内容
    },
    submitType: false,
    class_three_id: '',
    menu: [],
    rules: {
      api_name: [
        { required: true, message: '请输入接口名称', trigger: 'blur' },
        { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
      ],
      api_domain: [
        { required: true, message: '请输入访问域名', trigger: 'blur' }
      ],
      api_path: [
        { required: true, message: '请输入访问路径', trigger: 'blur' }
      ],
      api_type: [
        {
          required: true,
          message: '请选择接口类别',
          trigger: 'change'
        }
      ],
      request_way: [
        {
          required: true,
          message: '请选择请求方式',
          trigger: 'change'
        }
      ],
      version_number: [
        { required: true, message: '请输入版本号', trigger: 'blur' },
        { max: 5, message: '长度不能超过5个字符', trigger: 'blur' }
      ],
      api_info: [{ required: true, message: '请填写接口详情', trigger: 'blur' }]
    }
  }
  height: number = 0
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    let self: any = this
    if (self.$route.query.type == 1) {
      this.GetTwoandThree()
    }
    if (self.$route.query.id != undefined && self.$route.query.id != 0) {
      self.getApiInfo(self.$route.query.id)
      self.$refs['ruleForm'].clearValidate()
    } else {
      self.resetForm('ruleForm')
      self.data.edit.id = 0
      self.data.edit.request_way = ''
      self.data.class_three_id = ''
    }
  }

  mounted() {
    //
  }

  //获取接口编辑内容
  getApiInfo(id: number) {
    let self: any = this
    let fn: any =
      self.$route.query.type == 0 ? Api.apiGetByid(id) : Api.GetMenuInfoByid(id)
    fn.then((res: any) => {
      if (self.$route.query.type == 0) {
        res.data.request_way = res.data.request_way == 0 ? 'GET' : 'POST'
        res.data.api_type = res.data.api_type == 1 ? '平台管理' : '用户端'
        self.data.edit.api_type = res.data.api_type
        self.data.edit.api_domain = res.data.api_domain
        self.data.edit.api_info = res.data.api_info
        self.data.edit.api_name = res.data.api_name
        self.data.edit.api_path = res.data.api_path
        self.data.edit.id = res.data.id
        self.data.edit.request_way = res.data.request_way
        self.data.edit.version_number = res.data.version_number
      } else {
        // res.data.view_type = res.data.view_type == 1 ? '平台管理' : '用户端'
        self.data.class_three_id = res.data.parent_id
        self.data.edit.api_name = res.data.menu_name
        self.data.edit.api_domain = res.data.menu_domain
        self.data.edit.api_path = res.data.menu_path
        self.data.edit.id = res.data.id
      }
    })
  }
  //获取页面内选择菜单
  GetTwoandThree() {
    Api.GetAllMenuList().then((res: any) => {
      this.data.menu = res.data
    })
  }
  //编辑器内容
  ueditorVal(val: any) {
    let self: any = this
    self.data.edit.api_info = val
  }
  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    let params: any = {}
    if (self.$route.query.type == 0) {
      params = Object.assign({}, self.data.edit)
      params.request_way = Number(params.request_way)
      if (params.request_way == 'GET') {
        params.request_way = 0
      }
      if (params.request_way == 'POST') {
        params.request_way = 1
      }
      if (params.api_type == '平台管理') {
        params.api_type = '1'
      }
      if (params.api_type == '用户端') {
        params.api_type = '2'
      }
    } else {
      let self: any = this
      params = {
        id: self.data.edit.id,
        parent_id: self.data.class_three_id,
        menu_name: self.data.edit.api_name,
        menu_domain: self.data.edit.api_domain,
        menu_path: self.data.edit.api_path
      }
    }
    // } else {
    //   params = {
    //     id: self.data.edit.id,
    //     view_type: self.data.edit.api_type,
    //     view_name: self.data.edit.api_name,
    //     view_domain: self.data.edit.api_domain,
    //     view_path: self.data.edit.api_path,
    //     request_way: Number(self.data.edit.request_way),
    //     version_number: self.data.edit.version_number,
    //     view_info: self.data.edit.api_info,
    //     class_three_id: this.data.class_three_id
    //   }
    //   if (params.view_type == '平台管理') {
    //     params.view_type = '1'
    //   }
    //   if (params.view_type == '用户端') {
    //     params.view_type = '2'
    //   }
    // }
    from.validate((valid: Boolean) => {
      if (valid) {
        this.data.submitType = true
        let fn: any =
          self.$route.query.type == 0 ? Api.addApi(params) : Api.insert(params)
        fn.then((res: any) => {
          if (res.data == 1) {
            self.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            setTimeout(() => {
              this.data.submitType = false
              self.$router.push({
                path:
                  self.$route.query.type == 0 ? '/api/index' : '/web/webList'
              })
            }, 1000)
          } else {
            self.$message({
              showClose: true,
              message: '操作失败',
              type: 'warning'
            })
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

.apiEdit-wrap {
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
  .apiEdit-box {
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
