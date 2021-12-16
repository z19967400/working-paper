<template>
  <div class="admin-wrap">
    <div class="admin-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        @Edit="handleEdit"
        @Delete="handleDelete"
      ></comtable>
      <comPaging
        :page="options.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover
      title="添加/编辑"
      popper-class="editData"
      v-model="data.visible"
    >
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <span
          @click="resetForm('form')"
          class="el-icon-circle-close close"
        ></span>
        <el-form-item label="员工工号" prop="job_number">
          <el-col :span="22">
            <el-input v-model="editData.job_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="员工姓名" prop="real_name">
          <el-col :span="22">
            <el-input v-model="editData.real_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="editData.head_img"
              :src="editData.head_img"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone_no">
          <el-col :span="22">
            <el-input v-model="editData.phone_no"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-col :span="22">
            <el-input v-model="editData.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="角色权限" prop="role_id">
          <el-col :span="22">
            <el-select v-model="editData.role_id" placeholder="请选择角色权限">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button
            type="primary"
            :loading="btnLoad"
            native-type="submit"
            @click="submitForm('form')"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>

<script lang="ts" src="./admin.ts"></script>

<style lang="scss">
@import './admin.scss';
</style>
