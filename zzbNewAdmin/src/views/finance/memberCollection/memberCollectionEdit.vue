<template>
  <div class="memberCollectionEdit-wrap">
    <div
      :style="{ height: data.height + 'px' }"
      class="memberCollectionEdit-box"
    >
      <span class="title">会员收款管理新增/编辑 </span>
      <el-divider></el-divider>
      <selectAdmin
        v-show="data.selectAdminTp"
        @search="searchUser"
        @select="selectUser"
        @select2="selectAdmin"
        @quxiao="selectQuxiao"
        :options="data.adminOption"
        :tabal="data.sunTable"
        :tabal2="data.sunTable2"
      ></selectAdmin>
      <div v-show="!data.selectAdminTp" class="adminInfo">
        <el-row>
          <label>会员名称</label>
          <span>{{ ruleForm.name }}</span>
        </el-row>
        <el-row>
          <label>管理员名称</label>
          <span>{{ ruleForm.admin_name }}</span>
        </el-row>
      </div>
      <el-button
        v-show="!data.selectAdminTp"
        style="margin-left:20px;"
        type="primary"
        size="small"
        @click="data.selectAdminTp = !data.selectAdminTp"
        plain
      >
        选择角色</el-button
      >
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="left"
        class="demo-ruleForm"
      >
        <div class="inline-box">
          <el-form-item label="收款通道名称" prop="payment_channel_name">
            <el-input v-model="ruleForm.payment_channel_name"></el-input>
          </el-form-item>
          <el-form-item label="收款账号" prop="bank_account">
            <el-input v-model="ruleForm.bank_account"></el-input>
          </el-form-item>
        </div>
        <div class="inline-box">
          <el-form-item label="联系人" prop="contacts_name">
            <el-input v-model="ruleForm.contacts_name"></el-input>
          </el-form-item>
          <el-form-item label="收款银行" prop="bank_name">
            <el-input v-model="ruleForm.bank_name"></el-input>
          </el-form-item>
        </div>
        <div class="inline-box">
          <el-form-item label="联系电话 " prop="contacts_phone">
            <el-input v-model="ruleForm.contacts_phone"></el-input>
          </el-form-item>
          <el-form-item label="企业支付宝" prop="alipay_account">
            <el-input v-model="ruleForm.alipay_account"></el-input>
          </el-form-item>
        </div>
        <div class="inline-box">
          <el-form-item label="电子邮箱" prop="contacts_email">
            <el-input v-model="ruleForm.contacts_email"></el-input>
          </el-form-item>
          <el-form-item label="付款备注" prop="pay_remarks">
            <el-input v-model="ruleForm.pay_remarks"></el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-form-item label="账户名称" prop="payee_name">
            <el-input v-model="ruleForm.payee_name"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="后台备注" prop="back_remarks">
            <el-input
              type="textarea"
              v-model="ruleForm.back_remarks"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="bottom:0;" class="edit-bottom-bin">
            <el-button
              :loading="data.submitType"
              type="primary"
              @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" src="./memberCollectionEdit.ts"></script>

<style lang="scss">
@import './memberCollectionEdit.scss';
</style>
