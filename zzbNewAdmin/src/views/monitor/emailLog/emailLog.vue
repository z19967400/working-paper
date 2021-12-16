<template>
  <div class="emailLog-warp">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation
      :totalize="data.list.length"
      :addShow="false"
      @add="add"
    ></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :operation="false"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>
<script lang="ts" src="./emailLog.ts"></script>
<style lang="scss">
@import './emailLog.scss';
</style>
