<template>
  <div class="obligorAdmin-wrap">
    <div class="obligorAdmin-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        :entrust="true"
        @Info="goAdmin"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>

<script lang="ts" src="./obligorAdmin.ts"></script>

<style lang="scss">
@import './obligorAdmin.scss';
</style>
