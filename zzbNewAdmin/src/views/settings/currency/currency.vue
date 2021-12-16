<template>
  <div class="currency-warp">
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
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <div class="zhezhao" v-show="visible"></div>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <el-form ref="form" :rules="rules" :model="edit" label-width="80px">
        <span
          @click="resetForm('form')"
          class="el-icon-circle-close close"
        ></span>
        <el-form-item label="货币名称" prop="currency_name">
          <el-col :span="22">
            <el-input v-model="edit.currency_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="货币单位" prop="currency_unit">
          <el-col :span="22">
            <el-input v-model="edit.currency_unit"></el-input>
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
    <comPaging
      :page="getData.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
  </div>
</template>
<script lang="ts" src="./currency.ts"></script>
<style lang="scss">
@import './currency.scss';
</style>
