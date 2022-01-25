<template>
  <div class="billManagement-wrap">
    <!-- <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect> -->
    <div class="search-box">
      <el-input
        style="width:220px"
        size="small"
        v-model="options.bill_number"
        placeholder="账单编号"
      ></el-input>
      <el-select
        style="margin-left:20px;width:120px"
        v-if="data.type == '律师办案支付明细'"
        size="small"
        v-model="options.settlement_status"
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
        style="width:220px;margin-left:20px;"
        size="small"
        v-model="options.bill_title"
        placeholder="账单名称"
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
        @click="search"
        type="primary"
        >查询</el-button
      >
      <el-button size="small" @click="clearSelection" type="primary"
        >重置</el-button
      >
    </div>
    <comOperation :totalize="data.totalize"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :admin="true"
      :adminName="'账单明细'"
      @admin="handleEdit"
    ></comtable>
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
