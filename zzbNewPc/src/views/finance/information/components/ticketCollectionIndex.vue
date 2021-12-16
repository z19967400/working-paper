<template>
  <div class="ticketCollection-wrap">
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
      :top="60"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <comPaging
      :page="options.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover
      title="新增/编辑"
      popper-class="editData"
      v-model="data.visible"
    >
      <span @click="close" class="el-icon-close close"></span>
      <el-form
        :model="editData"
        :rules="data.rules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="收票人姓名" prop="consignee_name">
          <el-col :span="22"
            ><el-input v-model="editData.consignee_name"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="选择地区">
          <el-col :span="22">
            <comAddress
              @emitAddress="selectAddress"
              :address="region"
            ></comAddress>
          </el-col>
        </el-form-item>
        <el-form-item label="收票人地址" prop="detailed_address">
          <el-col :span="22"
            ><el-input v-model="editData.detailed_address"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="收票人手机" prop="consignee_telephone">
          <el-col :span="22"
            ><el-input v-model="editData.consignee_telephone"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="收票人邮箱" prop="consignee_email">
          <el-col :span="22"
            ><el-input v-model="editData.consignee_email"></el-input
          ></el-col>
        </el-form-item>
      </el-form>
      <el-col class="edit-bottom-bin" :span="12">
        <el-button
          style="margin-left: 110px;"
          type="primary"
          :loading="data.submitType"
          @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./ticketCollection.ts"></script>

<style lang="scss">
@import "./ticketCollection.scss";
</style>
