<template>
  <div class="creditor">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation
      :totalize="data.totalize"
      :addText="'新增债权人'"
      @add="add"
    ></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @setUp="handleSetUp"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <!-- 新增债权人 弹框 -->
    <el-dialog title="债权人新增" :visible.sync="data.addDialogVisible">
      <addForms
        ref="changdialog"
        :parentId="data.id"
        @determine="adddialog"
        @initdata="adddialog"
        @cancel="adddialog"
        @csh="init"
      ></addForms>
    </el-dialog>
    <!-- 设置管理员 -->
    <el-dialog title="管理员设置" :visible.sync="data.visible2">
      <setUp :setUpId="setUpId"></setUp>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看债权人" :visible.sync="data.visible3">
      <seeCreditor :seeId="seeId"></seeCreditor>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
@import "./index.scss";
</style>
