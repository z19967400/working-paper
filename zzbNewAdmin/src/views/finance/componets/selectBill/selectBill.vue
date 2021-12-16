<template>
  <div class="selectUser">
    <el-row class="header">
      <span>账单币种：</span>
      <el-select
        size="small"
        @change="currencyIdChange"
        v-model="getData.currency_id"
      >
        <el-option
          v-for="(item, index) in currencys"
          :label="item.currency_name"
          :value="item.id"
          :key="index"
        ></el-option>
      </el-select>
      <span style="margin-left:20px;">排序方式：</span>
      <el-select size="small" v-model="getData.sort_type">
        <el-option label="时间排序" :value="0"></el-option>
        <el-option label="债权人排序" :value="1"></el-option>
      </el-select>
      <el-button
        style="margin-left:20px;"
        @click="getBillInfo"
        size="small"
        type="primary"
        >查询</el-button
      >
    </el-row>
    <div v-show="billType == 0" class="table-cell">
      <span>
        AI律师函服务
        <span
          style="margin-left:20px;font-size:12px;color:#606366;"
          v-show="ai_pay.length > 0"
          >委托数：{{ ai_pay.length }}条
        </span>
        <span style="margin-left:20px;font-size:12px;color:#606366;"
          >总计应付金额：{{ Amount.AmountPayable1 }} 元</span
        >
      </span>
      <el-table
        @selection-change="handleSelectionChange1"
        :data="ai_pay"
        :max-height="400"
        :row-class-name="tableRowClassName"
        border
      >
        <el-table-column prop="pay_number" label="支付编号" width="150">
        </el-table-column>
        <el-table-column prop="debtor_number" label="委托批次号" width="120">
        </el-table-column>
        <el-table-column prop="credito_id" label="债权人ID" width="80">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人"> </el-table-column>
        <el-table-column prop="create_name" label="创建人" width="160">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
        </el-table-column>
        <el-table-column prop="total_amount" label="单价" width="120">
        </el-table-column>
        <el-table-column prop="paid_amount" label="应付金额" width="120">
        </el-table-column>

        <el-table-column prop="execution_progress" label="执行状态" width="120">
        </el-table-column>
        <!-- <el-table-column prop="back_remarks" label="后台备注" width="220">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.back_remarks)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.back_remarks }}
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
      </el-table>
    </div>
    <div class="table-cell">
      <span>
        律师办案服务_固定
        <span
          style="margin-left:20px;font-size:12px;color:#606366;"
          v-show="fixed_service_fee.length > 0"
          >委托数：{{ fixed_service_fee.length }}条
        </span>
        <span style="margin-left:20px;font-size:12px;color:#606366;"
          >总计应付金额：{{ Amount.AmountPayable2 }} 元</span
        >
      </span>
      <el-table
        @selection-change="handleSelectionChange2"
        :data="fixed_service_fee"
        :max-height="400"
        border
      >
        <el-table-column prop="id" label="请款ID" width="80"> </el-table-column>
        <el-table-column prop="debtor_number" label="委托批次号" width="150">
        </el-table-column>
        <el-table-column prop="credito_id" label="债权人ID" width="80">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="280">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.creditor_name)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.creditor_name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="debtor_name" label="债务人" width="280">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.debtor_name)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.debtor_name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="lawyer_name" label="办案律师" width="120">
        </el-table-column>
        <el-table-column prop="entrusted_matters" label="办案事项" width="380">
        </el-table-column>
        <el-table-column
          prop="fixed_service_fee"
          label="固定服务费"
          width="100"
        >
        </el-table-column>
        <el-table-column
          v-show="billType == 1 || billType == 2"
          prop="new_management_rate"
          label="平台管理费率"
          width="120"
        ></el-table-column>
        <el-table-column
          v-show="billType == 1 || billType == 2"
          prop="management_fee"
          label="平台管理费额"
          width="120"
        ></el-table-column>
        <el-table-column
          v-show="billType == 1"
          prop="lawyer_fee"
          label="应付律师费"
          width="120"
        ></el-table-column>
        <el-table-column prop="execution_progress" label="执行状态">
        </el-table-column>
        <!-- <el-table-column prop="back_remarks" label="后台备注" width="180px">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.back_remarks)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.back_remarks }}
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed="right"
          type="selection"
          width="55"
        ></el-table-column>
      </el-table>
    </div>
    <div class="table-cell">
      <span>
        律师办案服务_风险
        <span
          style="margin-left:20px;font-size:12px;color:#606366;"
          v-show="float_service_fee.length > 0"
          >委托数：{{ float_service_fee.length }}条
        </span>
        <span style="margin-left:20px;font-size:12px;color:#606366;"
          >总计应付金额：{{ Amount.AmountPayable3 }} 元</span
        >
      </span>
      <el-table
        @selection-change="handleSelectionChange3"
        :data="float_service_fee"
        :max-height="400"
        border
      >
        <el-table-column prop="id" label="请款ID" width="80"> </el-table-column>
        <el-table-column prop="debtor_number" label="委托批次号" width="150">
        </el-table-column>
        <el-table-column prop="credito_id" label="债权人ID" width="80">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="280">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.creditor_name)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.creditor_name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="debtor_name" label="债务人" width="280">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.debtor_name)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.debtor_name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="lawyer_name" label="办案律师" width="120">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.lawyer_name)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.lawyer_name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="entrusted_matters" label="办案事项" width="380">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.entrusted_matters)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.entrusted_matters }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="collection_amount" label="回款金额" width="100">
        </el-table-column>
        <el-table-column
          prop="float_service_rate"
          label="风险服务费率"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="float_service_fee"
          label="风险服务费"
          width="100"
        >
        </el-table-column>
        <el-table-column
          v-show="billType == 1 || billType == 2"
          prop="new_management_rate"
          label="平台管理费率"
          width="120"
        ></el-table-column>
        <el-table-column
          v-show="billType == 1 || billType == 2"
          prop="management_fee"
          label="平台管理费额"
          width="120"
        ></el-table-column>
        <el-table-column
          v-show="billType == 1"
          prop="lawyer_fee"
          label="应付律师费"
          width="100"
        ></el-table-column>
        <el-table-column prop="execution_progress" label="执行状态">
        </el-table-column>
        <!-- <el-table-column prop="back_remarks" label="后台备注">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              trigger="click"
              :content="tostr(scope.row.back_remarks)"
              popper-class="table-click"
              :visible-arrow="false"
            >
              <div slot="reference" class="remarks">
                {{ scope.row.back_remarks }}
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed="right"
          type="selection"
          width="55"
        ></el-table-column>
      </el-table>
    </div>
    <div
      v-show="billType == 0 && vip_admin.length > 0"
      style="width:50%;"
      class="table-cell"
    >
      <span>选择发送对象</span>
      <div class="selectAdmin">
        <p class="header">用户名称：{{ name }}</p>
        <el-table
          @selection-change="handleSelectionChange4"
          ref="multipleTable"
          tooltip-effect="dark"
          :data="vip_admin"
          :max-height="400"
          border
        >
          <el-table-column prop="id" label="管理员ID" width="180">
          </el-table-column>
          <el-table-column prop="admin_name" label="管理员真实姓名" width="180">
          </el-table-column>
          <el-table-column prop="admin_phone_number" label="手机号码">
          </el-table-column>
          <el-table-column prop="is_super" label="权限">
            <template slot-scope="scope">
              <span>{{
                scope.row.is_super == '0' ? '普通会员' : '超级管理员'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./selectBill.ts"></script>
<style lang="scss">
@import './selectBill.scss';
</style>
