<template>
  <div class="information-wrap">
    <el-tabs v-model="data.activeName" @tab-click="handleClick">
      <el-tab-pane label="开票信息" name="first">
        <comInvoice ref="comInvoice"></comInvoice>
      </el-tab-pane>
      <el-tab-pane label="收票地址" name="second">
        <comTicket ref="comTicket"></comTicket>
      </el-tab-pane>
      <el-tab-pane label="收款通道" name="third">
        <comCollection ref="comCollection"></comCollection>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
