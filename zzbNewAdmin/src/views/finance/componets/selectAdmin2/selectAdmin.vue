<template>
  <div class="selectAdmin">
    <p class="header">用户名称：{{ name }}</p>
    <el-table :data="data.list" border>
      <el-table-column prop="id" label="管理员ID" width="80"> </el-table-column>
      <el-table-column prop="admin_name" label="管理员真实姓名">
      </el-table-column>
      <el-table-column prop="admin_phone_number" label="手机号码">
      </el-table-column>
      <el-table-column prop="is_super" label="权限">
        <template slot-scope="scope">
          <span>{{
            scope.row.is_super == '0' ? '普通用户' : '超级管理员'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选择" width="80">
        <template slot-scope="scope">
          <el-radio v-model="data.adminID" :label="scope.row.id">选择</el-radio>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="query">确定</el-button>
    </div>
  </div>
</template>
<script lang="ts" src="./selectAdmin.ts"></script>
<style lang="scss">
@import './selectAdmin.scss';
</style>
