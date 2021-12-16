import { Component, Vue } from 'vue-property-decorator'
import { monitorOptions } from '@/types'
import * as Api from '@/api/monitor'
@Component({})
export default class About extends Vue {
  form: monitorOptions['queueEdit'] = {
    id: 0,
    task_name: '',
    task_code: '',
    task_group: '',
    task_describe: ''
  }
  rules: any = {
    task_name: [
      { required: true, message: '请输入队列名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    task_code: [
      { required: true, message: '请输入队列编号', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    task_group: [
      { required: true, message: '请输入分组编号', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    task_describe: [
      { required: true, message: '请输入描述', trigger: 'blur' },
      { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
    ]
  }
  btnLoad: boolean = false
  created() {
    //
  }

  activated() {
    let self: any = this
    if (self.$route.query.id != 0 && self.$route.query.id != undefined) {
      this.init()
    } else {
      self.form.id = 0
      self.resetForm('form')
    }
  }

  mounted() {
    //
  }
  init() {
    let self: any = this
    Api.getQueueInfo(self.$route.query.id).then((res: any) => {
      self.form.id = res.data.id
      self.form.task_name = res.data.task_name
      self.form.task_code = res.data.task_code
      self.form.task_group = res.data.task_group
      self.form.task_describe = res.data.task_describe
      self.form.last_time = res.data.last_time
      self.form.next_time = res.data.next_time
      self.form.last_run_time = res.data.last_run_time
    })
  }
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    from.validate((valid: boolean) => {
      if (valid) {
        this.btnLoad = true
        Api.QueueEdit(this.form).then((res: any) => {
          if (res.data == 0) {
            this.$message.warning(res.msg)
            this.btnLoad = false
          } else {
            this.$message.success(res.msg)
            this.resetForm('form')
            this.btnLoad = false
            this.$router.push({
              path: '/monitor/queue'
            })
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
  }
}
