<template>
  <div class="login-wrap">
    <el-drawer :visible.sync="data.login" direction="rtl" size="480px" :modal="false" :close-on-press-escape="false" :wrapperClosable="false" :show-close="false" custom-class="drawer">
      <img class="logo" src="../../assets/images/login/log.png" />
      <div class="login-form">
        <div class="name">{{ data.name }}</div>
        <el-form :model="data.ruleForm" status-icon :rules="data.rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userName">
            <el-input type="text" v-model="data.ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="data.ruleForm.passWord" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <!-- <el-button type="primary" :disabled="disabled" @click="getCode">{{
              codeText
            }}</el-button> -->
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" src="./login.ts"></script>

<style lang="scss">
@import './login.scss';
</style>
