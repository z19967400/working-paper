<template>
  <div class="roleList-wrap">
    <div class="input-box">
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
    </div>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
  </div>
</template>

<script lang="ts" src="./roleList.ts"></script>

<style lang="scss">
@import './roleList.scss';
</style>
