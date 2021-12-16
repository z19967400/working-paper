<template>
  <div class="excellInfo-warp">
    <span class="title">excell模板新增/编辑 </span>
    <el-divider></el-divider>
    <el-form
      :model="data"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :style="{ height: height + 'px' }"
    >
      <el-form-item label="名称 " prop="name">
        <el-col :span="6">
          <el-input v-model="data.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="调用码" prop="use_code">
        <el-col :span="6">
          <el-input v-model="data.use_code"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="债务人类型" prop="creditor_states">
        <el-col :span="6">
          <el-select v-model="data.creditor_states" placeholder="请选择">
            <el-option
              v-for="item in CreditorStates"
              :key="item.id"
              :label="item.dic_content"
              :value="item.dic_code"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="债务类别" prop="debt_type">
        <el-col :span="6">
          <el-select v-model="data.debt_type" placeholder="请选择">
            <el-option
              v-for="item in debTypes"
              :key="item.id"
              :label="item.dic_content"
              :value="item.dic_code"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item v-show="false" label="文件路径" prop="template_path">
        <el-col :span="6">
          <el-input v-model="data.template_path"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="模板上传">
        <el-col :span="6">
          <el-upload
            class="upload-demo"
            :action="burl + '/Upload/UploadImage?type=2'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :before-upload="beforeUpload"
          >
            <el-button size="small" plain type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <div v-for="(item, index) in data.sheet" :key="index" class="sheet-box">
        <div class="sheet">
          <el-form-item label="表名称">
            <el-input v-model="item.sheet_name"></el-input>
          </el-form-item>
          <el-form-item label="列名开始行">
            <el-input v-model="item.column_name_start_line"></el-input>
          </el-form-item>
          <el-form-item label="内容开始行">
            <el-input v-model="item.content_start_line"></el-input>
          </el-form-item>
          <el-form-item label="表列表数">
            <el-input v-model="item.sheet_column_count"></el-input>
          </el-form-item>
          <el-button
            size="small"
            plain
            style="margin-left:20px;height:40px;"
            @click="addColumn(index)"
            type="primary"
            >确定</el-button
          >
          <el-button
            size="small"
            plain
            style="margin-left:20px;height:40px;"
            @click="deletSheet(index)"
            type="primary"
          >
            删除</el-button
          >
        </div>
        <div class="box">
          <div
            class="box-item"
            v-for="(item2, index2) in item.column"
            :key="index2"
          >
            <el-form-item label-width="60px" label="列名">
              <el-col :span="22">
                <el-input size="small" v-model="item2.column_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label-width="60px" label="字段">
              <el-col :span="22">
                <el-input size="small" v-model="item2.field_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label-width="60px" label="必填">
              <div style="display:flex;">
                <el-switch
                  size="small"
                  style="margin-top:10px;margin-right:20px;"
                  v-model="item2.is_required"
                ></el-switch>
                <el-col :span="12">
                  <el-select
                    size="small"
                    v-model="item2.verify_conditions"
                    placeholder="请选择验证方式"
                  >
                    <el-option
                      v-for="item3 in options"
                      :key="item3.value"
                      :label="item3.label"
                      :value="item3.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </div>
            </el-form-item>
          </div>
        </div>
      </div>
      <el-button
        size="small"
        plain
        style="margin-left:100px;height:40px;"
        @click="addSheet"
        type="primary"
        >增加sheet</el-button
      >
    </el-form>
    <div class="edit-bottom-bin" style="margin-left:100px;">
      <el-button
        type="primary"
        :loading="btnLoad"
        @click="submitForm('ruleForm')"
        >确定</el-button
      >
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts" src="./excellInfo.ts"></script>
<style lang="scss">
@import './excellInfo.scss';
</style>
