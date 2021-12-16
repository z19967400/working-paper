<template>
  <div class="entrustList-wrap">
    <div class="entrustList-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
        :isAi="true"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        :admin="true"
        @admin="goAdmin"
        @Delete="handleDelete"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>

<script lang="ts" src="./entrustList.ts"></script>

<style lang="scss">
@import './entrustList.scss';
</style>
