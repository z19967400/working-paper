<template>
  <div class="authentication-wrap">
    <div class="authentication-box">
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
        @admin="handleAdmin"
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

<script lang="ts" src="./authentication.ts"></script>

<style lang="scss">
@import './authentication.scss';
</style>
