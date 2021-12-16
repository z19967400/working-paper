<template>
  <div class="editgitinvoice">
    <div
      :style="{ height: data.height + 'px' }"
      class="memberCollectionEdit-box"
    >
      <span class="title">会员开票地址管理 </span>
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
          <label>选择会员</label>
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
        label-width="110px"
        label-position="left"
        class="demo-ruleForm"
      >
        <div class="inline-box">
          <el-form-item label="抬头类别">
            <el-radio-group v-model="ruleForm.invoice_title_type">
              <el-radio :label="'Rise_type_0'">企业</el-radio>
              <el-radio :label="'Rise_type_1'">个人/政府机构</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发票类别">
            <el-radio-group v-model="ruleForm.invoice_type">
              <el-radio :label="'Invoice_type_2'">纸质增专票</el-radio>
              <el-radio :label="'Invoice_type_1'">纸质增普票</el-radio>
              <el-radio :label="'Invoice_type_0'">电子增普票</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-row>
          <div class="inline-box">
            <el-form-item label="发票抬头" prop="invoice_title">
              <el-input v-model="ruleForm.invoice_title"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="back_remarks">
              <el-input v-model="ruleForm.tax_number"></el-input>
            </el-form-item>
          </div>
        </el-row>
        <el-row>
          <div class="inline-box">
            <el-form-item label="开户银行" prop="back_remarks">
              <el-input v-model="ruleForm.bank_name"></el-input>
            </el-form-item>
            <el-form-item label="银行账户" prop="back_remarks">
              <el-input v-model="ruleForm.bank_account"></el-input>
            </el-form-item>
          </div>
        </el-row>
        <el-row>
          <el-form-item label="银行电话" prop="bank_telephone">
            <el-input v-model="ruleForm.bank_telephone"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择地区" prop="">
            <comAddress :address="1" @emitAddress="getAddress"></comAddress>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="地址详情" prop="detailed_address">
            <el-input v-model="ruleForm.detailed_address"></el-input>
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

<script lang="ts" src="./editinvoice.ts"></script>

<style lang="scss">
@import './editinvoice.scss';
</style>
