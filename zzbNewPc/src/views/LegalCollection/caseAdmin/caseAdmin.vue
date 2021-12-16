<template>
  <div class="caseAdmin">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation
      :totalize="data.totalize"
      :addText="'批量签约'"
      @add="add"
    ></comOperation>
    <comtable
      class="right-table"
      :top="0"
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :edit="false"
      @Delete="handleDelete"
      :admin="true"
      @admin="handleInfo"
    ></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>

<script lang="ts" src="./caseAdmin.ts"></script>

<style lang="scss">
@import "./caseAdmin.scss";
</style>
