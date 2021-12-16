<template>
  <div class="caseAdmin-wrap">
    <div class="caseAdmin-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <!-- <comtable :tableData="data.list" :load="data.loading" :tableType="data.dataType" :admin="true" @admin="goAdmin" @Delete="handleDelete"></comtable> -->
      <comTab
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        @admin="goAdmin"
        @Delete="handleDelete"
      ></comTab>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
