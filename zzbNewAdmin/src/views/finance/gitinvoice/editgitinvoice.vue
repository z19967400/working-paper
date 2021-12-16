<template>
  <div class="editgitinvoice">
    <div
      :style="{ height: data.height + 'px' }"
      class="memberCollectionEdit-box"
    >
      <span class="title">会员收票地址管理 </span>
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
        label-width="100px"
        label-position="left"
        class="demo-ruleForm"
      >
        <div class="inline-box">
          <el-form-item label="收票人姓名">
            <el-input v-model="ruleForm.consignee_name"></el-input>
          </el-form-item>
          <el-form-item label="收票人手机">
            <el-input v-model="ruleForm.consignee_telephone"></el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-form-item label="收票人邮箱" prop="contacts_email">
            <el-input v-model="ruleForm.consignee_email"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择地址">
            <comAddress
              :address="ruleForm.county_name"
              @emitAddress="getAddress"
            ></comAddress>
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

<script lang="ts" src="./editgitinvoice.ts"></script>

<style lang="scss">
@import './editgitinvoice.scss';
</style>
