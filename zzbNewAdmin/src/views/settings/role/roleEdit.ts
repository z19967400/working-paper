import { Component, Vue } from 'vue-property-decorator'
import { SettingsOptions } from '@/types'
import * as Api from '@/api/settings'
@Component({})
export default class roleEdit extends Vue {
  // data
  data: SettingsOptions['roleEdit'] = {
    role_name: '',
    id: 0,
    menu_ids: []
  }
  halfCheckedKeys: any = []
  rules: any = {
    role_name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ]
  }
  Tree: any = []
  defaultProps: object = {
    children: 'children',
    label: 'label'
  }
  btnLoad: boolean = false
  height: number = 0
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    // this.init()
  }

  mounted() {
    this.init()
  }

  // 初始化函数
  init() {
    let self: any = this
    self.data.id = self.$route.params.id
    self.getMenu()
    if (self.data.id != 0 && self.data.id != null) {
      self.getRoleInfo(self.data.id)
    }
  }
  //提交
  submitForm(formName: string) {
    let form: any = this.$refs[formName]
    form.validate((valid: boolean) => {
      if (valid) {
        this.btnLoad = true
        this.getCheckedKeys()
        this.RoleEdit()
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //重置
  resetForm(formName: string) {
    let data: any = this.data
    let form: any = this.$refs[formName]
    data.menu_ids = []
    form.resetFields()
    this.$router.push({
      path: '/settings/roleList'
    })
  }
  //获取全部菜单
  getMenu() {
    Api.getMenu().then((res: any) => {
      res.data.data.forEach((item: any) => {
        item.label = item.menu_name
        item.children = item.data
        if (item.children.length != 0) {
          item.children.forEach((item2: any) => {
            item2.label = item2.menu_name
            item2.children = item2.data
            if (item.children.length != 0) {
              item2.children.forEach((item3: any) => {
                item3.label = item3.menu_name
                item3.children = item3.data
              })
            }
          })
        }
      })
      this.Tree = res.data.data
    })
  }
  //获取角色详情
  getRoleInfo(id: number) {
    Api.getRoleInfo(id).then((res: any) => {
      let data: any = this.data
      data.menu_ids = res.data.menu
      data.id = res.data.role.id
      data.role_name = res.data.role.role_name
    })
  }
  //权限树点击事件
  check(event: any, data: any) {
    if (data.halfCheckedKeys.length > 0) {
      this.halfCheckedKeys = data.halfCheckedKeys
    }
  }
  // 权限树的选择
  getCheckedKeys() {
    let self: any = this
    let Tree: any = self.$refs.tree
    let data: any = JSON.parse(JSON.stringify(Tree.getCheckedKeys()))
    self.data.menu_ids = data
  }
  //权限修改/新增
  RoleEdit() {
    let self: any = this
    let parmas: any = {
      role_name: self.data.role_name,
      id: self.data.id,
      menu_ids: self.data.menu_ids
    }
    // if (self.halfCheckedKeys.length > 0) {
    //   self.halfCheckedKeys.forEach((id: number) => {
    //     parmas.menu_ids.push(id)
    //   })
    // }
    parmas.menu_ids = parmas.menu_ids.reduce(
      (prev: any, cur: any) => (prev.includes(cur) ? prev : [...prev, cur]),
      []
    )
    Api.RoleEdit(parmas).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.resetForm('ruleForm')
        this.$router.push({
          path: '/settings/roleList'
        })
      } else {
        this.$message.warning(res.msg)
      }
      this.btnLoad = false
    })
  }
  //获取树控件选择值
}
