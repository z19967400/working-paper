<template>
  <div class="web-warp">
    <div class="web-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation
        :totalize="data.webList.length"
        @add="addApi"
      ></comOperation>
      <comtable
        :tableData="data.webList"
        :load="data.loading"
        :tableType="data.tableType"
        @Edit="handleEdit"
        @Delete="handleDelete"
      ></comtable>
      <comPaging
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>
<script lang="ts" src="./webList.ts"></script>

<style lang="scss" scoped>
@import './webList.scss';
</style>
