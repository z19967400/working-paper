import { Component, Vue } from 'vue-property-decorator'
import { SettingsData, SettingsOptions } from '@/types'
import * as Api from '@/api/settings'

@Component({})
export default class About extends Vue {
  // data
  data: SettingsData['processEdit'] = {
    fromIdList: []
  }
  formdata: SettingsOptions['processEdit'] = {
    id: 0,
    flow_name: '',
    flow_sort: '',
    is_default: false,
    data: [
      {
        id: 0,
        name: '',
        form_id: 0,
        interval_days: 0
      }
    ]
  }
  height: number = 0
  btnLoad: boolean = false
  created() {
    this.height = document.body.offsetHeight - 240
  }

  activated() {
    this.init()
  }

  mounted() {
    //
  }

  // 初始化函数
  init() {
    let self: any = this
    self.data.fromIdList = []
    self.formdata = {
      id: this.$route.query.id,
      flow_name: '',
      flow_sort: '',
      is_default: false,
      data: [
        {
          id: 0,
          name: '',
          form_id: 0,
          interval_days: 0,
          state: 0
        }
      ]
    }
    this.getFromIDList()
    if (self.$route.query.id != 0) {
      this.getInfo(self.$route.query.id)
    }
  }
  //提交
  onSubmit() {
    let self: any = this
    let params: any = self.formdata
    params.is_default = self.formdata.is_default == false ? 0 : 1
    this.btnLoad = true
    // eslint-disable-next-line no-console
    // console.log(params);

    Api.caseEdit(params).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.btnLoad = false
        this.$router.push({
          path: '/settings/processList'
        })
      } else {
        this.$message.warning(res.msg)
        this.btnLoad = false
      }
    })
  }
  //添加步骤
  add() {
    let self: any = this
    let stepItem: object = {
      id: 0,
      name: '',
      form_id: 0,
      state: 0
    }
    self.formdata.data.push(stepItem)
    //
  }
  //删除步骤
  stepDelete(index: number, data: any) {
    let self: any = this

    if (data.id == 0) {
      self.formdata.data.splice(index, 1)
      return false
    }
    self.formdata.data.forEach((item: any) => {
      if (item.id == data.id) {
        item.state = -1
      }
    })
    setTimeout(() => {
      self.formdata.data.splice(index, 1)
    }, 500)
  }
  //获取所有表单id
  getFromIDList() {
    Api.getSelectFrom()
      .then((res: any) => {
        let self: any = this
        self.data.fromIdList = res.data
      })
      .catch(() => {
        this.$message.error('网络错误')
      })
  }
  //获取详情
  getInfo(id: number) {
    let self: any = this
    Api.getCaseInfo(id).then((res: any) => {
      self.formdata.flow_name = res.data.data.flow_name
      self.formdata.flow_sort = res.data.data.flow_sort
      self.formdata.is_default = res.data.data.is_default == 0 ? false : true
      self.formdata.data = res.data.details
    })
  }
  //取消
  quxiao() {
    this.$router.push({
      path: '/settings/processList'
    })
  }
}
