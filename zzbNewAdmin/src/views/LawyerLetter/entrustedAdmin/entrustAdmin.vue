<template>
  <div class="entrustAdmin-wrap">
    <div class="entrustAdmin-box">
      <div :style="{ height: data.labers.length * 40 + 'px' }" class="left">
        <div class="text">
          <div
            v-for="(item, index) in data.labers"
            :key="index"
            :class="{ act: index == data.actIndex }"
            @click="laberClick(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="shuxian-box">
          <div
            :style="{
              transform: ' translateY(' + data.actIndex * 40 + 'px)'
            }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div ref="right" :style="{ height: height + 'px' }" class="right">
        <div ref="section0" class="section">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 0 }">
            <span class="title">委托概况</span>
          </span>
          <el-divider></el-divider>
          <div class="box teshu">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p v-for="(item2, index2) in item" :key="index2">
                <span>{{ item2.name }}</span>
                <span v-if="item2.name == '创建人'"
                  ><el-link
                    :underline="false"
                    @click="toInfo"
                    style="color:#409eff;"
                    type="success"
                    >{{ item2.value }} （ ID:{{ data.member_id }} ）</el-link
                  >
                </span>
                <span v-else-if="item2.name == '创建时间'">
                  {{ item2.value }}（{{
                    data.m_type == 'VIP' ? 'PC' : '移动端'
                  }}）
                </span>
                <span v-else-if="item2.name == '债务类别'">
                  {{ item2.value }}({{
                    data.creditor_type == 'Creditor_states_0'
                      ? '企业债务人'
                      : '个人债务人'
                  }})
                </span>
                <span v-else>{{ item2.value }}</span>
              </p>
            </div>
          </div>
        </div>
        <div ref="section1" class="section">
          <span :class="{ act: data.actIndex == 1 }">
            <span class="title">执行进度</span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <table1
              @editSandTime="editSandTime"
              :tableOption="data.implementOption"
              :tableData="data.implementList"
              :audit_status="data.audit_status"
            ></table1>
          </div>
        </div>
        <div ref="section2" class="section">
          <span :class="{ act: data.actIndex == 2 }">
            <span class="title">债务人</span>
            <a
              style="float: right;font-size:12px;color:#55a3f4;margin-left:20px; position: relative;top:7px;"
              v-show="data.lawyer_letter_file"
              :href="data.lawyer_letter_file"
              >委托源文件下载</a
            >
            <el-button
              @click="DownLoadEMS"
              style="color:#67C23A;float:right;"
              type="text"
              size="small"
              >快递信息下载</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="serchOption1">
            <el-button
              style="margin-left:10px;"
              @click="table2Reset"
              size="small"
              >重置</el-button
            >
            <el-button
              @click="GetDebtors(1)"
              type="primary"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-input
              v-model="data.getDebtorParmas.phone_number"
              placeholder="手机号码"
              size="small"
            ></el-input>
            <el-input
              v-model="data.getDebtorParmas.debtor_name"
              placeholder="债务人名称"
              size="small"
            ></el-input>
            <el-input
              v-model="data.getDebtorParmas.debtor_number"
              placeholder="委托编号"
              size="small"
            ></el-input>
            <el-input
              v-model="data.getDebtorParmas.receiving_name"
              placeholder="收件人"
              size="small"
            ></el-input>
          </div>
          <div class="box">
            <table2
              :loading="table2Loading"
              :tableOption="data.obligorOption"
              @tongzhi="tongzhi"
              :tableData="data.obligorList"
              @stop="taskStop"
              @info="openInfo"
              @edit="openEdit"
              @address="addressEdit"
              @load="listLoad1"
            ></table2>
          </div>
        </div>
        <div ref="section3" class="section">
          <span :class="{ act: data.actIndex == 3 }">
            <span class="title">债务明细</span>
          </span>
          <div class="serchOption1">
            <el-button
              style="margin-left:10px;"
              @click="table3Reset"
              size="small"
              >重置</el-button
            >
            <el-button
              @click="debtDetails(1)"
              type="primary"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-input
              v-model="data.debtDetailsParmas.debtor_number"
              placeholder="委托编号"
              size="small"
            ></el-input>
          </div>
          <el-divider></el-divider>
          <div class="box">
            <table3
              :loading="table3Loading"
              :tableOption="data.debtDetailsOption"
              :states="data.shenhe.audit_status"
              :tableData="data.debtDetailsList"
              @edit="debtDetailsEdit"
              @load="listLoad2"
            ></table3>
          </div>
        </div>
        <div ref="section4" class="section">
          <span :class="{ act: data.actIndex == 4 }">
            <span class="title">债务反馈</span>
          </span>
          <el-divider></el-divider>
          <div class="serchOption1">
            <el-button
              style="margin-left:10px;"
              @click="table4Reset"
              size="small"
              >重置</el-button
            >
            <el-button
              @click="getObligorList(1)"
              type="primary"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-input
              v-model="data.getObligorListParmas.debtor_name"
              placeholder="债务人名称"
              size="small"
            ></el-input>
            <el-input
              v-model="data.getObligorListParmas.debtor_number"
              placeholder="委托编号"
              size="small"
            ></el-input>
          </div>
          <div class="box">
            <table4
              :loading="table4Loading"
              :obligorList="data.obligorList"
              @init="init"
              :tableOption="data.feedbackOption"
              :tableData="data.feedbackList"
              @load="listLoad3"
            ></table4>
          </div>
        </div>
        <div ref="section5" class="section">
          <span :class="{ act: data.actIndex == 5 }">
            <span class="title">收款信息</span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div style="width:100%;">
              <el-table :data="data.collection_account">
                <el-table-column label="对公转账">
                  <el-table-column
                    label="收款户名"
                    prop="payee_account_name"
                  ></el-table-column>
                  <el-table-column
                    label="收款账号"
                    prop="collection_account_number"
                  ></el-table-column>
                  <el-table-column
                    label="收款银行全称"
                    prop="bank_full_name"
                  ></el-table-column>
                  <el-table-column
                    label="银行行号"
                    prop="bank_code"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="支付宝转账">
                  <el-table-column
                    label="支付宝账户"
                    prop="alipay_account"
                  ></el-table-column>
                  <el-table-column
                    label="手机号码"
                    prop="alipay_phone_number"
                  ></el-table-column>
                </el-table-column>
                <el-table-column prop="payment_remarks" label="付款备注">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div ref="section6" class="section">
          <span :class="{ act: data.actIndex == 6 }">
            <span class="title">律师函署名</span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div style="100%">
              <el-row>
                <el-col :span="2">
                  <span style="font-size:12px;color:#909399;line-height: 32px;"
                    >快捷设置</span
                  >
                </el-col>
                <el-col :span="6">
                  <el-select
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data.name"
                    placeholder="请选择律师"
                  >
                    <el-option
                      v-for="item in Signature.lawyers"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data.phone1"
                    placeholder="请选择联系方式1"
                  >
                    <el-option
                      v-for="item in Signature.phones"
                      :key="item.value"
                      :label="item.label + '_' + item.value"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data.phone2"
                    placeholder="请选择联系方式2"
                  >
                    <el-option
                      v-for="item in Signature.phones"
                      :key="item.value"
                      :label="item.label + '_' + item.value"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    @click="lawyerSelect"
                    size="small"
                    type="primary"
                    >确定</el-button
                  >
                  <el-button
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    @click="lawyerReset"
                    size="small"
                    type="primary"
                    >重置</el-button
                  >
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="2">
                  <span style="font-size:12px;color:#909399;line-height: 32px;"
                    >律师名称</span
                  >
                </el-col>
                <el-col :span="6">
                  <el-input
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data2.lawyer_name"
                    placeholder="请输入律师名称"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data2.phone_number_01"
                    placeholder="请输入律师电话01"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    style="width:90%;"
                    size="small"
                    v-model="Signature.data2.phone_number_02"
                    placeholder="请输入律师电话02"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button
                    :disabled="data.shenhe.audit_status == 'Audit_states_2'"
                    size="small"
                    @click="lawyerSignaSave"
                    type="primary"
                    >保存</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div ref="section7" class="section">
          <span :class="{ act: data.actIndex == 7 }">
            <span class="title">债权人</span>
          </span>
          <el-divider></el-divider>
          <creditor
            :burl="burl"
            @init="init"
            :adminList="data.creditor_admin"
            @deleteSqAdmin="deleteSqAdmin"
            :Creditors="data.creditorList"
          ></creditor>
        </div>
        <div ref="section8" class="section">
          <span :class="{ act: data.actIndex == 8 }">
            <span class="title">支付信息</span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-descriptions
              style="width:100%;"
              direction="vertical"
              :column="6"
              border
            >
              <el-descriptions-item label="支付状态">{{
                data.payment.pay_status
              }}</el-descriptions-item>
              <el-descriptions-item label="总金额">{{
                thousandBitSeparator(data.payment.total_amount)
              }}</el-descriptions-item>
              <el-descriptions-item label="应付金额">{{
                thousandBitSeparator(data.payment.paid_amount)
              }}</el-descriptions-item>
              <el-descriptions-item label="支付方式">
                {{ data.payment.pay_method_name }}
              </el-descriptions-item>
              <el-descriptions-item label="流水号">
                {{ data.payment.pay_platform_number }}</el-descriptions-item
              >
              <el-descriptions-item label="账单编号">
                {{ data.payment.bill_number }}</el-descriptions-item
              >
            </el-descriptions>
          </div>
        </div>
        <div ref="section9" class="section">
          <span :class="{ act: data.actIndex == 9 }">
            <span class="title">审核/反馈</span>
          </span>
          <el-divider></el-divider>
          <div style="width:100%;" class="box">
            <el-form
              style="width:100%;"
              :model="data.shenhe"
              label-width="60px"
            >
              <el-form-item label="状态">
                <el-radio-group v-model="data.shenhe.audit_status">
                  <el-radio label="Audit_states_0">待审核</el-radio>
                  <el-radio label="Audit_states_1">审核未通过</el-radio>
                  <el-radio label="Audit_states_2">审核已通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <span
                style="color:#ec193a;font-size:12px;margin-left:60px;margin-bottom:10px;display:block;"
                >此处反馈将直接反馈给用户</span
              >
              <el-form-item label="反馈">
                <el-input
                  style="width:80%;"
                  type="textarea"
                  :rows="8"
                  v-model="data.shenhe.desc"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="beizhu" plain size="small" type="primary"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div ref="section10" class="section">
          <!-- <span :class="{ act: data.actIndex == 10 }">
            <span class="title">后台备注</span>
          </span> -->

          <remark
            :class="{ act: data.actIndex == 10 }"
            :id="this.$route.params.id"
            :remarks_type="4"
          ></remark>
        </div>
        <div ref="section11">
          <span :class="{ act: data.actIndex == 11 }">
            <span class="title">操作日志</span>
          </span>
          <el-divider></el-divider>
          <div class="block">
            <span
              style="color:#909399;font-size:14px;"
              v-show="data.ai_log == 0"
              >暂无日志</span
            >
            <el-timeline
              v-for="(item, index) in data.ai_log"
              :key="index"
              style="padding-left:0;margin-top:20px;"
            >
              <el-timeline-item :timestamp="item.create_time" placement="top">
                <el-card>
                  <h5>{{ item.operation_content }}</h5>
                  <p>{{ item.admin_name }} 提交于 {{ item.create_time }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
    <div
      class="zhezhao"
      @click="
        data.visible = false
        data.editShow = false
      "
      v-show="data.visible || data.editShow"
    ></div>
    <el-popover
      :title="data.infoTitle"
      popper-class="editData"
      v-model="data.visible"
    >
      <span @click="close" class="el-icon-close close"></span>
      <comInfo
        :info="info"
        :loading="data.loading"
        :infoData="infoData2"
        :actName="data.actName"
        @nameWatch="nameWatch"
      ></comInfo>
    </el-popover>
    <el-popover
      title="债务人编辑"
      popper-class="editData obligor"
      v-model="data.editShow"
    >
      <span @click="data.editShow = false" class="el-icon-close close"></span>
      <comEdit :info="editData" @edit="editSubmit" @close="editClose"></comEdit>
    </el-popover>
    <el-popover
      title="债务明细编辑"
      popper-class="editData obligor"
      v-model="data.detailedShow"
    >
      <span
        @click="data.detailedShow = false"
        class="el-icon-close close"
      ></span>
      <el-input v-model="detailed" placeholder="请输入内容"></el-input>
      <el-button style="margin-top:20px;" @click="detailedSave" type="primary"
        >保存</el-button
      >
    </el-popover>
    <div class="btn-box">
      <!-- <el-button size="small" type="success">下载催收报告</el-button>
        <el-button el-button size="small" type="success">下载快递信息</el-button> -->
      <el-button size="small" @click="revoke" plain type="primary"
        >返回
      </el-button>
      <el-button
        :disabled="data.executing_states != 'AI_State_1'"
        size="small"
        @click="entrustRevoke"
        plain
        type="primary"
        >撤销</el-button
      >
      <el-button
        v-show="data.executing_states == 'AI_State_2'"
        size="small"
        @click="entrustStop"
        type="primary"
        >终止</el-button
      >
      <el-button
        size="small"
        :disabled="
          data.executing_states != 'AI_State_0' &&
            data.executing_states != 'AI_State_1' &&
            data.executing_states != 'AI_State_6'
        "
        @click="entrustDelet"
        type="primary"
        >删除</el-button
      >
    </div>
    <el-dialog title="短信通知" width="35%" :visible.sync="tongzhiTost">
      <div class="info-box">
        <el-row>
          <el-col :span="5">
            <span style="line-height: 40px;display:inline-block"
              >债务人名称</span
            >
          </el-col>
          <el-col :span="16">
            <el-input
              v-model="tzData.debtor_name"
              placeholder="请输入债务人名称"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5">
            <span style="line-height: 40px;display:inline-block"
              >债权人联系手机</span
            >
          </el-col>
          <el-col :span="16">
            <el-input
              v-model="tzData.phone_number"
              placeholder="请输入债权人联系手机"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tzqx">取 消</el-button>
        <el-button type="primary" @click="tzRelease">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="任务终止" width="45%" :visible.sync="data.stopListType">
      <el-descriptions direction="vertical" :column="10" border>
        <el-descriptions-item
          v-for="(item, index) in data.stopList"
          :key="index"
          :label="item.name"
        >
          <el-button
            :disabled="item.status !== '待执行'"
            @click="stopBtn(item, index)"
            type="text"
            >立即终止</el-button
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./entrustAdmin.ts"></script>

<style lang="scss">
@import '@/assets/scss/variables';

.entrustAdmin-wrap {
  width: 100%;
  min-height: 100%;
  background-color: $main-body-bgColor;
  position: relative;
  .entrustAdmin-box {
    display: flex;
    & .el-table th,
    .el-table td {
      text-align: center;
    }
    & .left {
      width: 10%;
      display: flex;
      & > .text {
        div {
          color: $Main-characters;
          font-size: $Text-font;
          height: 40px;
          line-height: 40px;
          padding: 0 25px 0 0;
          text-align: center;
          cursor: pointer;
        }
        .act {
          & .title {
            color: #ec193a;
          }
        }
      }
      & > .shuxian-box {
        height: 100%;
        width: 2px;
        background-color: #e4e7ed;
        position: relative;
        & > .shuxian {
          width: 100%;
          height: 40px;
          background-color: #ec193a;
          transition: transform 0.5s ease;
          transform: translateY(0);
        }
      }
    }
    & .right {
      width: 90%;
      overflow-y: auto;
      padding-right: 50px;
      .act {
        color: #ec193a !important;
      }
      & .section {
        margin-bottom: 20px;
        & > span:first-child {
          margin-top: 10px;
          display: block;
          height: 20px;
        }
        & > .serchOption1 {
          display: flex;
          margin-bottom: 10px;
          flex-direction: row-reverse;
          & > .el-input {
            width: 180px;
            margin-left: 10px;
          }
        }

        .box {
          display: flex;
          .text:nth-child(1) {
            width: 23.33%;
          }
          .text:nth-child(2) {
            width: 43.33%;
          }
          .text:nth-child(3) {
            width: 33.33%;
          }
          .text {
            p {
              color: $General-colors;
              font-size: 14px;
              margin: 0;
              margin-bottom: 10px;
              line-height: 32px;
              & > span:first-child {
                margin-right: 20px;
                font-size: 12px;
                color: $Secondary-text;
                width: 60px;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
  .el-form {
    width: 600px;
  }
  .el-divider--horizontal {
    margin: 5px 0 20px 0;
  }
  .info {
    color: #62d493;
  }
  .btn-box {
    position: absolute;
    bottom: 0;
    left: 10%;
  }
  .obligor {
    width: 620px;
    padding: 20px 40px;
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
  .el-dialog {
    width: 598px;
    border-radius: 10px;
  }
  .el-table thead.is-group th.el-table__cell {
    background: white;
  }
  .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
    text-align: center;
  }
}
</style>
