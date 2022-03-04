<template>
  <div class="listbill">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize" @add="add"></comOperation>
    <el-row type="flex" class="button" justify="">
      <el-col :span="5">
        <el-button type="primary" size="mini" @click="addailist"
          >新增账单</el-button
        >
      </el-col>
    </el-row>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Delete="handleDelete"
      :edit="false"
      :xq="true"
      @Info="handleInfo"
    ></comtable>
    <comPaging
      :page="options.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
  </div>
</template>

<script lang="ts" src="./listbill.ts"></script>

<style lang="scss">
@import './listbill.scss';
</style>
