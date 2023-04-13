import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action, State } from 'vuex-class'
import { IndexData } from '@/types/views/index.interface'
import * as Api from '@/api/index'
import * as Api2 from '@/api/user'
import { thousandBitSeparator } from '@/utils/common'
// import {  } from "@/components" // 组件
import table1 from './components/table.vue'
import shenhe from '@/views/ordinary/compents/shenhe.vue'
import shenheAdmin from './components/shenheAdmin.vue'
@Component({
  components: {
    table1,
    shenhe,
    shenheAdmin
  }
})
export default class work extends Vue {
  data: any = {
    is_super: '',
    loading: false,
    shenheType: false,
    creditorshenhShow: false,
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    list5: [],
    list6: [],
    option1: [
      { prop: 'batch_no', label: '批次号', width: '' },
      { prop: 'debt_type', label: '债务类别', width: '' },
      { prop: 'creditor_name', label: '债权人名称', width: '' },
      { prop: 'e_total', label: '委托数', width: '' },
      { prop: 'create_name', label: '创建人', width: '' },
      { prop: 'create_time', label: '委托时间', width: '' }
    ],
    option2: [
      { prop: 'debtor_number', label: '委托编号', width: '' },
      { prop: 'creditor_name', label: '债权人名称', width: '' },
      { prop: 'debtor_name', label: '债务人名称', width: '' },
      { prop: 'receiving_name', label: '收件人名称', width: '' },
      { prop: 'receiving_phone', label: '收件人手机号', width: '' },
      { prop: 'receiving_address', label: '收件人地址', width: '' },
      { prop: 'send_time', label: '寄送日期', width: '' }
    ],
    option3: [
      { prop: 'debtor_number', label: '委托编号', width: '' },
      { prop: 'collection_scene', label: '债务类别', width: '' },
      { prop: 'creditor_name', label: '债权人名称', width: '' },
      { prop: 'debtor_name', label: '债务人名称', width: '' },
      { prop: 'create_name', label: '创建人', width: '' },
      { prop: 'create_time', label: '委托时间', width: '' }
    ],
    option4: [
      { prop: 'id', label: 'ID', width: '' },
      { prop: 'creditor_type', label: '债权人类别', width: '' },
      { prop: 'creditor_name', label: '债权人名称', width: '' },
      { prop: 'create_name', label: '创建人', width: '' },
      { prop: 'create_time', label: '创建时间', width: '' }
    ],
    option5: [
      { prop: 'id', label: 'ID', width: '' },
      { prop: 'creditor_name', label: '债权人名称', width: '' },
      { prop: 'admin_name', label: '管理员真实姓名', width: '' },
      { prop: 'id_number', label: '身份证号码', width: '' },
      { prop: 'admin_phone_number', label: '手机号码', width: '' },
      { prop: 'admin_email', label: '电子邮箱', width: '' },
      // { prop: 'entrust_creditor_id', label: '权限', width: '' },
      { prop: 'authorization_file', label: '授权书', width: '' },
      { prop: 'create_time', label: '创建时间', width: '' }
    ],
    option6: [
      { prop: 'id', label: '律师ID', width: '' },
      { prop: 'lawyer_name', label: '律师名称', width: '' },
      { prop: 'law_firm_name', label: '律所名称', width: '' },
      { prop: 'lawyer_phone_number', label: '手机号码', width: '' },
      { prop: 'law_firm_address_detailed', label: '律所地址', width: '' },
      { prop: 'create_time', label: '申请时间', width: '' }
    ]
  }
  editData: any = {}
  adminData: any = {}
  created() {
    //
  }

  activated() {
    //
  }
  mounted() {
    this.data.loading = true
    this.GetToDoList()
  }
  tongji() {
    this.$router.push({ path: '/index' })
  }
  GetToDoList() {
    Api.GetToDoList().then((res: any) => {
      this.data.loading = false
      this.data.is_super = res.data.is_super
      this.data.list1 = res.data.lawyer_letter
      this.data.list2 = res.data.lawyer_letter_ems
      this.data.list3 = res.data.case_list
      this.data.list4 = res.data.creditor_list
      this.data.list5 = res.data.creditor_admin_list
      this.data.list6 = res.data.lawyer_list
    })
  }
  open1(row: any) {
    this.$router.push({
      path: `/LawyerLetter/entrustAdmin/${row.batch_no}/AI_State_2`
    })
  }
  open2(row: any) {
    this.$router.push({
      path: `/LawyerLetter/lawyerLetteList`
    })
  }
  open3(row: any) {
    this.$router.push({
      path: `/LawyersHandleCases/caseInfo/${row.debtor_number}`
    })
  }
  open4(row: any) {
    Api.getCreditorInfoByid(row.id).then((res: any) => {
      this.editData = res.data
      this.data.shenheType = true
    })
  }
  open5(row: any) {
    let val: any = row
    Api.GetAllAuthorizationFileRecord(row.id).then((res: any) => {
      val['history'] = res.data
      this.adminData = val
      this.data.creditorshenhShow = true
    })
  }
  open6(row: any) {
    this.$router.push({
      path: `/ordinary/VipAdmin/${row.id}`
    })
  }
  //审核提交
  onSubmit2(parmas: any) {
    Api2.CreditorAudit(parmas).then((res: any) => {
      if (res.state) {
        this.data.shenheType = false
        this.GetToDoList()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //管理员审核
  onSubmit1(params: any) {
    let params2: any = {
      id: params.id,
      audit_status: params.audit_status,
      audit_feedback: params.audit_feedback || '',
      back_remarks: params.back_remarks || '',
      license_img_url: params.license_img_url || '',
      authorization_file: params.authorization_file,
      creditor_admin_id: params.member_vip_admin_id
    }
    Api.CreditorAdminAudit(params2).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.creditorshenhShow = false
        this.GetToDoList()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
