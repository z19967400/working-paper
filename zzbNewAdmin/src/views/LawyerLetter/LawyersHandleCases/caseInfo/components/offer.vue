<template>
  <div class="offer">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">平台报价方案_用户（人民币/元）</span>
        <span @click="data.costType = !data.costType" class="edit">{{
          data.costType ? '取消' : '编辑'
        }}</span>
        <span style="margin-right:20px;" @click="jisuan1" class="add"
          >计算报价</span
        >
      </span>
      <el-divider></el-divider>
      <el-table center :data="data.userList" border style="width: 100%">
        <el-table-column
          fixed
          prop="service_fee_mode_name"
          label="服务费模式"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="fixed_service_fee_ck" label="参考固定服务费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.fixed_service_fee_ck != '-' && data.costType"
              v-model="scope.row.fixed_service_fee_ck"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.fixed_service_fee_ck }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fixed_service_fee" label="最终固定服务费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.fixed_service_fee != '-' && data.costType"
              v-model="scope.row.fixed_service_fee"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.fixed_service_fee }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="float_service_rate_ck"
          label="参考风险服务费率(%)"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.float_service_rate_ck != '-' && data.costType"
              v-model="scope.row.float_service_rate_ck"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.float_service_rate_ck }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="float_service_rate" label="最终风险服务费率(%)">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.float_service_rate != '-' && data.costType"
              v-model="scope.row.float_service_rate"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.float_service_rate }}
              <span v-show="scope.row.float_service_rate != '-'">%</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="commission_manage_rate" label="平台管理费率(%)">
          <template slot-scope="scope">
            <div v-if="scope.row.service_fee_mode_name != '固定+风险'">
              <el-input
                v-if="scope.row.commission_manage_rate != '-' && data.costType"
                v-model="scope.row.commission_manage_rate"
              ></el-input>
              <div v-else class="cell">
                {{ scope.row.commission_manage_rate }}%
              </div>
            </div>
            <div v-else>
              <div
                v-if="scope.row.commission_manage_rate != '-' && data.costType"
              >
                <el-input
                  style="width:40%;"
                  v-model="data.commission_manage_rate_gf_g"
                ></el-input>
                <span> | </span>
                <el-input
                  style="width:40%;"
                  v-model="data.commission_manage_rate_gf_f"
                ></el-input>
              </div>
              <div v-else class="cell">
                {{ scope.row.commission_manage_rate }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="选择" width="100">
          <template slot-scope="scope">
            <el-radio
              @change="radioChange"
              v-model="data.service_fee_mode"
              :label="scope.row.service_fee_mode"
              >选中</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin:20px 0;"
        v-show="data.costType"
        size="small"
        @click="upDataOffer"
        type="primary"
        >保存</el-button
      >
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">平台报价方案_诚收（人民币/元）</span>
        <span @click="data.costType2 = !data.costType2" class="edit">{{
          data.costType2 ? '取消' : '编辑'
        }}</span>
        <span style="margin-right:20px;" @click="jisuan2" class="add"
          >计算报价</span
        >
      </span>
      <el-divider></el-divider>
      <el-table border :data="data.csList" style="width:600px;">
        <el-table-column prop="service_fee_mode_name" label="平台管理费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.service_fee_mode_name != '-' && data.costType2"
              v-model="scope.row.service_fee_mode_name"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.service_fee_mode_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="final_manage_fee_g" label="固定平台管理费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.final_manage_fee_g != '-' && data.costType2"
              v-model="scope.row.final_manage_fee_g"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.final_manage_fee_g }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="final_manage_fee_f" label="风险平台管理费(%)">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.final_manage_fee_f != '-' && data.costType2"
              v-model="scope.row.final_manage_fee_f"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.final_manage_fee_f }}
              <span v-show="scope.row.final_manage_fee_f != '-'">%</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户选中报价">
          <template slot-scope="scope">
            <i
              style="color:#ec193a"
              v-show="scope.row.service_fee_mode == data.service_fee_mode"
              class="el-icon-check"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin:20px 0;"
        v-show="data.costType2"
        size="small"
        type="primary"
        @click="upDataOffer2"
        >保存</el-button
      >
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">平台报价方案_律师（人民币/元）</span>
        <span @click="data.costType3 = !data.costType3" class="edit">{{
          data.costType3 ? '取消' : '编辑'
        }}</span>
        <span style="margin-right:20px;" @click="jisuan3" class="add"
          >计算报价</span
        >
      </span>
      <el-divider></el-divider>
      <el-table border :data="data.lawyer" style="width:800px;">
        <el-table-column prop="service_fee_mode_name" label="律师费模式">
        </el-table-column>
        <el-table-column prop="final_lawyer_fee_g" label="固定律师费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.final_lawyer_fee_g != '-' && data.costType3"
              v-model="scope.row.final_lawyer_fee_g"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.final_lawyer_fee_g }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="final_lawyer_fee_f" label="风险律师费率(%)">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.final_lawyer_fee_f != '-' && data.costType3"
              v-model="scope.row.final_lawyer_fee_f"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.final_lawyer_fee_f }}
              <span v-show="scope.row.final_lawyer_fee_f != '-'">%</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="exhibition_lawyer_fee" label="预计律师费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.exhibition_lawyer_fee != '-' && data.costType3"
              v-model="scope.row.exhibition_lawyer_fee"
            ></el-input>
            <div v-else class="cell">
              {{ scope.row.exhibition_lawyer_fee }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户选中报价">
          <template slot-scope="scope">
            <i
              style="color:#ec193a"
              v-show="scope.row.service_fee_mode == data.service_fee_mode"
              class="el-icon-check"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin:20px 0;"
        v-show="data.costType3"
        @click="upDataOffer3"
        size="small"
        type="primary"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../../../api/business'
@Component({
  components: {}
})
export default class offer extends Vue {
  @Prop() offer!: any
  @Watch('offer', { deep: true })
  offerChange(newVal: any, oldVal: any) {
    this.data.offerId = newVal.offerId
    this.data.service_fee_mode = newVal.service_fee_mode
    this.data.offer = newVal
    if (newVal.offerInfo) {
      this.updataUser(newVal.offerInfo)
      this.updataPt(newVal.offerInfo)
      this.updataLayer(newVal.offerInfo)
    }
  }
  data: any = {
    commission_manage_rate_gf_f: '',
    commission_manage_rate_gf_g: '',
    offer: '',
    costType: false,
    costType2: false,
    costType3: false,
    userList: [],
    csList: [],
    lawyer: [],
    offerId: 0,
    service_fee_mode: '' //选中的服务费模式
  }
  mounted() {
    // this.$message.warning
  }
  updataUser(newVal: any) {
    this.data.commission_manage_rate_gf_f = newVal.commission_manage_rate_gf_f
    this.data.commission_manage_rate_gf_g = newVal.commission_manage_rate_gf_g
    this.data.userList = [
      {
        service_fee_mode_name: '纯固定',
        service_fee_mode: 'Case_Service_Fee_Mode_2',
        fixed_service_fee_ck: newVal.fixed_service_fee_ck,
        fixed_service_fee: newVal.fixed_service_fee,
        float_service_rate_ck: '-',
        float_service_rate: '-',
        commission_manage_rate: newVal.commission_manage_rate_cg
      },
      {
        service_fee_mode_name: '纯风险',
        service_fee_mode: 'Case_Service_Fee_Mode_1',
        fixed_service_fee_ck: '-',
        fixed_service_fee: '-',
        float_service_rate_ck: newVal.float_service_rate_ck,
        float_service_rate: newVal.float_service_rate,
        commission_manage_rate: newVal.commission_manage_rate_cf
      },
      {
        service_fee_mode_name: '固定+风险',
        service_fee_mode: 'Case_Service_Fee_Mode_3',
        fixed_service_fee_ck: newVal.gf_fixed_service_fee_ck,
        fixed_service_fee: newVal.gf_fixed_service_fee,
        float_service_rate_ck: newVal.gf_float_service_rate_ck,
        float_service_rate: newVal.gf_float_service_rate,
        commission_manage_rate:
          newVal.commission_manage_rate_gf_g +
          '%' +
          ' | ' +
          newVal.commission_manage_rate_gf_f +
          '%'
      }
    ]
  }
  updataPt(newVal: any) {
    this.data.csList = [
      {
        service_fee_mode_name: '纯固定',
        service_fee_mode: 'Case_Service_Fee_Mode_2',
        final_manage_fee_g: newVal.final_manage_fee_g,
        final_manage_fee_f: '-'
      },
      {
        service_fee_mode_name: '纯风险',
        service_fee_mode: 'Case_Service_Fee_Mode_1',
        final_manage_fee_g: '-',
        final_manage_fee_f: newVal.final_manage_fee_f
      },
      {
        service_fee_mode_name: '固定+风险',
        service_fee_mode: 'Case_Service_Fee_Mode_3',
        final_manage_fee_g: newVal.final_manage_fee_gf_g,
        final_manage_fee_f: newVal.final_manage_fee_gf_f
      }
    ]
  }
  updataLayer(newVal: any) {
    this.data.lawyer = [
      {
        service_fee_mode_name: '纯固定',
        service_fee_mode: 'Case_Service_Fee_Mode_2',
        final_lawyer_fee_g: newVal.final_lawyer_fee_g,
        final_lawyer_fee_f: '-',
        exhibition_lawyer_fee: newVal.exhibition_lawyer_fee_g
      },
      {
        service_fee_mode_name: '纯风险',
        service_fee_mode: 'Case_Service_Fee_Mode_1',
        final_lawyer_fee_g: '-',
        final_lawyer_fee_f: newVal.final_lawyer_fee_f,
        exhibition_lawyer_fee: newVal.exhibition_lawyer_fee_f
      },
      {
        service_fee_mode_name: '固定+风险',
        service_fee_mode: 'Case_Service_Fee_Mode_3',
        final_lawyer_fee_g: newVal.final_lawyer_fee_gf_g,
        final_lawyer_fee_f: newVal.final_lawyer_fee_gf_f,
        exhibition_lawyer_fee: newVal.exhibition_lawyer_fee_gf
      }
    ]
  }
  //更新案件报价 用户报价
  upDataOffer() {
    const parmas: any = {
      debtor_number: this.data.offer.offerInfo.debtor_number, //债务人编号 委托编号
      float_service_rate_ck: this.data.userList[1].float_service_rate_ck, //纯浮动服务费率(%)_参考
      float_service_rate: this.data.userList[1].float_service_rate, //纯浮动服务费率(%)
      fixed_service_fee_ck: this.data.userList[0].fixed_service_fee_ck, //纯固定服务费_参考
      fixed_service_fee: this.data.userList[0].fixed_service_fee, //纯固定服务费
      gf_fixed_service_fee_ck: this.data.userList[2].fixed_service_fee_ck, //固定+浮动_参考固定
      gf_float_service_rate_ck: this.data.userList[2].float_service_rate_ck, //固定+浮动_参考浮动
      gf_fixed_service_fee: this.data.userList[2].fixed_service_fee, //固定+浮动_固定
      gf_float_service_rate: this.data.userList[2].float_service_rate, //固定+浮动_浮动
      commission_manage_rate_cf: this.data.userList[1].commission_manage_rate, //平台管理费比例 纯浮动
      commission_manage_rate_cg: this.data.userList[0].commission_manage_rate, //平台管理费比例 纯固定
      commission_manage_rate_gf_f: this.data.commission_manage_rate_gf_f, //平台管理费比例 固定+浮动 浮动
      commission_manage_rate_gf_g: this.data.commission_manage_rate_gf_g //平台管理费比例 固定+浮动 固定
    }
    this.$confirm('您确定保存吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.UpdateQuotedPrice_01(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.data.costType = !this.data.costType
            this.$emit('upDataOffer')
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //更新报价 平台
  upDataOffer2() {
    const parmas: any = {
      debtor_number: this.data.offer.offerInfo.debtor_number, //债务人编号 委托编号
      final_manage_fee_f: this.data.csList[1].final_manage_fee_f,
      final_manage_fee_g: this.data.csList[0].final_manage_fee_g,
      final_manage_fee_gf_f: this.data.csList[2].final_manage_fee_f,
      final_manage_fee_gf_g: this.data.csList[2].final_manage_fee_g
    }
    this.$confirm('您确定保存吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.UpdateQuotedPrice_02(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.data.costType2 = !this.data.costType2
            this.$emit('upDataOffer')
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //更新报价 律师
  upDataOffer3() {
    const parmas: any = {
      debtor_number: this.data.offer.offerInfo.debtor_number, //债务人编号 委托编号
      final_lawyer_fee_f: this.data.lawyer[1].final_lawyer_fee_f,
      final_lawyer_fee_g: this.data.lawyer[0].final_lawyer_fee_g,
      final_lawyer_fee_gf_f: this.data.lawyer[2].final_lawyer_fee_f,
      final_lawyer_fee_gf_g: this.data.lawyer[2].final_lawyer_fee_g,
      exhibition_lawyer_fee_f: this.data.lawyer[1].exhibition_lawyer_fee,
      exhibition_lawyer_fee_g: this.data.lawyer[0].exhibition_lawyer_fee,
      exhibition_lawyer_fee_gf: this.data.lawyer[2].exhibition_lawyer_fee
    }
    this.$confirm('您确定保存吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.UpdateQuotedPrice_03(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.data.costType3 = !this.data.costType3
            this.$emit('upDataOffer')
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //计算用户报价
  jisuan1() {
    this.$confirm('您确定重新计算报价吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.CalculationQuotedPrice_v1(
          this.data.offer.offerInfo.debtor_number
        ).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.updataUser(res.data.case_detail)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消计算'
        })
      })
  }
  //计算诚收报价
  jisuan2() {
    this.$confirm('您确定重新计算报价吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.CalculationQuotedPrice_v2(
          this.data.offer.offerInfo.debtor_number
        ).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.updataPt(res.data)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消计算'
        })
      })
  }
  //计算律师报价
  jisuan3() {
    this.$confirm('您确定重新计算报价吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.CalculationQuotedPrice_v3(
          this.data.offer.offerInfo.debtor_number
        ).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.updataLayer(res.data)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消计算'
        })
      })
  }
  //选中报价
  radioChange(e: any) {
    this.$confirm('您确定选中该模式吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$emit('choice', e)
      })
      .catch(() => {
        this.data.service_fee_mode = this.data.offer.offerInfo.service_fee_mode
        this.$message({
          type: 'info',
          message: '已取消选中'
        })
      })
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/variables';
.offer {
  & > .section {
    margin-bottom: 20px;
    padding-right: 20px;
    & > span:first-child {
      font-size: 12px;
      margin-top: 10px;
      display: block;
      height: 20px;
      .edit {
        color: #e6a23c;
        float: right;
        cursor: pointer;
      }
      .add {
        color: #67c23a;
        float: right;
        cursor: pointer;
      }
    }
  }
  & .el-table {
    & .cell {
      text-align: center;
    }
  }
}
</style>
