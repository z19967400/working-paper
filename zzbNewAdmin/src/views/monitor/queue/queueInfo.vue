<template>
  <div class="queueInfo-warp">
    <span class="title">队列新增/编辑 </span>
    <el-divider></el-divider>
    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
      <el-form-item label="队列名称" prop="task_name">
        <el-col :span="11">
          <el-input v-model="form.task_name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="任务编码" prop="task_code">
        <el-col :span="11">
          <el-input v-model="form.task_code"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分组编码" prop="task_group">
        <el-col :span="11">
          <el-input v-model="form.task_group"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="服务描述" prop="task_describe">
        <el-input type="textarea" v-model="form.task_describe"></el-input>
      </el-form-item>
      <el-form-item class="edit-bottom-bin">
        <el-button type="primary" :loading="btnLoad" @click="submitForm('form')"
          >确定</el-button
        >
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" src="./queueInfo.ts"></script>
<style lang="scss">
@import './queueInfo.scss';
</style>
