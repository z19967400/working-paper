<template>
  <div class="creditorAdmin-wrap">
    <div class="creditorAdmin-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :sh="true"
        @examine="examines"
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
    <el-popover title="审核" popper-class="editData" v-model="data.visible">
      <span
        @click="data.visible = !data.visible"
        class="el-icon-circle-close close"
      ></span>
      <el-radio-group
        style="margin-bottom:20px;"
        v-model="examine.audit_status"
      >
        <el-radio label="Audit_states_0">待审核</el-radio>
        <el-radio label="Audit_states_1">未通过</el-radio>
        <el-radio label="Audit_states_2">已通过</el-radio>
      </el-radio-group>
      <el-input
        style="margin-bottom:20px;"
        type="textarea"
        v-model="examine.audit_feedback"
      ></el-input>
      <el-button style="margin:auto;display:block;" @click="confirmExamine"
        >确认审核</el-button
      >
    </el-popover>
  </div>
</template>

<script lang="ts" src="./creditorAdmin.ts"></script>

<style lang="scss">
@import './creditorAdmin.scss';
</style>
