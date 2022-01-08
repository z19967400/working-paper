<template>
  <div class="offer2">
    <div class="section">
      <p class="title">平台报价方案_用户（人民币/元)</p>
      <el-divider></el-divider>
      <div class="section-content">
        <!-- 服务费模式与报价选择 -->
        <div class="content-cell">
          <p class="cell-title">
            <span class="yuan"><b>1</b></span
            >服务费模式与报价选择
          </p>
          <div class="panl">
            <div style="display:flex;line-height: 40px;">
              <div
                style="display:flex;margin-right:100px;"
                :style="{ opacity: data.type1 ? 1 : 0 }"
              >
                <span style="font-size:14px;margin-right:20px;"
                  >服务费模式选择:</span
                >
                <el-checkbox-group v-model="data.checkList">
                  <el-checkbox label="1">纯固定</el-checkbox>
                  <el-checkbox label="2">纯风险</el-checkbox>
                  <el-checkbox label="3">固定＋风险</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <el-button
                  style="color:#67C23A;"
                  @click="ServiceFeeQuotation"
                  type="text"
                  >根据胜诉率回款率重新计算报价</el-button
                >
                <el-button
                  style="color:#E6A23C;"
                  @click="table1Edit"
                  type="text"
                  >{{ !data.type1 ? '编辑' : '保存' }}</el-button
                >
              </div>
            </div>
            <el-table
              :data="!data.type1 ? data.tabelData1 : data.tabelData1Edit"
              border
              style="width:750px"
            >
              <el-table-column
                align="center"
                prop="Service_fee_model"
                label="服务费模式"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="Fixed_service_fee"
                label="固定服务费"
              >
                <template slot-scope="scope">
                  <el-input
                    style="width:80%;"
                    v-if="scope.row.id != 1 && data.type1"
                    v-model="scope.row.Fixed_service_fee"
                  ></el-input>
                  <span v-else>{{ ce(scope.row.Fixed_service_fee) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="Risk_service_fee"
                label="风险服务费率"
              >
                <template slot-scope="scope">
                  <el-input
                    style="width:80%;"
                    v-if="scope.row.id != 0 && data.type1"
                    v-model="scope.row.Risk_service_fee"
                  ></el-input>
                  <span v-else>{{ scope.row.Risk_service_fee }}</span>
                  %
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 生成案件评估报告 -->
        <div class="content-cell">
          <p class="cell-title">
            <span span class="yuan">
              <b>2</b>
            </span>
            生成案件评估报告
          </p>
          <div class="panl">
            <p style="line-height: 40px;margin-bottom:10px;">
              {{ toStr(data.case_report_file) || '未生成评估报告' }}
              <el-link
                style="margin-left:20px;position: relative;top:-1px;"
                type="success"
                @click="generate(0)"
                >点击下载</el-link
              >
            </p>
            <div>
              <el-button
                @click="generate(1)"
                style="width:120px;"
                size="small"
                type="primary"
                >{{
                  !data.case_report_file ? '生成案件评估报告' : '重新生成'
                }}</el-button
              >
              <el-upload
                class="upload-demo"
                style="margin-left:50px;width:120px;"
                :action="burl + '/Upload/UploadImage?type=6'"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">上传PDF报告</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <!-- 服务费报价审核 -->
        <div class="content-cell">
          <p class="cell-title">
            <span span class="yuan">
              <b>3</b>
            </span>
            服务费报价审核
          </p>
          <div class="panl">
            <p style="width:1100px;">
              <el-button
                style="float:right;color:#67C23A;"
                @click="openAddAdmin(0)"
                type="text"
              >
                新增审核管理员
              </el-button>
            </p>
            <el-table
              max-height="400px"
              :data="data.tabelData2"
              border
              style="width:1100px;"
            >
              <el-table-column
                prop="real_name"
                label="管理员姓名"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="phone_no"
                label="手机号码"
                width="180"
              ></el-table-column>
              <el-table-column prop="email" label="电子邮箱"> </el-table-column>
              <el-table-column prop="check_staus" label="审核状态" width="120">
                <template slot-scope="scope">
                  <span>{{ getStatus(scope.row.check_staus) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="check_feedback"
                label="审核备注"
                width="250"
              >
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <span v-show="scope.row.check_staus == 1">-</span>
                  <div
                    v-show="
                      scope.row.check_staus == 0 && scope.row.is_ckeck_admin
                    "
                  >
                    <el-button
                      @click="openExamine(scope.row)"
                      style="color:#67C23A;"
                      type="text"
                      >立即审核</el-button
                    >
                    <el-button @click="deleteAdmin(scope.row.id)" type="text"
                      >删除</el-button
                    >
                  </div>

                  <el-button
                    style="color:#67C23A;"
                    v-show="
                      scope.row.check_staus == 0 && !scope.row.is_ckeck_admin
                    "
                    @click="SendNotification(0, scope.row.email)"
                    type="text"
                    >发送审核提醒</el-button
                  >
                  <el-button
                    style="color:#67C23A;"
                    v-show="
                      scope.row.check_staus == 2 && !scope.row.is_ckeck_admin
                    "
                    @click="SendNotification(0, scope.row.email)"
                    type="text"
                    >发送审核提醒</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 用户确认最终服务费报价 -->
        <div class="content-cell">
          <p class="cell-title">
            <span span class="yuan">
              <b>4</b>
            </span>
            用户确认最终服务费报价
          </p>
          <div
            class="panl"
            :style="{
              height: data.CaseQuoted.customer_select == -1 ? '220px' : '350px'
            }"
          >
            <el-steps direction="vertical" :active="data.active">
              <el-step
                title="服务费报价审核"
                :description="
                  data.CaseQuoted.service_fee_check_status
                    ? '审核已通过'
                    : '审核中'
                "
              ></el-step>
              <el-step title="服务费报价发送至用户确认">
                <template slot="description">
                  <span>
                    {{
                      data.CaseQuoted.send_customer_status == 0
                        ? '未发送'
                        : '已发送'
                    }}
                  </span>
                  <el-button
                    style="margin-left:20px;"
                    v-show="data.active == 1"
                    size="mini"
                    type="primary"
                    @click="sandNotice(0)"
                    >立即发送</el-button
                  >
                  <el-button
                    v-show="data.active == 1"
                    size="mini"
                    type="primary"
                    @click="sandNotice(0)"
                    >立即发送并邮件通知</el-button
                  >
                </template>
              </el-step>
              <el-step title="用户选择最终服务费模式">
                <template slot="description">
                  <div v-if="data.CaseQuoted.customer_select == -1">
                    <span>未选择</span>
                    <el-button
                      style="display:block;margin-top:10px;"
                      v-show="data.active == 2"
                      size="mini"
                      type="primary"
                      @click="data.dialogVisible3 = true"
                      >客服替客户选择报价模式</el-button
                    >
                  </div>
                  <div v-else>
                    <el-button
                      style="color:#67C23A;margin-left:640px;"
                      type="text"
                      @click="
                        data.dialogVisible3 = true
                        data.select_type = 1
                      "
                      >重新选择</el-button
                    >
                    <el-table
                      :data="data.tabelData6"
                      border
                      style="width:700px;"
                    >
                      <el-table-column
                        align="center"
                        prop="Service_fee_model"
                        label="服务费模式"
                      >
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="Fixed_service_fee"
                        label="固定服务费"
                      >
                        <template slot-scope="scope">
                          <span>{{ ce(scope.row.Fixed_service_fee) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="Risk_service_fee"
                        label="风险服务费率"
                      >
                        <template slot-scope="scope">
                          <span>{{ scope.row.Risk_service_fee }}</span>
                          %
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;" class="section">
      <p class="title">平台报价方案_律师（人民币/元)</p>
      <el-divider></el-divider>
      <div class="section-content">
        <div class="content-cell">
          <p class="cell-title">
            <span span class="yuan">
              <b>1</b>
            </span>
            律师费报价设置
          </p>
          <div class="panl">
            <p style="color:#606366;width:870px;line-height: 40px;">
              <span>
                欠款本金：
                {{ data.CaseQuoted.currency_name }}
                {{ this.ce(data.CaseQuoted.arrears_principal) }}
                {{ data.CaseQuoted.currency_unit }}
              </span>
              <span style="margin-left:20px;">
                违约金/利息/滞纳金：
                {{ data.CaseQuoted.currency_name }}
                {{ this.ce(data.CaseQuoted.arrears_interest) }}
                {{ data.CaseQuoted.currency_unit }}
              </span>
              <span style="float:right;">
                <el-button
                  @click="lawyerFeeQuotation"
                  style="color:#67C23A"
                  type="text"
                  :disabled="data.CaseQuoted.customer_select == -1"
                >
                  根据平台管理费计算律师费
                </el-button>
                <el-button
                  style="color:#E6A23C"
                  @click="tabelData3Edit"
                  type="text"
                  >{{ data.type2 ? '保存' : '编辑' }}</el-button
                >
              </span>
            </p>
            <el-table border :data="data.tabelData3" style="width:870px;">
              <el-table-column
                align="center"
                prop="Service_fee_model"
                label="服务费模式"
              ></el-table-column>
              <el-table-column align="center" prop="service_fee" label="服务费">
                <template slot-scope="scope">
                  <span v-if="scope.row.Service_fee_model == '固定服务费'">{{
                    ce(scope.row.service_fee)
                  }}</span>
                  <span v-else>{{ ce(scope.row.service_fee) }} %</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="admin_fee"
                label="平台管理费"
                width="280"
              >
                <template slot-scope="scope">
                  <div v-if="data.type2">
                    <el-select
                      style="width:120px;margin-right:10px;"
                      v-show="scope.row.Service_fee_model == '固定服务费'"
                      v-model="scope.row.platform_management_fee_type"
                    >
                      <el-option label="百分比" :value="1"></el-option>
                      <el-option label="固定金额" :value="0"></el-option>
                    </el-select>
                    <el-input
                      style="max-width:120px;"
                      v-model="scope.row.admin_fee"
                    ></el-input>
                    <span v-show="scope.row.Service_fee_model == '风险服务费'"
                      >%</span
                    >
                  </div>

                  <div v-else>
                    <span v-if="scope.row.Service_fee_model == '固定服务费'">
                      <!-- {{
                        `${getBl(scope.row.admin_fee, scope.row.service_fee)}`
                      }} -->
                      {{
                        scope.row.platform_management_fee_type == 0
                          ? '固定金额：'
                          : '百分比：'
                      }}
                      <span v-if="scope.row.platform_management_fee_type == 1">
                        {{
                          scope.row.platform_management_fixed_fee_percentage
                        }}% （{{ ce(scope.row.admin_fee) }}）</span
                      >
                      <span v-else>
                        {{ ce(scope.row.admin_fee) }}（{{
                          scope.row.platform_management_fixed_fee_percentage.toFixed(
                            2
                          )
                        }}%）</span
                      >
                    </span>
                    <span v-else>{{ scope.row.admin_fee }} %</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="lawyer_fee"
                label="最终律师费"
              >
                <template slot-scope="scope">
                  <div v-if="data.type2">
                    <el-input
                      style="width:80%;"
                      v-model="scope.row.lawyer_fee"
                    ></el-input>
                    <span v-show="scope.row.Service_fee_model == '风险服务费'"
                      >%</span
                    >
                  </div>
                  <div v-else>
                    <span v-if="scope.row.Service_fee_model == '固定服务费'">
                      {{ ce(scope.row.lawyer_fee) }}
                    </span>
                    <span v-else>{{ scope.row.lawyer_fee }} %</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="yj_lawyer_fee"
                label="预计律师费"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="data.type2"
                    style="width:80%;"
                    v-model="scope.row.yj_lawyer_fee"
                  ></el-input>
                  <span v-else>{{ ce(scope.row.yj_lawyer_fee) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="section-content">
        <div class="content-cell">
          <p class="cell-title">
            <span span class="yuan">
              <b>2</b>
            </span>
            律师费报价审核
          </p>
          <div class="panl">
            <p style="width:1100px;">
              <el-button
                style="float:right;color:#67C23A;"
                @click="openAddAdmin(1)"
                type="text"
              >
                新增审核管理员
              </el-button>
            </p>
            <el-table
              max-height="400px"
              :data="data.tabelData5"
              border
              style="width:1100px;"
            >
              <el-table-column
                prop="real_name"
                label="管理员姓名"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="phone_no"
                label="手机号码"
                width="180"
              ></el-table-column>
              <el-table-column prop="email" label="电子邮箱"> </el-table-column>
              <el-table-column prop="check_staus" label="审核状态" width="120">
                <template slot-scope="scope">
                  <span>{{ getStatus(scope.row.check_staus) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="check_feedback"
                label="审核备注"
                width="250"
              ></el-table-column>
              <el-table-column align="center" label="操作" width="150">
                <template slot-scope="scope">
                  <span v-show="scope.row.check_staus == 1">-</span>
                  <div
                    v-show="
                      scope.row.check_staus == 0 && scope.row.is_ckeck_admin
                    "
                  >
                    <el-button
                      @click="openExamine(scope.row)"
                      style="color:#67C23A;"
                      type="text"
                      >立即审核</el-button
                    >
                    <el-button @click="deleteAdmin(scope.row.id)" type="text"
                      >删除</el-button
                    >
                  </div>

                  <el-button
                    style="color:#67C23A;"
                    v-show="
                      scope.row.check_staus == 0 && !scope.row.is_ckeck_admin
                    "
                    type="text"
                    @click="SendNotification(1, scope.row.email)"
                    >发送审核提醒</el-button
                  >
                  <el-button
                    style="color:#67C23A;"
                    v-show="
                      scope.row.check_staus == 2 && !scope.row.is_ckeck_admin
                    "
                    @click="SendNotification(1, scope.row.email)"
                    type="text"
                    >发送审核提醒</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="dialog-box1"
      title="新增审核管理员"
      :visible.sync="data.dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-table
        @selection-change="handleSelectionChange"
        :data="data.tableData4"
        ref="multipleTable"
        border
      >
        <el-table-column
          prop="name"
          label="管理员姓名"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="phone_number"
          label="手机号码"
          width="180px"
        ></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddCheckAdminQr">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialog-box2"
      title="审核"
      :visible.sync="data.dialogVisible2"
      width="30%"
      :before-close="handleClose2"
    >
      <div class="box">
        <p>
          <span class="label">状态</span>
          <el-radio-group v-model="data.examineData.check_staus">
            <el-radio :label="0">待审核</el-radio>
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核未通过</el-radio>
          </el-radio-group>
        </p>
        <p>
          <span class="label">反馈</span>
          <el-input
            type="textarea"
            v-model="data.examineData.check_feedback"
          ></el-input>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="data.dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="examineQr">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialog-box2"
      title="选择报价"
      :visible.sync="data.dialogVisible3"
      width="30%"
      :before-close="handleClose3"
    >
      <el-table :data="data.tabelData1" border style="width:750px">
        <el-table-column
          align="center"
          prop="Service_fee_model"
          label="服务费模式"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="Fixed_service_fee"
          label="固定服务费"
        >
          <template slot-scope="scope">
            <span>{{ ce(scope.row.Fixed_service_fee) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="Risk_service_fee"
          label="风险服务费率"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.Risk_service_fee }}%</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-radio v-model="data.radio" :label="scope.row.id">选中</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="offerQr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../../../api/business'
@Component({
  components: {}
})
export default class offer2 extends Vue {
  @Prop() debtor_number!: string
  @Prop() burl!: string
  @Prop() admins!: any
  data: any = {
    checkList: [],
    CaseQuoted: {}, //报价数据
    select_type: 0, //选择报价状态 0选择服务费 1重新选择服务费
    tabelData1: [], //报价选择
    tabelData1Edit: [], //报价编辑
    tabelData2: [], //服务费审核管理员列表
    tabelData5: [], //律师费审核管理员列表
    tabelData3: [], //律师费报价
    tableData4: [], //所有管理员列表(已筛选)
    tableData44: [], //所有管理员列表(未筛选)
    type1: false, //服务费报价编辑状态
    type2: false, //律师费报价编辑状态
    case_report_file: '', //评估报告文件地址
    dialogVisible: false,
    dialogVisible2: false,
    dialogVisible3: false,
    check_type: 0, //新增审核管理员类别 0 服务费审核  1 律师费审核
    admin_id: [], //新增审核管理员ID  选中的管理员列表
    examineData: {
      //审核对象
      debtor_number: '',
      id: 0,
      check_staus: 0,
      check_type: 0,
      check_feedback: ''
    },
    active: 0, //用户确认报价的进度
    tabelData6: [], //用户选择的报价方案
    radio: 0 //选择的报价模式
  }
  @Watch('debtor_number')
  debtorNumberChange(newval: string, oldVal: string) {
    if (newval) {
      this.getTable1()
    }
  }
  @Watch('admins', { deep: true })
  adminsChange(newVal: any, oldVal: any) {
    this.data.tableData44 = newVal
  }
  mounted() {
    // this.getTable1()
  }
  //获取报价
  getTable1() {
    Api.GetCaseQuotedPrice(this.debtor_number).then((res: any) => {
      this.data.checkList = []
      this.data.CaseQuoted = res.data.quoted_price
      this.data.tabelData2 = res.data.check_list_01
      this.data.tabelData5 = res.data.check_list_02
      this.data.case_report_file = res.data.quoted_price.case_report_file
      this.data.radio = res.data.quoted_price.customer_select

      if (res.data.quoted_price.display_fixed_service_fee == 1) {
        this.data.checkList.push('1')
      }
      if (res.data.quoted_price.display_risk_service_fee == 1) {
        this.data.checkList.push('2')
      }
      if (res.data.quoted_price.display_fixed_risk_service_fee == 1) {
        this.data.checkList.push('3')
      }
      this.setData(res.data.quoted_price)
      if (res.data.quoted_price.customer_select != -1) {
        this.data.active = 3
        return false
      }
      if (res.data.quoted_price.send_customer_status != 0) {
        this.data.active = 2
        return false
      }
      if (res.data.quoted_price.service_fee_check_status) {
        this.data.active = 1
        return false
      }
    })
  }
  //报价重新赋值
  setData(res: any) {
    const arr: any = [
      {
        id: 0,
        Service_fee_model: '纯固定',
        Fixed_service_fee: res.fixed_service_fee,
        Risk_service_fee: 0,
        show: res.display_fixed_service_fee
      },
      {
        id: 1,
        Service_fee_model: '纯风险',
        Fixed_service_fee: 0,
        Risk_service_fee: res.risk_service_fee,
        show: res.display_risk_service_fee
      },
      {
        id: 2,
        Service_fee_model: '固定+风险',
        Fixed_service_fee: res.fixed_risk_service_fee_fixed,
        Risk_service_fee: res.fixed_risk_service_fee_risk,
        show: res.display_fixed_risk_service_fee
      }
    ]
    this.data.tabelData1Edit = arr
    this.data.tabelData1 = arr.filter((item: any) => {
      return item.show === 1
    })
    if (this.data.radio != -1) {
      this.data.tabelData6 = this.data.tabelData1.filter((item: any) => {
        return item.id == this.data.radio
      })
    }
    const arr2: any = [
      {
        Service_fee_model: '固定服务费',
        service_fee:
          res.customer_select === 0
            ? res.fixed_service_fee
            : res.customer_select === 2
            ? res.fixed_risk_service_fee_fixed
            : 0,
        admin_fee: res.platform_management_fixed_fee,
        lawyer_fee: res.final_lawyer_fixed_fee,
        yj_lawyer_fee: res.exhibition_lawyer_fixed_fee,
        platform_management_fee_type: res.platform_management_fee_type,
        platform_management_fixed_fee_percentage:
          res.platform_management_fixed_fee_percentage
      },
      {
        Service_fee_model: '风险服务费',
        service_fee:
          res.customer_select === 0
            ? 0
            : res.customer_select === 2
            ? res.fixed_risk_service_fee_risk
            : res.risk_service_fee,
        admin_fee: res.platform_management_risk_fee,
        lawyer_fee: res.final_lawyer_risk_fee,
        yj_lawyer_fee: res.exhibition_lawyer_risk_fee
      }
    ]
    this.data.tabelData3 = arr2
  }
  //转千位符
  ce(num: number) {
    if (num) {
      let str: string = num.toString()
      if (str.indexOf('.') !== -1) {
        //包含小数点
        let str1: string = str.substring(0, str.indexOf('.'))
        let str2: string = str.substring(str.indexOf('.'), str.length)
        if (str2.length >= 3) {
          //小数点后尾数大于等于2
          return parseInt(str1).toLocaleString() + str2.substring(0, 3)
        } else {
          //小数点后尾数小于2
          return parseInt(str1).toLocaleString() + str2 + '0'
        }
      } else {
        //不包含小数点
        return num.toLocaleString()
      }
    } else {
      return num
    }
  }
  //重新计算服务费报价
  ServiceFeeQuotation() {
    Api.CalculationServiceQuotedPrice(this.debtor_number).then((res: any) => {
      if (res.state) {
        this.setData(res.data)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //重新计算律师费报价
  lawyerFeeQuotation() {
    Api.CalculationLawyerFeeQuotedPrice(this.debtor_number).then((res: any) => {
      if (res.state) {
        this.setData(res.data)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //服务费报价编辑
  table1Edit() {
    if (this.data.type1) {
      let parmas: any = {
        debtor_number: this.debtor_number,
        display_fixed_service_fee:
          this.data.checkList.indexOf('1') == -1 ? 0 : 1,
        display_risk_service_fee:
          this.data.checkList.indexOf('2') == -1 ? 0 : 1,
        display_fixed_risk_service_fee:
          this.data.checkList.indexOf('3') == -1 ? 0 : 1,
        fixed_service_fee: this.data.tabelData1Edit[0].Fixed_service_fee,
        risk_service_fee: this.data.tabelData1Edit[1].Risk_service_fee,
        fixed_risk_service_fee_fixed: this.data.tabelData1Edit[2]
          .Fixed_service_fee,
        fixed_risk_service_fee_risk: this.data.tabelData1Edit[2]
          .Risk_service_fee
      }
      Api.SaveCustomerQuotedPrice(parmas).then((res: any) => {
        if (res.state) {
          this.getTable1()
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
    this.data.type1 = !this.data.type1
  }
  //律师费报价编辑
  tabelData3Edit() {
    if (this.data.type2) {
      const parmas: any = {
        debtor_number: this.debtor_number,
        platform_management_fixed_fee:
          this.data.tabelData3[0].platform_management_fee_type == 0
            ? this.data.tabelData3[0].admin_fee
            : 0,
        platform_management_fixed_fee_percentage:
          this.data.tabelData3[0].platform_management_fee_type == 1
            ? this.data.tabelData3[0].admin_fee
            : 0,
        platform_management_fee_type: this.data.tabelData3[0]
          .platform_management_fee_type,
        platform_management_risk_fee: this.data.tabelData3[1].admin_fee,
        final_lawyer_fixed_fee: this.data.tabelData3[0].lawyer_fee,
        final_lawyer_risk_fee: this.data.tabelData3[1].lawyer_fee,
        exhibition_lawyer_fixed_fee: this.data.tabelData3[0].yj_lawyer_fee,
        exhibition_lawyer_risk_fee: this.data.tabelData3[1].yj_lawyer_fee
      }
      Api.SavelawyerQuotedPrice(parmas).then((res: any) => {
        if (res.state) {
          this.getTable1()
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
          this.getTable1()
        }
      })
    }
    this.data.type2 = !this.data.type2
  }
  //重新生成/下载报告
  generate(num: number) {
    let parmas: any = {
      debtor_number: this.debtor_number,
      type: num
    }
    Api.DownLoadReport(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        if (num === 1) {
          this.data.case_report_file = res.data
        } else {
          window.open(res.data)
        }
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    const isJPG: boolean = file.type === 'application/pdf'
    // const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传文件只能是 PDF 格式!')
    }
    // if (!isLt2M) {
    //   this.$message.error('上传头像图片大小不能超过 2MB!')
    // }
    return isJPG
  }
  //上传报告
  handleSuccess(file: any) {
    let parmas: any = {
      debtor_number: this.debtor_number,
      third_assessment_report: file.data.FileUrl + file.data.FileExtension
    }
    Api.UpdataReport(parmas).then((res: any) => {
      if (res.state) {
        this.UploadReport(parmas.third_assessment_report)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //重新上传文件
  UploadReport(url: string) {
    let parmas: any = {
      debtor_number: this.debtor_number,
      report_path: url
    }
    Api.UploadReport(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.getTable1()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //报告地址优化
  toStr(str: string) {
    if (str == null) {
      return ''
    }
    if (str.indexOf('http') != -1) {
      return str.substring(str.indexOf('m') + 1, str.length)
    }
    return str
  }
  //审核状态转译
  getStatus(num: number) {
    let str: string = num == 0 ? '待审核' : num == 1 ? '审核通过' : '审核未通过'
    return str
  }
  //计算平台管理费
  getBl(num1: number, num2: number) {
    if (num1 == 0) {
      return 0
    } else {
      let val: any = num1 / num2
      let num: any = val * 100
      return `${num1}(${parseInt(num)}%)`
    }
  }
  //打开新增审核管理员痰喘
  openAddAdmin(check_type: number) {
    this.data.check_type = check_type
    this.data.dialogVisible = true
    if (check_type == 0) {
      this.data.tableData4 = this.data.tableData44.filter((item: any) =>
        this.data.tabelData2.every((item2: any) => item2.admin_id != item.id)
      )
    } else {
      this.data.tableData4 = this.data.tableData44.filter((item: any) =>
        this.data.tabelData5.every((item2: any) => item2.admin_id != item.id)
      )
    }
  }
  //确认新增审核管理员
  AddCheckAdminQr() {
    let parmas: any = {
      debtor_number: this.debtor_number,
      check_type: this.data.check_type,
      admin_id: this.data.admin_id
    }
    Api.AddCheckAdmin(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.dialogVisible = false
        this.getTable1()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //关闭新增审核管理员弹窗
  handleClose(done: any) {
    const self: any = this
    self.data.admin_id = []
    self.$refs.multipleTable.clearSelection()
    done()
  }
  //关闭审核弹窗
  handleClose2(done: any) {
    done()
  }
  //关闭选择报价弹窗
  handleClose3(done: any) {
    done()
  }
  //管理员选择监听
  handleSelectionChange(val: any) {
    let ids: any = []
    val.forEach((item: any) => {
      ids.push(item.id)
    })
    this.data.admin_id = ids
  }
  //发送报价审核通知
  SendNotification(check_type: number, email: string) {
    const parmas: any = {
      debtor_number: this.debtor_number,
      check_type,
      email
    }
    Api.CheckQuotedPriceNotice(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //立即审核打开弹窗
  openExamine(row: any) {
    this.data.dialogVisible2 = true
    this.data.examineData.debtor_number = this.debtor_number
    this.data.examineData.id = row.id
    this.data.examineData.check_staus = row.check_staus
    this.data.examineData.check_type = row.check_type
    this.data.examineData.check_feedback = row.check_feedback
  }
  //立即审核确认
  examineQr() {
    Api.CheckQuotedPrice(this.data.examineData).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.dialogVisible2 = false
        this.getTable1()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //删除审核管理员
  deleteAdmin(id: number) {
    Api.DeleteCheckAdmin(id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.getTable1()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //发送服务费报价至用户确认
  sandNotice(send_email: number) {
    const parmas: any = {
      debtor_number: this.debtor_number,
      send_email
    }
    Api.SendQuotedPrice(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.getTable1()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //客服替用户选择报价
  offerQr() {
    const parmas: any = {
      debtor_number: this.debtor_number,
      customer_select: this.data.radio,
      select_type: this.data.select_type
    }
    Api.CustomerSelectQuotedPrice(parmas).then((res: any) => {
      if (res.state) {
        this.data.dialogVisible3 = false
        this.$message.success(res.msg)
        this.getTable1()
        this.$emit('init2')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/variables';
.offer2 {
  & > .section {
    & > .title {
      margin: 0;
    }
    & > .section-content {
      & > .content-cell {
        & > .cell-title {
          font-size: 14px;
          & > .yuan {
            display: inline-block;
            border-radius: 50%;
            border: 1px solid #ec193a;
            width: 31px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            margin-right: 10px;
            & > b {
              font-size: 18px;
              color: #ec193a;
            }
          }
        }
        & .panl {
          background: white;
          border-radius: 5px;
          box-shadow: 0px 2px 8px #ccc;
          padding: 20px;
          border: 1px solid #f5f5f5;
          & > p {
            font-size: 14px;
            margin: 0;
          }
          & > .el-steps {
            & .el-step__title {
              font-size: 14px;
            }
            & .el-step__title.is-process {
              color: #606366;
            }
            & .is-finish {
              color: #67c23a;
              border-color: #67c23a;
            }
          }
        }
      }
    }
  }
  & .dialog-box1 {
    & > .el-dialog {
      & .el-dialog__footer {
        text-align: center;
      }
    }
  }
  & .dialog-box2 {
    & > .el-dialog {
      & .el-dialog__body {
        padding: 20px 20px 0 20px;
        & > .box {
          & > p {
            display: flex;
            width: 90%;
            margin: 0 0 20px 0;
            & > .label {
              width: 60px;
              display: inline-block;
            }
            & .el-textarea__inner {
              height: 200px !important;
            }
          }
        }
      }
      & .el-dialog__footer {
        text-align: center;
      }
    }
  }
}
</style>
