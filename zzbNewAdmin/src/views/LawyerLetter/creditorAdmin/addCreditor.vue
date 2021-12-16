<template>
  <div class="addCreditor-wrap">
    <div :style="{ height: data.height + 'px' }" class="addCreditor-box">
      <span class="title">债权人新增/管理 </span>
      <el-divider></el-divider>
      <!-- <selectAdmin v-show="data.selectAdminTp" @search="searchUser" @select="selectUser" @select2="selectAdmin" @quxiao="selectQuxiao" :options="data.adminOption" :tabal="data.sunTable" :tabal2="data.sunTable2"></selectAdmin>
      <div v-show="!data.selectAdminTp" class="adminInfo">
        <el-row>
          <label>会员名称</label>
          <span>{{ ruleForm.name }}</span>
        </el-row>
        <el-row>
          <label>管理员名称</label>
          <span>{{ ruleForm.admin_name }}</span>
        </el-row>
      </div> -->
      <!-- <el-button v-show="!data.selectAdminTp" style="margin-left:20px;" type="primary" size="small" @click="data.selectAdminTp = !data.selectAdminTp" plain>选择角色</el-button> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="债权人类别" prop="creditor_type">
          <el-radio-group v-model="ruleForm.creditor_type">
            <el-radio label="Creditor_states_0">个人</el-radio>
            <el-radio label="Creditor_states_1">企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="债权人名称" prop="creditor_name">
          <el-col :span="12">
            <el-input v-model="ruleForm.creditor_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="证照类别">
          <el-radio-group v-model="ruleForm.id_type">
            <el-radio
              v-if="ruleForm.creditor_type != 'Creditor_states_1'"
              :label="1"
              >身份证</el-radio
            >
            <el-radio
              v-if="ruleForm.creditor_type != 'Creditor_states_1'"
              :label="2"
              >士官证</el-radio
            >
            <el-radio
              v-if="ruleForm.creditor_type != 'Creditor_states_1'"
              :label="3"
              >护照</el-radio
            >
            <el-radio
              v-if="ruleForm.creditor_type != 'Creditor_states_1'"
              :label="4"
              >港澳台通行证</el-radio
            >
            <el-radio
              v-if="ruleForm.creditor_type == 'Creditor_states_1'"
              :label="5"
              >营业执照</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.id_type == 5"
          label="上传证照"
          prop="license_img_url"
        >
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=0'"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('license_img_url', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.license_img_url != ''"
              :src="ruleForm.license_img_url"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.id_type != 5"
          label="上传证照"
          prop="license_img_url"
        >
          <el-row>
            <el-col :span="6">
              <el-upload
                drag
                class="avatar-uploader"
                :action="burl + '/Upload/UploadImage?type=0'"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess('id_card_img_01', res, file)
                  }
                "
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="ruleForm.id_card_img_01 != ''"
                  :src="ruleForm.id_card_img_01"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                drag
                class="avatar-uploader"
                :action="burl + '/Upload/UploadImage?type=0'"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess('id_card_img_02', res, file)
                  }
                "
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="ruleForm.id_card_img_02 != 'Creditor_states_1'"
                  :src="ruleForm.id_card_img_02"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="证照号码" prop="license_no">
          <el-col :span="12">
            <el-input v-model="ruleForm.license_no"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.creditor_type == 'Creditor_states_1'"
          label="代理人姓名"
          prop="license_no"
        >
          <el-col :span="12">
            <el-input v-model="ruleForm.agent_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.creditor_type == 'Creditor_states_1'"
          label="代理人身份证"
          prop="license_no"
        >
          <el-col :span="12">
            <el-input v-model="ruleForm.agent_id_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.creditor_type == 'Creditor_states_1'"
          label="授权书"
          prop="agent_authorization"
        >
          <el-upload
            drag
            class="avatar-uploader"
            :action="burl + '/Upload/UploadImage?type=0'"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                handleAvatarSuccess('agent_authorization', res, file)
              }
            "
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.agent_authorization != ''"
              :src="ruleForm.agent_authorization"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone_number">
          <el-col :span="12">
            <el-input v-model="ruleForm.phone_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-col :span="12">
            <el-input v-model="ruleForm.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地区" prop="country">
          <comAddress
            :address="data.address"
            @emitAddress="getAddress"
          ></comAddress>
        </el-form-item>
        <el-form-item prop="detailed_address" label="详细地址">
          <el-col :span="12">
            <el-input v-model="ruleForm.detailed_address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="审核状态" prop="audit_status">
          <el-col :span="12">
            <span>{{
              ruleForm.audit_status == 'Audit_states_0'
                ? '待审核'
                : ruleForm.audit_status == 'Audit_states_1'
                ? '未通过'
                : '已通过'
            }}</span>
          </el-col>
          <!-- <div style="margin-left:40px;display:inline-block;" v-show="
              ruleForm.audit_status == '未通过' ||
                ruleForm.audit_status == '已通过'
            ">
            <el-select v-model="SendingAddress" placeholder="请选择">
              <el-option v-for="item in mailingAddress" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="sendEmail" style="margin-left:40px;" plain size="small">发送通知邮件</el-button>
          </div> -->
        </el-form-item>
        <el-form-item label="后台备注" prop="back_remarks">
          <el-input type="textarea" v-model="ruleForm.back_remarks"></el-input>
        </el-form-item>
        <el-form-item style="bottom:0;" class="edit-bottom-bin">
          <el-button
            :loading="data.submitType"
            type="primary"
            @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" src="./addCreditor.ts"></script>

<style lang="scss">
@import './addCreditor.scss';
</style>
