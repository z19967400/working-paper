import { Component, Vue } from 'vue-property-decorator'
import { TemplateOptions } from '@/types'
import * as Api from '@/api/template'
import { baseURL } from '@/utils/request'
@Component({})
export default class About extends Vue {
  data: TemplateOptions['excellEdit'] = {
    id: 0, //id
    name: '', //名称
    creditor_states: '',
    debt_type: '',
    use_code: '', //调用吗
    template_path: '', //模板文件路径
    sheet: [
      {
        sheet_name: '', //表名称
        column_name_start_line: 0, //列表开始行
        content_start_line: 0, //内容开始行
        sheet_column_count: 0, //表列表数
        column: []
      }
    ]
  }
  rules: any = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    use_code: [
      { required: true, message: '请输入调用吗', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    template_path: [
      { required: true, message: '请输入模板文件路径', trigger: 'blur' }
    ],
    debt_type: [
      { required: true, message: '请选择债务类别', trigger: 'change' }
    ],
    creditor_states: [
      { required: true, message: '请选择债务人类型', trigger: 'change' }
    ]
  }
  options: any = [
    {
      value: 0,
      label: '不验证'
    },
    {
      value: 1,
      label: '数字'
    },
    {
      value: 2,
      label: '时间格式'
    },
    {
      value: 3,
      label: '邮箱'
    },
    {
      value: 4,
      label: '手机号'
    }
  ]
  fileList: Array<any> = []
  height: number = 0
  burl: string = ''
  btnLoad: boolean = false
  debTypes: any = [] //债务类别列表
  CreditorStates: any = [] //债务人列表
  created() {
    this.height = document.body.offsetHeight - 220
  }

  activated() {
    //
  }

  mounted() {
    this.init()
  }
  init() {
    let self: any = this
    self.burl = baseURL
    let id: number = self.$route.query.id
    self.btnLoad = false
    self.getDebType()
    self.getCreditorStates()
    if (id == 0) {
      let from: any = self.$refs['ruleForm']
      from.resetFields()
      self.fileList = []
    } else {
      self.fileList = []
      self.getInfo(id)
    }
  }
  //获取债务类别字典
  getDebType() {
    Api.getDicInfoList('Debt_type').then((res: any) => {
      this.debTypes = res.data
    })
  }
  getCreditorStates() {
    Api.getDicInfoList('Creditor_states').then((res: any) => {
      this.CreditorStates = res.data
    })
  }
  //获取数据
  getInfo(id: number) {
    let self: any = this
    self.data.id = id
    Api.getExcellInfo(id).then((res: any) => {
      self.data.creditor_states = res.data.data.creditor_states
      self.data.debt_type = res.data.data.debt_type
      self.data.name = res.data.data.name
      self.data.use_code = res.data.data.use_code
      self.data.template_path = res.data.data.template_path
      self.data.sheet = res.data.sheet
      let item: any = {
        name: res.data.data.name + '.xls',
        url: res.data.data.template_path
      }
      this.fileList.push(item)
      self.data.sheet.forEach((item: any) => {
        item.column.forEach((item2: any) => {
          item2.is_required = item2.is_required == 0 ? false : true
          // item2.verify_conditions = self.options[item2.verify_conditions].label;
        })
      })
    })
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      this.btnLoad = true
      if (valid) {
        self.data.sheet.forEach((item: any) => {
          item.column.forEach((item2: any) => {
            item2.is_required = item2.is_required == true ? 1 : 0
          })
        })
        Api.ExcellModelEdit(self.data)
          .then((res: any) => {
            if (res.data != 0) {
              self.visible = false
              self.$message.success(res.msg)
              self.init()
            } else {
              self.$message.warning(res.msg)
            }
            this.btnLoad = false
          })
          .catch((err: any) => {
            // eslint-disable-next-line no-console
            console.log(err)
            this.btnLoad = false
          })
      } else {
        this.$message.warning('请上传模板文件')
        this.btnLoad = false
        return false
      }
    })
  }
  //取消，重置
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    let data: any = this.data
    data.column = []
    from.resetFields()
    this.$router.push({
      path: '/Template/excell'
    })
  }
  //add Sheet
  addSheet() {
    let self: any = this
    let item: any = {
      sheet_name: '', //表名称
      column_name_start_line: 0, //列表开始行
      content_start_line: 0, //内容开始行
      sheet_column_count: 0, //表列表数
      column: []
    }
    self.data.sheet.push(item)
  }
  //delet sheet
  deletSheet(idx: number) {
    let self: any = this
    self.data.sheet.splice(idx, 1)
  }
  //add column
  addColumn(idx: number) {
    let self: any = this
    if (self.data.sheet[idx].sheet_column_count == 0) {
      self.$message.warning('列数不能为0')
      return false
    }
    self.data.sheet[idx].column = []
    for (
      let index = 0;
      index < self.data.sheet[idx].sheet_column_count;
      index++
    ) {
      let item: any = {
        ///每列的信息
        template_excel_sheet_id: 0, //表id
        column_name: '',
        field_name: '',
        verify_conditions: '',
        is_required: 0
      }
      self.data.sheet[idx].column.push(item)
    }
    // eslint-disable-next-line no-console
    console.log(self.data.sheet)
  }
  handleRemove(file: any, fileList: any) {
    // eslint-disable-next-line no-console
    // console.log(file, fileList);
  }
  handlePreview(file: any) {
    // eslint-disable-next-line no-console
    // console.log(file);
  }
  handleExceed(files: string | any[], fileList: string | any[]) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (file.status == 'success') {
      this.$message.success('上传成功')
      let fileData: any = file.response.data
      self.data.template_path = fileData.FileUrl + fileData.FileExtension
    } else {
      this.$message.warning('上传失败')
    }
  }
  beforeUpload(file: any) {
    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const extension = testmsg === 'xls'
    const extension2 = testmsg === 'xlsx'
    if (!extension && !extension2) {
      this.$message({
        message: '上传文件只能是 xls/xlsx 格式!',
        type: 'warning'
      })
    }
    return extension || extension2
  }
}
