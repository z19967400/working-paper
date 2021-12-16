<template>
  <div class="api">
    <div class="api-from">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation
        :totalize="data.apiList.length"
        @add="addApi"
      ></comOperation>
      <comtable
        :tableData="data.apiList"
        :load="data.loading"
        :tableType="data.dataType"
        @Edit="handleEdit"
        @Delete="handleDelete"
      ></comtable>
    </div>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>

<script lang="ts" src="./api.ts"></script>

<style lang="scss" scoped>
@import './api.scss';
</style>
