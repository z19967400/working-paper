<template>
  <div :style="{ height: data.height + 'px' }" class="assessment-wrap">
    <!-- <div class="section">
      <span style="margin-top:0">
        <span class="title">债务人基本信用信息</span>
        <span @click="informationEdit()" class="edit">{{
          data.informationType ? '保存' : '编辑'
        }}</span></span
      >
      <el-divider></el-divider>
      <div class="box">
        <div
          v-for="(item, index) in data.assessment.information"
          :key="index"
          class="text"
        >
          <p v-for="(item2, index2) in item" :key="index2">
            <span>{{ item2.name }}</span>
            <span v-if="!data.informationType">{{ item2.value }}</span>
            <el-col v-else :span="8">
              <el-input
                size="small"
                v-model="item2.value"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </p>
        </div>
      </div>
    </div> -->
    <!-- 胜诉率预估 -->
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">胜诉率预估</span>
        <span @click="data.winratType = !data.winratType" class="edit">{{
          data.winratType ? '取消' : '编辑'
        }}</span></span
      >
      <el-divider></el-divider>
      <div class="content">
        <el-row>
          <span class="laber">约定付款日期</span>
          <span class="value"> {{ data.assessment.agreedDate }}</span>
        </el-row>
        <el-row>
          <span class="laber">欠款是否有争议</span>
          <span class="value"> {{ data.assessment.dispute }}</span>
        </el-row>
        <el-row>
          <span class="laber">现有证据</span>
          <span class="value">
            <el-tag
              style="color:#303133;"
              v-for="(item, index) in data.assessment.availableEvidence.split(
                '；'
              )"
              :key="index"
              type="info"
              >{{ item }}</el-tag
            >
          </span>
        </el-row>
        <el-row>
          <span class="laber">其他证据</span>
          <span class="value">
            {{ data.assessment.otherEvidence }}
          </span>
        </el-row>
        <el-table
          :data="data.assessment.case_winrate"
          border
          :cell-style="{ 'text-align': ' center' }"
          :header-cell-style="{ 'text-align': 'center' }"
          style="margin-bottom:20px;width:700px;"
        >
          <el-table-column prop="factor" label="评分因素" width="480px">
          </el-table-column>
          <el-table-column prop="weight" label="权重" width="120px">
          </el-table-column>
          <el-table-column prop="score" label="得分">
            <template slot-scope="scope">
              <span v-if="!data.winratType">{{ scope.row.score }}</span>
              <el-input
                v-else
                size="small"
                v-model="scope.row.score"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          v-if="!data.winratType"
          style="margin:0 0 20px 0;"
          size="small"
          type="primary"
          @click="winrateCalct"
          >重新计算</el-button
        >
        <el-row style="line-height: 32px;">
          <el-col :span="8">
            <el-row>
              <span class="laber">评估得分</span>
              <span v-if="!data.winratType" class="value">{{
                data.assessment.case_winrateData.evaluation_score
              }}</span>
              <el-input
                v-else
                size="small"
                style="width:80px;"
                v-model="data.assessment.case_winrateData.evaluation_score"
                placeholder="请输入"
              ></el-input>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <span class="laber">胜诉率</span>
              <span v-if="!data.winratType" class="value red bold">{{
                data.assessment.case_winrateData.win_rate
              }}</span>
              <el-input
                v-else
                style="width:80px;"
                size="small"
                v-model="data.assessment.case_winrateData.win_rate"
                placeholder="请输入"
              ></el-input>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <span class="laber">评估说明</span>
          <span v-if="!data.winratType" class="value">
            {{ data.assessment.case_winrateData.assessment_notes }}
          </span>
          <el-input
            v-else
            style="width:615px;"
            size="small"
            type="textarea"
            v-model="data.assessment.case_winrateData.assessment_notes"
            placeholder="请输入内容"
          ></el-input>
        </el-row>
        <el-button
          v-if="data.winratType"
          style="margin:20px 0;"
          size="small"
          type="primary"
          @click="winratEdit"
          >保存</el-button
        >
      </div>
    </div>
    <!-- 回款率预估 -->
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">回款率预估</span>
        <span
          @click="data.collectionrateType = !data.collectionrateType"
          class="edit"
        >
          {{ data.collectionrateType ? '取消' : '编辑' }}
        </span>
      </span>
      <el-divider></el-divider>
      <div class="content">
        <el-row>
          <span class="laber">约定付款日期</span>
          <span class="value"> {{ data.assessment.agreedDate }}</span>
        </el-row>
        <el-row>
          <span class="laber">欠款是否有争议</span>
          <span class="value"> {{ data.assessment.dispute }}</span>
        </el-row>
        <el-row>
          <span class="laber">财产线索</span>
          <span class="value">
            <el-tag
              style="color:#303133;"
              v-for="(item, index) in data.assessment.property_clues.split(
                '；'
              )"
              :key="index"
              type="info"
              >{{ item }}</el-tag
            >
          </span>
        </el-row>
        <el-row>
          <span class="laber">补充说明</span>
          <span class="value">
            {{ data.assessment.property_clues_bc }}
          </span>
        </el-row>
        <el-table
          :data="data.assessment.case_collectionrate"
          border
          :cell-style="{ 'text-align': ' center' }"
          :header-cell-style="{ 'text-align': 'center' }"
          style="margin-bottom:20px;width:965px;"
        >
          <el-table-column prop="factor" label="评分因素" width="380px">
          </el-table-column>
          <el-table-column prop="weight" label="权重" width="220px">
            <template slot-scope="scope">
              <span v-html="scope.row['weight']"></span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="得分依据" width="280px">
            <template slot-scope="scope">
              <span v-if="!data.collectionrateType">{{ scope.row.value }}</span>
              <div style="display:inline;" v-else>
                <el-select
                  v-if="scope.row.prop2 == 'debtor_status'"
                  v-model="scope.row.value"
                >
                  <el-option
                    :label="
                      `${
                        data.assessment.creditor_type_name == '企业'
                          ? '存续（在营、开业、在册）'
                          : '正常'
                      }`
                    "
                    :value="
                      `${
                        data.assessment.creditor_type_name == '企业'
                          ? '存续（在营、开业、在册）'
                          : '正常'
                      }`
                    "
                  ></el-option>
                  <el-option
                    :label="
                      `${
                        data.assessment.creditor_type_name == '企业'
                          ? '注销'
                          : '失联'
                      }`
                    "
                    :value="
                      `${
                        data.assessment.creditor_type_name == '企业'
                          ? '注销'
                          : '失联'
                      }`
                    "
                  ></el-option>
                </el-select>
                <el-input
                  style="width:60%;"
                  v-else-if="
                    scope.row.prop2 && scope.row.prop2 != 'debtor_status'
                  "
                  v-model="scope.row.value"
                ></el-input>
                <span v-else>{{ scope.row.value }}</span>
              </div>
              <span
                style="margin-left:10px;"
                v-show="
                  scope.row.value != '-' && scope.row.prop2 != 'debtor_status'
                "
                >{{
                  scope.row.prop == 'account_age'
                    ? '天'
                    : scope.row.prop == 'dishonesty_executed_person' ||
                      scope.row.prop == 'final_case'
                    ? '起'
                    : '次'
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="得分">
            <template slot-scope="scope">
              <span v-if="!data.collectionrateType">{{ scope.row.score }}</span>
              <el-input
                v-else
                size="small"
                v-model="scope.row.score"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          v-if="!data.collectionrateType"
          @click="calculationCollection"
          style="margin: 0 0 20px 0;"
          size="small"
          type="primary"
          >重新计算</el-button
        >
        <el-row style="line-height: 32px;">
          <span class="laber">案件评级</span>
          <span v-if="!data.collectionrateType" class="value red bold">{{
            data.assessment.case_collectData.case_rating
          }}</span>
          <el-input
            v-else
            style="width:80px;"
            size="small"
            v-model="data.assessment.case_collectData.case_rating"
          ></el-input>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row style="line-height: 32px;">
              <span class="laber">评估得分</span>
              <span v-if="!data.collectionrateType" class="value red bold">{{
                data.assessment.case_collectData.evaluation_score
              }}</span>
              <el-input
                style="width:80px;"
                v-else
                size="small"
                v-model="data.assessment.case_collectData.evaluation_score"
              ></el-input>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="line-height: 32px;">
              <span class="laber">回款率</span>
              <span v-if="!data.collectionrateType" class="value red bold">{{
                data.assessment.case_collectData.collection_rate
              }}</span>
              <el-input
                v-else
                style="width:80px"
                size="small"
                v-model="data.assessment.case_collectData.collection_rate"
              ></el-input>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <span class="laber">评估说明</span>

          <span v-if="!data.collectionrateType" class="value">{{
            data.assessment.case_collectData.assessment_notes
          }}</span>
          <el-input
            v-else
            style="width:720px;"
            size="small"
            type="textarea"
            v-model="data.assessment.case_collectData.assessment_notes"
            placeholder="请输入内容"
          ></el-input>
        </el-row>
        <el-button
          v-if="data.collectionrateType"
          @click="collectionrateEdit"
          style="margin:20px 0;"
          size="small"
          type="primary"
          >保存</el-button
        >
      </div>
    </div>
    <!-- 诉讼、仲裁、保全费用预估 -->
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">诉讼、仲裁、保全费用预估</span>
        查询途径：<a href="https://www.cnado.com" target="_blank"
          >https://www.cnado.com</a
        >
        <span @click="data.costType = !data.costType" class="edit">{{
          data.costType ? '取消' : '编辑'
        }}</span>
      </span>
      <el-divider></el-divider>
      <div class="content">
        <el-table
          :data="data.assessment.estimate"
          border
          style="width: 300px"
          :cell-style="{ 'text-align': ' center' }"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="factor" label="费用类别" width="150px">
          </el-table-column>
          <el-table-column label="金额" width="150px">
            <template slot-scope="scope">
              <span v-if="!data.costType">{{ scope.row.weight }}</span>
              <el-input
                v-else
                size="small"
                v-model="scope.row.weight"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          v-if="data.costType"
          @click="costEdit"
          style="margin:20px 0;"
          size="small"
          type="primary"
          >保存</el-button
        >
      </div>
    </div>
    <div class="section">
      <offer
        :debtor_number="data.debtor_number"
        :burl="burl"
        :admins="data.options"
      ></offer>
    </div>
    <!-- <div class="section">
      <span style="margin-top:0;">
        <span class="title">案件评估分析报告</span>
      </span>
      <el-divider></el-divider>
      <div class="content">
        <el-row v-if="data.third_assessment_report == ''">
          <el-button size="small" @click="generate(1)" type="primary"
            >生成报告</el-button
          >
        </el-row>
        <el-row v-else>
          <el-button size="small" @click="generate(0)" type="primary"
            >下载报告</el-button
          >
          <el-button size="small" @click="generate(1)" type="primary"
            >重新生成</el-button
          >
          <el-upload
            class="upload-demo"
            :action="burl + '/Upload/UploadImage?type=6'"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">重新上传</el-button>
          </el-upload>
        </el-row>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab1 from './table1.vue'
import * as Api from '../../../../../api/business'
import { api } from '../../../../../../../zzbPc/src/assets/js/api'
// import { api } from "../../../../../../../zzbPc/src/assets/js/api";
import { baseURL } from '../../../../../utils/request'
import offer from './offer2.vue'
@Component({
  components: {
    comTab1,
    offer
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) assessment!: any
  @Prop() height!: number
  @Prop() debtor_number!: string
  @Prop() Case_state!: string
  //Watch
  @Watch('assessment', { deep: true, immediate: true })
  assessmentChangeVal(newVal: any, oldVal: any) {
    this.data.assessment = JSON.parse(JSON.stringify(newVal))
    this.data.third_assessment_report =
      'https://file.debteehelper.com' + newVal.third_assessment_report
    // eslint-disable-next-line no-console
    // console.log(this.data.assessment)
    // eslint-disable-next-line no-console
    // console.log(this.data.assessment)
  }
  @Watch('height', { deep: true, immediate: true })
  heightChangeVal(newVal: number, oldVal: number) {
    this.data.height = newVal
  }
  @Watch('debtor_number', { deep: true, immediate: true })
  debtor_numberChangeVal(newVal: string, oldVal: string) {
    this.data.debtor_number = newVal
  }
  // data
  data: any = {
    assessment: {}, //父组件传过来的数据
    height: 0, //侧边栏高度
    active: '', //多选选中
    debtor_number: '',
    options: [
      {
        //发送邮箱
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }
    ],
    value: '', //发送邮件的id和地址
    input: '',
    commission_manage_rate_gf_f: 0, //平台管理费比例 固定+风险 风险
    commission_manage_rate_gf_g: 0, //平台管理费比例 固定+风险 固定
    informationType: false, //基本信息编辑
    winratType: false, //胜诉率内容编辑
    collectionrateType: false, //回款率预估
    costType: false, //费用预估
    offerType: false, //报价
    third_assessment_report: '' //第三方评估报告
  }
  burl: string = ''
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.getAllAdmin()
    this.burl = baseURL
  }

  //回款记录删除
  collectionDel(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  //进本信用信息编辑修改
  informationEdit() {
    if (this.data.informationType) {
      let parmas: any = {
        id: this.data.assessment.informationId,
        debtor_number: this.data.debtor_number
      }
      this.data.assessment.information.forEach((item: any) => {
        item.forEach((item2: any) => {
          parmas[item2.prop] = item2.value
        })
      })
      let self: any = this
      self
        .$confirm('您确定保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          Api.upDataDebtorCredit(parmas).then((res: any) => {
            if (res.state) {
              self.$message.success(res.msg)
              self.data.informationType = !self.data.informationType
            } else {
              self.$message.warning(res.msg)
            }
          })
        })
        .catch(() => {
          self.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    } else {
      // eslint-disable-next-line no-console
      console.log('编辑')
      this.data.informationType = !this.data.informationType
    }
  }
  //胜诉率编辑
  winratEdit() {
    let parmas: any = this.data.assessment.case_winrateData
    parmas['id'] = this.data.assessment.case_winrateId
    parmas['debtor_number'] = this.data.debtor_number
    this.data.assessment.case_winrate.forEach((item: any) => {
      parmas[item.prop] = item.score
    })
    let self: any = this
    self
      .$confirm('您确定保存吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.upDataWinrate(parmas).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
          } else {
            self.$message.warning(res.msg)
          }
        })
        self.data.winratType = !self.data.winratType
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //胜诉率重新计算 calculationWinrates
  winrateCalct() {
    let self: any = this
    self
      .$confirm('您确定重新计算吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.calculationWinrates(self.data.debtor_number).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
            setTimeout(() => {
              self.data.assessment.case_winrateData.assessment_notes =
                res.data.assessment_notes
              self.data.assessment.case_winrateData.evaluation_score =
                res.data.evaluation_score
              self.data.assessment.case_winrateData.win_rate = res.data.win_rate
            }, 1000)
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消重新计算'
        })
      })
  }
  //回款率信息更新
  collectionrateEdit() {
    let parmas1: any = {
      id: this.data.assessment.case_collectData.id,
      debtor_number: this.data.debtor_number,
      case_rating: this.data.assessment.case_collectData.case_rating,
      evaluation_score: this.data.assessment.case_collectData.evaluation_score,
      collection_rate: this.data.assessment.case_collectData.collection_rate,
      assessment_notes: this.data.assessment.case_collectData.assessment_notes
    }
    let parmas2: any = {
      id: this.data.assessment.case_credit_id,
      debtor_number: this.data.debtor_number
    }
    this.data.assessment.case_collectionrate.forEach((item: any) => {
      parmas1[item.prop] = item.score
      if (item.prop2) {
        parmas2[item.prop2] = item.value
      }
    })
    const parmas: any = {
      collectionrates: parmas1,
      credit: parmas2
    }
    let self: any = this
    self
      .$confirm('您确定保存吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.upDataCollectionRate(parmas).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
          } else {
            self.$message.warning(res.msg)
          }
        })
        self.data.collectionrateType = !self.data.collectionrateType
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //计算回款率
  calculationCollection() {
    let self: any = this
    self
      .$confirm('您确定重新计算吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.calculationCollectionRate(self.data.debtor_number).then(
          (res: any) => {
            if (res.state) {
              self.$message.success(res.msg)
              setTimeout(() => {
                Object.keys(self.data.assessment.case_collectData).forEach(
                  (key: string) => {
                    if (res.data[key] != undefined) {
                      self.data.assessment.case_collectData[key] = res.data[key]
                    }
                  }
                )
              }, 1000)
            } else {
              self.$message.warning(res.msg)
            }
          }
        )
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消重新计算'
        })
      })
  }

  //费用预估
  costEdit() {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      litigation_arbitration_fee: this.data.assessment.estimate[0].weight,
      property_preservation_fee: this.data.assessment.estimate[1].weight,
      property_preservation_insurance: this.data.assessment.estimate[2].weight
    }
    Api.costEdit(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.costType = !this.data.costType
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //报价信息修改
  upDataOffer() {
    this.$emit('init', this.data.debtor_number)
  }
  //报价
  selectOffer(parmas: any) {
    Api.selectOffer(parmas).then((res: any) => {
      if (res.state) {
        // this.$message.success(res.msg)
        this.$emit('release')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //预览
  preview() {
    let url: string =
      'http://api1.debteehelper.com/Case/AnalysisReport?debtor_number=' +
      this.data.debtor_number
    let url2: string = this.data.third_assessment_report
    if (url2 == null || url2 == '') {
      window.open(url)
    } else {
      window.open(url2)
    }
  }
  //获取管理员下拉
  getAllAdmin() {
    Api.getAllAdmin().then((res: any) => {
      this.data.options = res.data
    })
  }
  //发送评估报告
  sand() {
    if (this.data.value == '') {
      this.$message.warning('请选择邮件发送人')
      return false
    }
    let arr: any = this.data.value.split(',')
    let parmas: any = {
      admin_id: arr[0], //管理员id
      toAddress: arr[1], //发送邮箱
      debtor_number: this.data.debtor_number //委托编号
    }
    let self: any = this
    self
      .$confirm('您确定发送吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.sandReport(parmas).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  // //生成报告
  // generate(num: number) {
  //   let parmas: any = {
  //     debtor_number: this.data.debtor_number,
  //     type: num
  //   }
  //   Api.DownLoadReport(parmas).then((res: any) => {
  //     if (res.state) {
  //       this.$message.success(res.msg)
  //       // this.$emit('init', this.data.debtor_number)
  //       if (num === 1) {
  //         this.data.third_assessment_report = res.data
  //       } else {
  //         window.open(res.data)
  //       }
  //     } else {
  //       this.$message.warning(res.msg)
  //     }
  //   })
  // }
  // //更新债务人第三方评估报告
  // handleSuccess(file: any) {
  //   let parmas: any = {
  //     debtor_number: this.data.debtor_number,
  //     third_assessment_report: file.data.FileUrl + file.data.FileExtension
  //   }
  //   Api.UpdataReport(parmas).then((res: any) => {
  //     if (res.state) {
  //       this.UploadReport(parmas.third_assessment_report)
  //     } else {
  //       this.$message.warning(res.msg)
  //     }
  //   })
  // }
  // //重新上传文件
  // UploadReport(url: string) {
  //   let parmas: any = {
  //     debtor_number: this.data.debtor_number,
  //     report_path: url
  //   }
  //   Api.UploadReport(parmas).then((res: any) => {
  //     if (res.state) {
  //       this.$message.success(res.msg)
  //       this.$emit('init', this.data.debtor_number)
  //     } else {
  //       this.$message.warning(res.msg)
  //     }
  //   })
  // }

  //选择
  choice(val: string) {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      service_fee_mode: val
    }
    this.selectOffer(parmas)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.assessment-wrap {
  width: 100%;
  overflow-y: auto;
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
    .box {
      display: flex;
      flex-wrap: wrap;
      & > .text {
        width: 33.33%;
        p {
          color: $General-colors;
          font-size: 14px;
          margin: 0;
          margin-bottom: 10px;
          line-height: 32px;
          display: flex;
          & > span:first-child {
            margin-right: 20px;
            font-size: 12px;
            color: $Secondary-text;
            min-width: 60px;
          }
        }
      }
      & > .el-row {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
        span {
          color: #909199;
          font-size: 12px;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #313133;
        }
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .laber {
    font-size: 12px;
    color: #909199;
    padding-right: 20px;
  }
  .value {
    font-size: 14px;
    color: #303133;
  }
  .red {
    color: #ec193a;
  }
  .bold {
    font: bold;
    font-size: 16px;
  }
  .content > .el-row {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
    display: inline-block;
    border-left: 3px solid #e01f3c;
    height: 15px;
    line-height: 15px;
    padding-left: 10px;
  }
  & .upload-demo {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
