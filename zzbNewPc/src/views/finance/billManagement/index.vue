<template>
  <div class="billManagement-wrap">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :admin="true"
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
