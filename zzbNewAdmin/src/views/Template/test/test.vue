<template>
  <div class="test-warp">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择模板类型" prop="template">
        <el-select
          @change="change"
          v-model="ruleForm.template"
          placeholder="请选择模板类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.template != ''"
        label="选择模板"
        prop="templateName"
      >
        <el-select
          @change="change2"
          v-model="ruleForm.templateName"
          placeholder="请选择模板"
        >
          <el-option
            v-for="item2 in options2"
            :key="item2.value"
            :label="item2.label"
            :value="item2.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div v-if="ruleForm.template <= 2 && ruleForm.template != ''">
        <el-form-item label="所需参数" prop="needParameter">
          <el-col :span="6">
            <div>{{ ruleForm.needParameter }}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="发送参数" prop="parameter">
          <el-col :span="6">
            <el-input v-model="ruleForm.parameter"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="发送号码" prop="phone">
          <el-col :span="6">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-col>
        </el-form-item>
      </div>
      <div v-if="ruleForm.template > 2 && ruleForm.template != ''">
        <el-form-item label="下载模板">
          <el-col :span="6">
            <el-button @click="download" plain size="mini" type="primary"
              >点击下载<i class="el-icon-download el-icon--right"></i
            ></el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="上传文件">
          <el-col :span="6">
            <el-upload
              class="upload-demo"
              drag
              action="http://192.168.1.108/api/Upload/UploadImage?type=2"
              multiple
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-col>
        </el-form-item>
      </div>
      <el-form-item class="edit-bottom-bin">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" src="./test.ts"></script>
<style lang="scss">
@import './test.scss';
</style>
