<template>
  <div class="selectUser">
    <el-row class="header">
      <span>ID：</span>
      <el-input
        style="width:230px;margin-left:20px;"
        size="small"
        v-model="getUser.member_id"
      ></el-input>
      <span style="margin-left:20px;">用户名称：</span>
      <el-input
        style="width:230px;margin-left:20px;"
        size="small"
        v-model="getUser.member_name"
      ></el-input>
      <el-button
        style="margin-left:20px;"
        @click="getUserData"
        size="small"
        type="primary"
        >查询</el-button
      >
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="用户ID" width="180"> </el-table-column>
      <el-table-column prop="m_type" label="用户类别" width="180">
      </el-table-column>
      <el-table-column prop="name" label="用户名称"> </el-table-column>
      <el-table-column prop="phone_number" label="手机号码"> </el-table-column>
      <el-table-column label="选择" width="80">
        <template slot-scope="scope">
          <el-radio
            v-model="data.UserId"
            @change="radioChange"
            :label="scope.row.id"
            >选择</el-radio
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./selectUser.ts"></script>
<style lang="scss">
@import './selectUser.scss';
</style>
