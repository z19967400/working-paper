<template>
  <div class="creditor-wrap">
    <div v-for="(item, index) in data.list" :key="index" class="cell">
      <span class="marke">{{ index + 1 }}</span>
      <span class="marke2">债权人ID：{{ item.creditor_id }}</span>
      <span class="cell-delect" @click="delect(item)">删除债权人</span>
      <span
        style="margin-right:10px;color:#E6A23C;"
        @click="edit(item)"
        class="cell-delect"
        >编辑</span
      >
      <span
        style="margin-right:10px;color:#E6A23C;"
        @click="examine(item)"
        class="cell-delect"
        >审核</span
      >
      <div class="cell-top">
        <div class="cell-top-left">
          <el-image
            :src="item.license_img_url || item.id_card_img_01"
            :preview-src-list="data.srcList"
          >
          </el-image>
          <el-image
            v-if="!item.license_img_url"
            :src="item.id_card_img_02"
            :preview-src-list="data.srcList"
          >
          </el-image>
        </div>
        <div class="cell-top-right">
          <p class="cell-top-right-row">
            <span class="label">债权人名称</span>
            <span class="value">{{ item.creditor_name || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">统一社会信用代码</span>
            <span class="value">{{ item.license_no || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">办公地址</span>
            <span class="value">{{ item.detailed_address || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">创建人</span>
            <span class="value">{{ item.create_name || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">创建时间</span>
            <span class="value">{{ item.create_time || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">审核状态</span>
            <span class="value">{{ strSub(item.audit_status) }}</span>
          </p>
          <p v-show="item.audit_feedback" class="cell-top-right-row">
            <span class="label">审核反馈</span>
            <span class="value">{{ item.audit_feedback }}</span>
          </p>
          <p v-show="item.back_remarks" class="cell-top-right-row">
            <span class="label">后台备注</span>
            <span class="value">{{ item.back_remarks }}</span>
          </p>
          <p v-if="item.agent_authorization" class="cell-top-right-row">
            <span class="label">授权书</span>
            <span class="value">
              <el-button
                v-if="item.agent_authorization"
                @click="preview2(item.agent_authorization)"
                class="edit"
                type="text"
                size="small"
                style="color:#67C23A;"
                >查看</el-button
              >
              <span v-else>无</span>
            </span>
          </p>
          <!-- old_agent_authorization -->
          <p v-if="item.license_img_url" class="cell-top-right-row">
            <span class="label">旧版授权书</span>
            <span class="value">
              <el-button
                v-if="item.old_agent_authorization"
                @click="preview2(item.old_agent_authorization)"
                class="edit"
                type="text"
                size="small"
                >查看</el-button
              >
              <span v-else>未上传</span>
            </span>
          </p>
        </div>
      </div>
      <el-divider content-position="left">授权管理员</el-divider>
      <div class="cell-buttom">
        <el-button
          v-show="item.admin_list.length != data.adminList.length"
          type="primary"
          class="addButtom"
          size="small"
          @click="addAdmin(item)"
          icon="el-icon-circle-plus-outline"
          plain
          >新增授权管理员</el-button
        >
        <el-table border :data="item.admin_list" style="width: 100%">
          <el-table-column prop="admin_account" label="登录名" width="220px">
          </el-table-column>
          <el-table-column prop="admin_name" label="真实姓名">
          </el-table-column>
          <el-table-column prop="id_number" label="身份证号" width="180px">
          </el-table-column>
          <el-table-column
            prop="admin_phone_number"
            label="手机号码"
            width="120px"
          >
          </el-table-column>
          <el-table-column prop="admin_email" label="电子邮箱" width="250px">
          </el-table-column>
          <el-table-column prop="is_super" label="权限" width="100">
            <template slot-scope="scope">
              <span>{{
                scope.row.is_super == 0 ? '普通管理员' : '超级管理员'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授权书" width="80px">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.authorization_file != ' '"
                class="check"
                @click="check(scope.row.authorization_file)"
                type="text"
                size="small"
                >查看</el-button
              >
              <span v-show="scope.row.authorization_file == ' '">未上传</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="140">
            <template slot-scope="scope">
              {{ timeStr(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="audit_status" label="状态" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row, item.creditor_name)"
                class="edit"
                type="text"
                size="small"
                >审核</el-button
              >
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      custom-class="creditorDialog"
      title="新增授权管理员"
      :visible.sync="adminAddType"
      center
    >
      <el-form
        :model="data.setAdmin"
        :rules="data.rules"
        ref="setAdminForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择管理员" prop="admin_id">
          <el-col :span="18">
            <el-select
              v-model="data.setAdmin.admin_id"
              placeholder="请选择账号管理员"
            >
              <el-option
                v-for="item in data.adminList2"
                :key="item.admin_id"
                :label="item.admin_name"
                :value="item.admin_id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="授权书" prop="authorization_file">
          <el-col :span="8">
            <el-upload
              :on-preview="preview"
              :on-exceed="exceed"
              :limit="1"
              :action="burl + '/Upload/UploadImage?type=7'"
              :on-change="handleChange"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('authorization_file', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传授权书</el-button>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <div style="line-height: 1.5;">
              <span style="font-size:12px;color:#606366;display:block;"
                >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span
              >
              <el-link style="font-size:12px;" @click="upSq" type="success"
                >下载授权委托书模板</el-link
              >
            </div>
          </el-col>
        </el-form-item>
        <div style="text-align: center;">
          <el-button @click="addConfirm" type="primary">确定</el-button>
          <el-button @click="adminAddType = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      custom-class="creditorDialog"
      title="债权人审核"
      :visible.sync="data.show"
    >
      <el-row style="min-height:40px;line-height:40px;">
        <el-col :span="4" class="lable">审核状态</el-col>
        <el-col :span="18">
          <el-radio-group v-model="data.row.audit_status">
            <el-radio label="Audit_states_0">待审核</el-radio>
            <el-radio label="Audit_states_1">未通过</el-radio>
            <el-radio label="Audit_states_2">已通过</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px;">
        <el-col style="position: relative;top:-20px;" :span="4" class="lable">
          <p>审核反馈</p>
          <span style="font-size:12px;color:#909399;"
            >(此处反馈将直接反馈给用户)</span
          >
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            placeholder="请输入反馈"
            v-model="data.row.audit_feedback"
            show-word-limit
            :rows="6"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="position: relative;top:-7px;" :span="4" class="lable"
          >后台备注</el-col
        >
        <el-col :span="18">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="data.row.back_remarks"
            show-word-limit
            :rows="6"
          >
          </el-input>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-top:20px;">
        <el-button type="primary" @click="examine3">确定</el-button>
        <el-button @click="data.show = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./creditor.ts"></script>
<style lang="scss">
@import './creditor.scss';
</style>
