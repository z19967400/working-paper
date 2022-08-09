<template>
  <div :style="{ height: data.height + 'px' }" class="caseoverview-wrap">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">基础信息</span>
      </span>
      <el-divider></el-divider>
      <div class="box">
        <div
          v-for="(item, index) in data.caseoverview.information"
          :key="index"
          class="text"
        >
          <p v-for="(item2, index2) in item" :key="index2">
            <span>{{ item2.name }}</span>
            <span v-if="item2.name === '创建人'">
              <el-link @click="toInfo" type="success">
                {{ item2.value }}(ID:{{ data.caseoverview.member_id }})
              </el-link>
            </span>
            <span v-else>{{ item2.value }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">办案事项</span>
      </span>
      <el-divider></el-divider>
      <div class="box">
        <el-row>
          <el-tag
            :key="tag.id"
            v-for="tag in data.caseoverview.matter"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.id)"
          >
            {{ tag.matters_name }}
          </el-tag>
          <el-select
            class="select01"
            size="small"
            ref="saveTagInput"
            v-if="data.inputVisible"
            v-model="data.inputValue"
            placeholder="请选择"
            @change="handleInputConfirm"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.matters_name"
              :value="item.id + ',' + item.matters_name"
            >
            </el-option>
          </el-select>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 新增</el-button
          >
        </el-row>
      </div>
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">专案客服</span>
      </span>
      <el-divider></el-divider>
      <div class="box">
        <el-row>
          <el-radio-group @change="customeRadio" v-model="data.radio">
            <el-radio
              v-for="(item, index) in data.caseoverview.customer"
              :key="index"
              :label="index"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
          <el-select
            class="select02"
            size="small"
            ref="saveTagInput"
            v-if="data.customerVisible"
            v-model="data.addCustomer"
            placeholder="请选择"
            @change="handleInputConfirm2"
          >
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id + ',' + item.name"
            >
            </el-option>
          </el-select>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput2"
            >+ 新增</el-button
          >
        </el-row>
      </div>
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">案件信息</span>
        <span
          @click="data.caseInformation = !data.caseInformation"
          class="edit"
          >{{ data.caseInformation ? '编辑' : '返回' }}</span
        ></span
      >
      <el-divider></el-divider>
      <el-descriptions class="margin-top" :column="3" border>
        <!-- <template slot="extra">
          <el-button
            v-show="!data.caseInformation"
            type="primary"
            @click="saveCaseInfor"
            size="small"
            >保存</el-button
          >
        </template> -->
        <el-descriptions-item
          labelClassName="descriptions-label"
          v-for="(item, index) in data.caseInformation
            ? data.caseDataMatching
            : data.caseDataMatching2"
          :key="index"
          :span="item.width"
          contentClassName="descriptions-value"
        >
          <template slot="label">
            <span :class="item.required ? 'is-required' : 'padding-left'">{{
              item.lable
            }}</span>
          </template>
          <div v-if="!data.caseInformation">
            <el-select
              size="small"
              v-if="
                item.prop == 'currency_id' ||
                  item.prop == 'guarantee_type' ||
                  item.prop == 'debtor_status'
              "
              v-model="item.value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in getTags(item.prop)"
                :key="item.id"
                :label="item.currency_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-else-if="
                item.prop == 'property_clues' ||
                  item.prop == 'available_evidence' ||
                  item.prop == 'entrusted_matters'
              "
              size="small"
              v-model="item.value"
              multiple
              class="multiple-select"
            >
              <el-option
                v-for="item in getTags(item.prop)"
                :key="item.id"
                :label="item.currency_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-radio-group
              v-else-if="item.prop == 'is_dispute'"
              v-model="item.value"
            >
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
            <el-input
              v-else
              size="small"
              class="noBorder"
              v-model="item.value"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div v-else>
            <div
              v-if="
                item.prop == 'property_clues' ||
                  item.prop == 'available_evidence' ||
                  item.prop == 'entrusted_matters'
              "
            >
              <el-tag
                size="small"
                type="info"
                v-for="(item2, index2) in item.value.split(',')"
                :key="index2"
                >{{ item2 }}</el-tag
              >
            </div>
            <span v-else-if="item.prop == 'currency_id'">{{
              getcurrency(item.value)
            }}</span>
            <span
              v-else-if="
                item.prop == 'arrears_principal' ||
                  item.prop == 'arrears_interest'
              "
            >
              {{ qianwei(item.value) }}
            </span>
            <span v-else> {{ item.value }}</span>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div style="text-align: center;margin-top:20px;">
        <el-button
          v-show="!data.caseInformation"
          type="primary"
          plain
          @click="data.caseInformation = !data.caseInformation"
          size="small"
          >取消</el-button
        >
        <el-button
          v-show="!data.caseInformation"
          type="primary"
          @click="saveCaseInfor"
          size="small"
          >保存</el-button
        >
      </div>
    </div>

    <div class="section">
      <span style="margin-top:0;">
        <span class="title">案件管辖法院所在地</span>
        <span
          @click="data.JurisdictionType = !data.JurisdictionType"
          class="edit"
          >{{ data.JurisdictionType ? '编辑' : '返回' }}</span
        ></span
      >
      <el-divider></el-divider>
      <div style="margin-bottom:20px;" class="box">
        <!-- <el-row>
          <el-col :span="8">
            <el-row style="line-height:40px;">
              <span class="laber">案件管辖地区</span>
              <span
                v-if="data.JurisdictionType"
                :class="
                  data.caseoverview.Jurisdiction.jurisdiction_01_select
                    ? 'addressBtn'
                    : ''
                "
                >{{
                  data.caseoverview.Jurisdiction.jurisdiction_01_select
                }}</span
              >
              <span
                style="margin-left:20px;"
                v-if="!data.JurisdictionType"
                class="value"
              >
                <comAddress
                  @emitAddress="getJurisdiction1"
                  :address="data.caseoverview.Jurisdiction.jurisdiction_01_txt"
                ></comAddress>
              </span>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="line-height:40px;">
              <span class="laber">案件管辖地区一</span>
              <span
                v-if="data.JurisdictionType"
                :class="
                  data.caseoverview.Jurisdiction.jurisdiction_02_select
                    ? 'addressBtn'
                    : ''
                "
                >{{
                  data.caseoverview.Jurisdiction.jurisdiction_02_select
                }}</span
              >
              <span
                style="margin-left:20px;"
                v-if="!data.JurisdictionType"
                class="value"
              >
                <comAddress
                  @emitAddress="getJurisdiction2"
                  :address="data.caseoverview.Jurisdiction.jurisdiction_02_txt"
                ></comAddress>
              </span>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="line-height:40px;">
              <span class="laber">其他管辖地区二</span>
              <span
                v-if="data.JurisdictionType"
                :class="
                  data.caseoverview.Jurisdiction.jurisdiction_03_select
                    ? 'addressBtn'
                    : ''
                "
                >{{
                  data.caseoverview.Jurisdiction.jurisdiction_03_select
                }}</span
              >
              <span
                style="margin-left:20px;"
                v-if="!data.JurisdictionType"
                class="value"
              >
                <comAddress
                  @emitAddress="getJurisdiction3"
                  :address="data.caseoverview.Jurisdiction.jurisdiction_03_txt"
                ></comAddress>
              </span>
            </el-row>
          </el-col>
        </el-row> -->
        <div style="width:33.33%">
          <el-row style="line-height:40px;">
            <span class="laber">客服确认管辖地区</span>
            <span
              v-if="data.JurisdictionType"
              :class="
                data.caseoverview.Jurisdiction.jurisdiction_04_select
                  ? 'addressBtn'
                  : ''
              "
              >{{ data.caseoverview.Jurisdiction.jurisdiction_04_select }}</span
            >
            <span
              style="margin-left:20px;"
              v-if="!data.JurisdictionType"
              class="value"
            >
              <comAddress
                @emitAddress="getJurisdiction4"
                :address="data.caseoverview.Jurisdiction.jurisdiction_04_txt"
              ></comAddress>
            </span>
            <el-button
              style="margin-left:20px;"
              v-show="!data.JurisdictionType"
              @click="saveJurisdiction"
              size="small"
              type="primary"
              >保存</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">债权人</span>
      </span>
      <el-divider></el-divider>
      <!-- <div class="box">
        <div v-for="(item, index) in data.caseoverview.creditor" :key="index" class="text">
          <p v-for="(item2, index2) in item" :style="{ width: item2.width }" :key="index2">
            <span>{{ item2.name }}</span>
            <span>{{ item2.value }}</span>
          </p>
        </div>
      </div> -->
      <creditor
        :burl="burl"
        @init="init"
        @deleteSqAdmin="deleteSqAdmin"
        :adminList="data.caseoverview.creditor_admin"
        :Creditors="data.caseoverview.creditor"
      ></creditor>
    </div>
    <div class="section">
      <!-- <span style="margin-top:0;">
        <span class="title">后台备注</span>
        <span @click="data.textarea = !data.textarea" class="edit">{{
          data.textarea ? '编辑' : '返回'
        }}</span></span
      >
      <el-divider></el-divider>
      <div class="box">
        <el-row style="width:100%;">
          <el-col :span="1">
            <span style="color:#909199;font-size:12px;">备注</span>
          </el-col>
          <el-col v-if="data.textarea" :span="12">
            <p
              v-html="data.caseoverview.textarea"
              style="font-size:14px;color:#303133;margin:0;white-space: pre-line;"
            ></p>
          </el-col>
          <el-col v-else :span="12">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="data.caseoverview.textarea"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row v-if="!data.textarea" style="width:100%;margin-top:20px;">
          <el-col :span="1"><span style="opacity:0;">111</span></el-col>
          <el-col :span="4">
            <el-button size="small" @click="upRemarks" type="primary" plain
              >保存</el-button
            >
          </el-col>
        </el-row>
      </div> -->
      <remark :id="this.$route.params.number" :remarks_type="5"></remark>
    </div>
    <div v-show="data.caseoverview.close_case_remarks" class="section">
      <span style="margin-top:0;">
        <span class="title">结案备注</span>
        <span
          @click="data.close_case_remarks = !data.close_case_remarks"
          class="edit"
          >{{ data.close_case_remarks ? '编辑' : '返回' }}</span
        ></span
      >
      <el-divider></el-divider>
      <div class="box">
        <el-row style="width:100%;">
          <el-col :span="1">
            <span style="color:#909199;font-size:12px;">备注</span>
          </el-col>
          <el-col v-if="data.close_case_remarks" :span="12">
            <p
              v-html="data.caseoverview.close_case_remarks"
              style="font-size:14px;color:#303133;margin:0;white-space: pre-line;"
            ></p>
          </el-col>
          <el-col v-else :span="12">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="data.caseoverview.close_case_remarks"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row
          v-if="!data.close_case_remarks"
          style="width:100%;margin-top:20px;"
        >
          <el-col :span="1"><span style="opacity:0;">111</span></el-col>
          <el-col :span="4">
            <el-button size="small" @click="upRemarks2" type="primary" plain
              >保存</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 新增回款记录 -->
    <el-dialog title="新增回款记录" :visible.sync="data.addCollection">
      <addFrom></addFrom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab1 from './table1.vue'
import addFrom from './from1.vue'
import { comAddress } from '../../../../../components/index'
import * as Api from '../../../../../api/business'
import { api } from '../../../../../../../zzbPc/src/assets/js/api'
import creditor from './creditor/creditor.vue'
import { baseURL } from '../../../../../utils/request'
import * as Api2 from '../../../../../api/user'
import remark from '../../../../../components/remark/remark.vue'
import {
  caseData,
  guarantee_types,
  debtor_statuss,
  property_cluess,
  available_evidences,
  entrusted_matterss
} from './caseDataType'
@Component({
  components: {
    comTab1,
    addFrom,
    comAddress,
    creditor,
    remark
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) caseoverview!: any
  @Prop() height!: number
  @Prop() debtor_number!: number
  //Watch
  @Watch('caseoverview', { deep: true, immediate: true })
  caseoverviewChangeVal(newVal: any, oldVal: any) {
    // this.$nextTick(() => {
    this.data.caseoverview = newVal
    if (newVal.caseInformation) {
      const debtor_type: string = newVal.caseInformation.debtor_type
      this.data.debtor_type = debtor_type
      const arr: any = caseData.filter((item: any) => {
        return item.type == debtor_type || item.type == 'Creditor_states'
      })
      arr.forEach((item: any) => {
        item.value = newVal.caseInformation[item.prop] || '-'
      })
      this.data.caseDataMatching = JSON.parse(JSON.stringify(arr))
      this.data.caseDataMatching2 = JSON.parse(JSON.stringify(arr))
      this.data.caseDataMatching2.forEach((item: any) => {
        if (
          item.prop == 'property_clues' ||
          item.prop == 'available_evidence' ||
          item.prop == 'entrusted_matters'
        ) {
          if (item.value != '-') {
            item.value = item.value.split(',')
          } else {
            item.value = []
          }
        }
      })
    }
    for (let index = 1; index < 5; index++) {
      if (
        newVal.Jurisdiction[`jurisdiction_0${index}_txt`] !== null &&
        newVal.Jurisdiction[`jurisdiction_0${index}_txt`] !== undefined
      ) {
        this.data.JurisdictionData[`jurisdiction_0${index}_country`] =
          newVal.Jurisdiction[`jurisdiction_0${index}_txt`][0]
        this.data.JurisdictionData[`jurisdiction_0${index}_province`] =
          newVal.Jurisdiction[`jurisdiction_0${index}_txt`][1]
        this.data.JurisdictionData[`jurisdiction_0${index}_city`] =
          newVal.Jurisdiction[`jurisdiction_0${index}_txt`][2]
        this.data.JurisdictionData[`jurisdiction_0${index}_area`] =
          newVal.Jurisdiction[`jurisdiction_0${index}_txt`][3]
      }
    }

    let customerIndex: number = 0
    newVal.customer.forEach((item: any, index: number) => {
      if (item.is_main == 1) {
        customerIndex = index
      }
    })
    this.data.radio = customerIndex
    // })
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
    debtor_number: '', //债务编号
    debtor_type: '', //债务人类别
    caseoverview: {}, //父组件传过来的数据
    inputVisible: false, //办案事项新增按钮控制显隐
    inputValue: '', //办案事项新增内容
    radio: 0, //专案客服主客服选择值
    addCustomer: '', //专案客服新增内容
    sendQuote: '', //发送报价的内容
    customerVisible: false, //新增客服按钮控制显隐
    height: 0, //侧边栏高度
    caseInformation: true, //案件信息编辑状态
    caseData: true, //案件数据编辑状态
    addCollection: false, //新增回款记录弹窗是否显示
    textarea: true, //后台备注编辑状态
    close_case_remarks: true, //结案备注编辑状态
    JurisdictionType: true, //辖区编辑状态
    caseDataMatching: [], // //案件信息
    caseDataMatching2: [], //案件信息编辑区
    JurisdictionData: {
      debtor_number: '',
      jurisdiction_01_area: '',
      jurisdiction_01_city: '',
      jurisdiction_01_country: '',
      jurisdiction_01_province: '',
      jurisdiction_02_area: '',
      jurisdiction_02_city: '',
      jurisdiction_02_country: '',
      jurisdiction_02_province: '',
      jurisdiction_03_area: '',
      jurisdiction_03_city: '',
      jurisdiction_03_country: '',
      jurisdiction_03_province: '',
      jurisdiction_04_area: '',
      jurisdiction_04_city: '',
      jurisdiction_04_country: '',
      jurisdiction_04_province: ''
    } //辖区地址数据
  }
  options: any = [] //办案事项下拉
  options2: any = [] //管理员(客服)下拉
  options3: any = [] //发送报价
  currencys: any = [] //欠款币种
  burl: any = ''
  created() {
    this.burl = baseURL
  }

  activated() {
    //
  }

  mounted() {
    this.getAllMatters()
    this.getAllAdmin()
    this.getCurrencys()
  }
  //删除办案事项
  handleClose(tag: any) {
    let parmas: any = {
      id: tag,
      debtor_number: this.data.debtor_number,
      flow_id: 0
    }
    Api.editMatters(parmas).then((res: any) => {
      if (res.state) {
        // this.data.caseoverview.matter.splice(
        //   this.data.caseoverview.matter.indexOf(tag),
        //   1
        // )
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //显示办案事项新增输入框
  showInput() {
    let self: any = this
    self.data.inputVisible = true
    // self.$nextTick(() => {
    //   self.$refs.saveTagInput.$refs.input.focus();
    // });
  }
  //显示专属客服新增输入框
  showInput2() {
    this.data.customerVisible = true
  }
  //新增办案事项
  handleInputConfirm() {
    let self: any = this
    let arr: any = self.data.inputValue.split(',')
    let inputValue: any = {
      id: arr[0],
      matters_name: arr[1]
    }
    let addStatus: boolean = true
    self.data.caseoverview.matter.forEach((item: any) => {
      if (item.matters_name == inputValue.matters_name) {
        addStatus = false
      }
    })
    if (inputValue) {
      if (addStatus) {
        // self.data.caseoverview.matter.push(inputValue)
        self.editMatters(inputValue.id)
      } else {
        self.$message.warning('办案事项不能重复添加')
      }
    }
    self.data.inputVisible = false
    self.data.inputValue = ''
  }
  //新增专属客服
  handleInputConfirm2() {
    let self: any = this
    let arr: any = self.data.addCustomer.split(',')
    let inputValue: any = {
      id: arr[0],
      name: arr[1]
    }
    let addStatus: boolean = true
    self.data.caseoverview.customer.forEach((item: any) => {
      if (item.name == inputValue.name) {
        addStatus = false
      }
    })
    if (inputValue) {
      if (addStatus) {
        self.addCustome(inputValue)
      } else {
        self.$message.warning('专属客服不能重复添加')
      }
    }
    self.data.customerVisible = false
    self.data.addCustomer = ''
  }
  //回款记录删除
  collectionDel(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  //保存辖区地址
  saveJurisdiction() {
    this.data.JurisdictionData.debtor_number = this.data.debtor_number
    Api.editJurisdiction(this.data.JurisdictionData).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.JurisdictionType = !this.data.JurisdictionType
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  // 删除授权管理员
  deleteSqAdmin(row: any) {
    Api2.deletCreditorAdmin(row.creditor_admin_id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  init() {
    this.$emit('init')
  }
  //辖区子组件返值
  // getJurisdiction1(data: any) {
  //   // this.data.JurisdictionData.jurisdiction_01_txt = this.data.caseoverview.Jurisdiction.jurisdiction_01_txt
  //   Object.keys(data).forEach((key: string) => {
  //     if (data[key] != undefined) {
  //       this.data.JurisdictionData[
  //         'jurisdiction_01_' + (key == 'county' ? 'area' : key)
  //       ] = data[key]
  //     }
  //   })
  // }
  // getJurisdiction2(data: any) {
  //   // this.data.JurisdictionData.jurisdiction_02_txt = this.data.caseoverview.Jurisdiction.jurisdiction_02_txt
  //   Object.keys(data).forEach((key: string) => {
  //     if (data[key] != undefined) {
  //       this.data.JurisdictionData[
  //         'jurisdiction_02_' + (key == 'county' ? 'area' : key)
  //       ] = data[key]
  //     }
  //   })
  // }
  // getJurisdiction3(data: any) {
  //   // this.data.JurisdictionData.jurisdiction_03_txt = this.data.caseoverview.Jurisdiction.jurisdiction_03_txt
  //   Object.keys(data).forEach((key: string) => {
  //     if (data[key] != undefined) {
  //       this.data.JurisdictionData[
  //         'jurisdiction_03_' + (key == 'county' ? 'area' : key)
  //       ] = data[key]
  //     }
  //   })
  // }
  getJurisdiction4(data: any) {
    // this.data.JurisdictionData.jurisdiction_03_txt = this.data.caseoverview.Jurisdiction.jurisdiction_03_txt
    Object.keys(data).forEach((key: string) => {
      if (data[key] != undefined) {
        this.data.JurisdictionData[
          'jurisdiction_04_' + (key == 'county' ? 'area' : key)
        ] = data[key]
      }
    })
  }
  //获取所有办案事项
  getAllMatters() {
    Api.getAllMatters().then((res: any) => {
      this.options = res.data
    })
  }
  //获取管理员下拉
  getAllAdmin() {
    Api.getAllAdmin().then((res: any) => {
      this.options2 = res.data
    })
  }
  //获取币种下拉
  getCurrencys() {
    Api.getCurrency().then((res: any) => {
      this.currencys = res.data
    })
  }

  //修改办案事项
  editMatters(id: any) {
    let parmas: any = {
      id: '',
      debtor_number: this.data.debtor_number,
      flow_id: id || 0
    }
    Api.editMatters(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //添加专案客服
  addCustome(value: any) {
    let self: any = this
    let parmas: any = {
      admin_id: value.id,
      debtor_number: self.data.debtor_number
    }
    Api.settingCustomer(parmas).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg)
        value.id = res.data
        self.data.caseoverview.customer.push(value)
        if (self.data.caseoverview.customer.length == 1) {
          self.settingZhuCustomer(res.data)
        }
      } else {
        self.$message.warning(res.msg)
      }
    })
  }
  //设置主客服
  settingZhuCustomer(id: any) {
    let parmas: any = {
      id: id,
      debtor_number: this.data.debtor_number
    }
    Api.settingZhuCustomer(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success('主客服设置成功')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //客服选择
  customeRadio(e: any) {
    let id: any = this.data.caseoverview.customer[e].id
    this.settingZhuCustomer(id)
  }
  //选择送报价目标
  handleInputConfirm3(e: any) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
  //更新后台备注
  upRemarks() {
    let prams: any = {
      debtor_number: this.data.debtor_number,
      back_remarks: this.data.caseoverview.textarea
    }
    Api.updataCaseRemarks(prams).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.textarea = !this.data.textarea
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  upRemarks2() {
    let prams: any = {
      debtor_number: this.data.debtor_number,
      close_case_remarks: this.data.caseoverview.close_case_remarks
    }
    Api.UpdateCloseCaseRemarks(prams).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.close_case_remarks = !this.data.close_case_remarks
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //保存案件基础信息
  saveCaseInfor() {
    let self: any = this
    let isOk: boolean = true
    let matching: any = {}
    const arr: any = self.data.caseDataMatching2
    arr.forEach((item: any) => {
      if (
        item.prop == 'property_clues' ||
        item.prop == 'available_evidence' ||
        item.prop == 'entrusted_matters'
      ) {
        matching[item.prop] = item.value.toString()
      } else {
        matching[item.prop] = item.value
      }
      if (item.required && item.value == '') {
        isOk = false
      }
    })
    if (!isOk) {
      self.$message.warning('必填项不得为空')
      return false
    }
    matching['debtor_number'] = this.data.debtor_number
    matching['debtor_type'] = this.data.debtor_type
    Api.CasesUpdateDebtor(matching).then((res: any) => {
      if (res.state) {
        self.data.caseInformation = !self.data.caseInformation
        self.$message.success(res.msg)
        // this.data.caseDataMatching = JSON.parse(
        //   JSON.stringify(this.data.caseDataMatching2)
        // )
        this.$emit('init')
      } else {
        self.$message.warning(res.msg)
      }
    })
  }
  //获取币种id对应显示值
  getcurrency(id: any) {
    let list: any = this.currencys
    let value: string = ''
    let newList: any = list.filter((item: any) => {
      return item.id == id
    })
    if (newList.length == 0) {
      value = '暂无'
    } else {
      value = newList[0].currency_name
    }
    return value
  }
  toInfo() {
    this.$emit('toInfo')
  }
  //千位符
  qianwei(num: number) {
    let value = num.toString()
    if (num) {
      if (value.indexOf('.') == -1 && value !== '-') {
        return num.toLocaleString() + '.00'
      } else {
        return num.toLocaleString()
      }
    } else {
      return num
    }
  }
  //下拉选项

  getTags(prop: string) {
    let collection_scene: string = this.data.caseoverview.information[2][0]
      .value //债务类型
    if (prop == 'currency_id') {
      return this.currencys
    } else if (prop == 'guarantee_type') {
      if (this.data.debtor_type == 'Creditor_states_0') {
        return guarantee_types.case0
      } else {
        return guarantee_types.case1
      }
    } else if (prop == 'debtor_status') {
      if (this.data.debtor_type == 'Creditor_states_0') {
        return debtor_statuss.case0
      } else {
        return debtor_statuss.case1
      }
    } else if (prop == 'property_clues') {
      return property_cluess
    } else if (prop == 'available_evidence') {
      if (collection_scene == '企业应收账款') {
        return available_evidences.case0
      } else {
        return available_evidences.case1
      }
    } else {
      return entrusted_matterss
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.caseoverview-wrap {
  width: 100%;
  overflow-y: auto;
  & > .section {
    margin-bottom: 20px;
    padding-right: 20px;
    & > span:first-child {
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
    & .box {
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
      }
    }
    & > .el-descriptions {
      width: 100%;
      min-width: 1000px;
      margin: auto;
      & .descriptions-label {
        width: 250px;
        & > .is-required::before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
        & > .padding-left {
          padding-left: 10px;
        }
      }
      & .descriptions-value {
        min-width: 250px;
        & .noBorder {
          & input {
            border: none;
          }
        }
        & .el-tag {
          font-size: 14px;
          color: #606266;
        }
        & > div {
          & > .multiple-select {
            width: 100%;
          }
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
    font-size: 14px;
    color: #909199;
    // margin-right: 20px;
  }
  .value {
    font-size: 14px;
    color: #303133;
    display: inline-block;
  }
  .select01 {
    margin-left: 20px;
  }
  .select02 {
    margin-left: 20px;
  }
  .addressBtn {
    margin-left: 20px;
    background: #ec193a;
    color: white;
    font-size: 12px;
    padding: 4px 8px;
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
  & .el-cascader {
    width: 250px;
  }
}
</style>
