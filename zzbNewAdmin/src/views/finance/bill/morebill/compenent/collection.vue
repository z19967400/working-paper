<template>
  <div class="collection">
    <el-form
      ref="form"
      :model="data"
      size="small"
      class="addForm demo-form-inline"
      label-width="120px"
    >
      <el-form-item v-show="adminList.length > 0" label="管理员">
        <el-select v-model="data.member_vip_admin_id">
          <el-option
            v-for="(item, index) in adminList"
            :key="index"
            :value="item.id"
            :label="item.admin_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票类型">
            <el-select @change="invoiceWatch" v-model="data.invoice_type">
              <el-option
                value="Invoice_Type_0"
                label="增值税普通发票(电子)"
              ></el-option>
              <el-option
                value="Invoice_Type_1"
                label="增值税普通发票(纸质)"
              ></el-option>
              <el-option
                value="Invoice_Type_2"
                label="增值税专用发票(纸质)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票税率">
            <el-input
              style="width:120px;"
              v-model="data.invoice_tax_rate"
            ></el-input>
            <span> %</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款户名">
            <el-input v-model="data.account_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款账号">
            <el-input v-model="data.account_number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款银行全称">
            <el-input v-model="data.bank_full_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款银行行号">
            <el-input v-model="data.bank_no"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人电话">
            <el-input v-model="data.telephone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer-btn">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="quxiao">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import telephone from '../../../../Template/telephone/telephone.vue'
import * as Api from '../../../../../api/finance'
@Component({
  components: { telephone }
})
export default class collection extends Vue {
  @Prop() editData!: any
  @Prop() adminList!: any
  @Prop() mId!: any
  @Prop() bill_number!: string
  data: any = {
    id: 0,
    member_id: 0,
    bill_number: '',
    member_vip_admin_id: 0,
    invoice_type: '',
    invoice_tax_rate: '',
    account_name: '',
    account_number: '',
    bank_full_name: '',
    bank_no: '',
    telephone: ''
  }
  @Watch('editData', { immediate: true, deep: true })
  editDataVcal(newVal: any, oldVal: any) {
    if (newVal) {
      Object.keys(this.data).forEach((key: string) => {
        if (newVal[key]) {
          this.data[key] = newVal[key]
        }
      })
    } else {
      this.data = {
        id: 0,
        member_id: this.mId,
        bill_number: this.bill_number,
        member_vip_admin_id: 0,
        invoice_type: '',
        invoice_tax_rate: '',
        account_name: '',
        account_number: '',
        bank_full_name: '',
        bank_no: '',
        telephone: ''
      }
    }
  }
  mounted() {
    //
  }
  //发票选择监听
  invoiceWatch(val: any) {
    if (val == 'Invoice_Type_0') {
      this.data.invoice_tax_rate = 1
    } else if (val == 'Invoice_Type_1') {
      this.data.invoice_tax_rate = 3
    } else {
      this.data.invoice_tax_rate = 6
    }
  }
  onSubmit() {
    this.data.member_id = this.mId
    this.data.bill_number = this.bill_number
    Api.AddCollectionInfo(this.data).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
        this.$emit('close')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  quxiao() {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.collection {
  width: 100%;
  & .el-form {
    width: 90% !important;
  }
  & .footer-btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
