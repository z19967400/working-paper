<template>
  <div class="collection-wrap">
    <comselect :options="data.options" @select="search" @clear="clearSelection"></comselect>
    <comOperation :totalize="data.list.length" @add="add"></comOperation>
    <comtable :tableData="data.list" :load="data.loading" :tableType="data.dataType" :top="60" @Edit="handleEdit" @Delete="handleDelete"></comtable>
    <comPaging :page="options.page" :totalize="data.totalize" @watchChange="watchChange"></comPaging>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover title="新增/编辑" popper-class="editData" v-model="data.visible">
      <span @click="close" class="el-icon-close close"></span>
      <el-form :model="editData" :rules="data.rules" ref="ruleForm" :inline="true" label-width="110px" class="demo-ruleForm demo-form-inline">
        <el-row>
          <el-form-item label="收款通道名称" prop="payment_channel_name">
            <el-input v-model="editData.payment_channel_name"></el-input>
          </el-form-item>
          <el-form-item label="联系人名称" prop="contacts_name">
            <el-input v-model="editData.contacts_name"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="联系电话" prop="contacts_phone">
            <el-input v-model="editData.contacts_phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="contacts_email">
            <el-input v-model="editData.contacts_email"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="企业支付宝" prop="alipay_account">
            <el-input v-model="editData.alipay_account"></el-input>
          </el-form-item>
          <el-form-item label="账户名称" prop="payee_name">
            <el-input v-model="editData.payee_name"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="收款银行" prop="bank_name">
            <el-input v-model="editData.bank_name"></el-input>
          </el-form-item>
          <el-form-item label="收款账号" prop="bank_account">
            <el-input v-model="editData.bank_account"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="付款备注" prop="pay_remarks">
          <el-input type="textarea" v-model="editData.pay_remarks"></el-input>
        </el-form-item>
      </el-form>
      <el-col class="edit-bottom-bin" :span="12">
        <el-button style="margin-left: 110px;" type="primary" :loading="data.submitType" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./collection.ts"></script>

<style lang="scss">
@import './collection.scss';
</style>
