<template>
  <div class="roleEdit-box">
    <span class="title">角色权限新增/管理 </span>
    <el-divider></el-divider>
    <div class="roleEdit-warp">
      <div class="roleEdit-box" :style="{ height: height + 'px' }">
        <el-form
          :model="data"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="role_name">
            <el-col :span="10">
              <el-input type="text" v-model="data.role_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="角色权限">
            <div class="tree">
              <el-tree
                :data="Tree"
                show-checkbox
                :default-checked-keys="data.menu_ids"
                :default-expand-all="true"
                node-key="id"
                @check="check"
                ref="tree"
                highlight-current
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item style="bottom:0;" class="edit-bottom-bin">
            <el-button
              type="primary"
              :loading="btnLoad"
              @click="submitForm('ruleForm')"
              native-type="submit"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./roleEdit.ts"></script>
<style lang="scss">
@import './roleEdit.scss';
</style>
