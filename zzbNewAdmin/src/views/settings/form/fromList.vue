<template>
  <div class="from-warp">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.list.length" @add="add"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :info="data.tabInfo"
      @Info="handleInfo"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <div class="zhezhao" v-show="visible"></div>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <span
          @click="resetForm('form')"
          class="el-icon-circle-close close"
        ></span>
        <el-form-item label="表单名称" prop="form_name">
          <el-col :span="22">
            <el-input v-model="editData.form_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button
            type="primary"
            :loading="btnLoad"
            native-type="submit"
            @click="submitForm('form')"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./from.ts"></script>
<style lang="scss">
@import './from.scss';
</style>
