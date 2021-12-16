<template>
  <div class="ordinary-wrap">
    <div class="ordinary-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation
        :totalize="data.totalize"
        :addShow="false"
        @add="add"
      ></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        :admin="true"
        @Edit="handleEdit"
        @Delete="handleDelete"
        @admin="goAdmin"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
      <div class="zhezhao" v-show="visible"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./ordinary.ts"></script>

<style lang="scss">
@import './ordinary.scss';
</style>
