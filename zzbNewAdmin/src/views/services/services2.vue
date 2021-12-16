<template>
  <div class="services-wrap">
    <div class="services-box">
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

<script lang="ts" src="./services2.ts"></script>

<style lang="scss">
@import './services.scss';
</style>
