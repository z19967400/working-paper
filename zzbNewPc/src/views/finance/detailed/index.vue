<template>
  <div class="detailed-wrap">
    <div class="search-box">
      <el-select
        @change="selectChange"
        style="width:160px;"
        size="small"
        v-model="data.type"
      >
        <el-option
          label="AI律师函支付明细"
          value="AI律师函支付明细"
        ></el-option>
        <el-option
          label="律师办案支付明细"
          value="律师办案支付明细"
        ></el-option>
      </el-select>
      <el-select
        style="margin-left:20px;"
        v-if="data.type == 'AI律师函支付明细'"
        size="small"
        placeholder="支付状态"
        v-model="options.pay_status"
      >
        <el-option label="待支付" value="Pay_Status_0"></el-option>
        <el-option label="已支付" value="Pay_Status_1"></el-option>
        <el-option label="已退款" value="Pay_Status_2"></el-option>
      </el-select>
      <el-input
        v-if="data.type == 'AI律师函支付明细'"
        style="width:220px;margin-left:20px;"
        size="small"
        v-model="options.batch_no"
        placeholder="委托批次号"
      ></el-input>
      <el-input
        v-if="data.type == 'AI律师函支付明细'"
        style="width:220px;margin-left:20px;"
        size="small"
        v-model="options.creditor_name"
        placeholder="债权人"
      ></el-input>
      <el-input
        style="width:180px;margin-left:20px;"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options2.debtor_number"
        placeholder="委托编号"
      ></el-input>
      <el-select
        style="margin-left:20px;width:120px"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options2.settlement_status"
        placeholder="结算状态"
      >
        <el-option
          v-for="item in data.settlements"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        style="width:180px;margin-left:20px;"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options2.creditor_name"
        placeholder="债权人"
      ></el-input>
      <el-input
        style="width:180px;margin-left:20px;"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options2.debtor_name"
        placeholder="债务人"
      ></el-input>
      <el-input
        style="width:180px;margin-left:20px;"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options2.lawyer_name"
        placeholder="办案律师"
      ></el-input>
      <el-date-picker
        value-format="yyyy-MM-dd"
        style="margin-left:20px;"
        v-model="data.value1"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="timeChange"
      >
      </el-date-picker>
      <el-button
        style="margin-left:20px;"
        size="small"
        @click="init"
        type="primary"
        >查询</el-button
      >
      <el-button size="small" @click="clearSelection" type="primary"
        >重置</el-button
      >
    </div>
    <div v-show="data.type == 'AI律师函支付明细'">
      <el-table
        v-loading="data.loading"
        class="table1"
        :data="data.list"
        border
        :height="data.height"
      >
        <el-table-column
          v-for="(item, index) in data.dataType"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="index"
        >
          <template slot-scope="scope">
            <span
              :style="{
                color:
                  scope.row[item.prop] == '已支付'
                    ? '#67C23A'
                    : scope.row[item.prop] == '已退款'
                    ? '#f04761'
                    : ''
              }"
              v-if="item.prop == 'pay_status'"
              >{{ scope.row[item.prop] }}</span
            >
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="color:#67C23A;"
              :disabled="
                scope.row.bill_number == null || scope.row.bill_number == ''
              "
              @click="handlInfo(scope.row)"
              size="small"
              >{{
                scope.row.bill_number == null
                  ? "未生成"
                  : scope.row.bill_number == ""
                  ? "未生成"
                  : "查看账单"
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="data.type != 'AI律师函支付明细'">
      <el-table
        class="table2"
        v-loading="data.loading"
        :data="data.list2"
        border
        :height="data.height"
      >
        <el-table-column
          v-for="(item, index) in data.dataType2"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="index"
          :align="item.label === '风险服务费' ? 'center' : ''"
        >
          <template slot-scope="scope">
            <span
              :style="{
                color: scope.row[item.prop] == '未生成' ? '#c0c4cc' : ''
              }"
              v-if="item.prop == 'settlement_status'"
              >{{ scope.row[item.prop] }}</span
            >
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
          <el-table-column
            v-if="item.label === '风险服务费'"
            prop="collection_amount"
            label="回款金额"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="float_service_rate"
            label="风险服务费率(%)"
            width="130"
            v-if="item.label === '风险服务费'"
          >
          </el-table-column>
          <el-table-column
            prop="float_service_fee"
            label="风险服务费额"
            width="120"
            v-if="item.label === '风险服务费'"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="scope.row.bill_number == null"
              style="color:#67C23A;"
              @click="handlInfo(scope.row)"
              size="small"
              >{{
                scope.row.bill_number == null ? "未生成" : "查看账单"
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <comPaging
      :page="options.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
