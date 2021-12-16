<template>
  <div class="creditor-wrap">
    <div v-for="(item, index) in data.list" :key="index" class="cell">
      <span class="marke">{{ index + 1 }}</span>
      <span class="marke2">债权人ID：{{ item.id }}</span>
      <span
        style="margin-right:10px;color:#E6A23C;"
        @click="examine(item)"
        class="cell-delect"
        >审核</span
      >
      <div class="cell-top">
        <div class="cell-top-left">
          <img
            :class="[item.license_img_url ? 'qiye' : '']"
            @click="check(item.license_img_url || item.id_card_img_01)"
            :src="item.license_img_url || item.id_card_img_01"
            alt=""
          />
          <img
            v-if="!item.license_img_url"
            @click="check(item.id_card_img_02)"
            :src="item.id_card_img_02"
            alt=""
          />
        </div>
        <div class="cell-top-right">
          <p class="cell-top-right-row">
            <span class="label">债权人名称</span>
            <span class="value">{{ item.creditor_name || '未填写' }}</span>
          </p>
          <p
            v-show="item.creditor_type_code != 'Creditor_states_1'"
            class="cell-top-right-row"
          >
            <span class="label">统一社会信用代码</span>
            <span class="value">{{ item.license_no || '未填写' }}</span>
          </p>
          <p
            v-show="item.creditor_type_code != 'Creditor_states_1'"
            class="cell-top-right-row"
          >
            <span class="label">办公地址</span>
            <span class="value">{{ item.detailed_address || '未填写' }}</span>
          </p>
          <p
            v-show="item.creditor_type_code == 'Creditor_states_1'"
            class="cell-top-right-row"
          >
            <span class="label">身份证号码</span>
            <span class="value">{{ item.ID_crad || '未填写' }}</span>
          </p>
          <p
            v-show="item.creditor_type_code == 'Creditor_states_1'"
            class="cell-top-right-row"
          >
            <span class="label">手机号码</span>
            <span class="value">{{ item.phone_number || '未填写' }}</span>
          </p>
          <p
            v-if="item.creditor_type_code != 'Creditor_states_1'"
            class="cell-top-right-row"
          >
            <span class="label">创建人</span>
            <span class="value">{{ item.create_name || '未填写' }}</span>
          </p>
          <!-- old_agent_authorization -->
          <p class="cell-top-right-row">
            <span class="label">创建时间</span>
            <span class="value">{{ item.certification_time || '未填写' }}</span>
          </p>
          <p class="cell-top-right-row">
            <span class="label">审核状态</span>
            <span class="value">{{ item.audit_status_name }}</span>
          </p>
          <p v-show="item.audit_feedback" class="cell-top-right-row">
            <span class="label">
              <p>审核反馈</p>
              <span style="font-size:12px;color:#909399;"
                >(此处反馈将直接反馈给用户)</span
              >
            </span>
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
              <span v-else>无</span>
            </span>
          </p>
        </div>
      </div>
      <el-divider v-if="item.admin_list.length > 0" content-position="left"
        >授权管理员</el-divider
      >
      <div v-if="item.admin_list.length > 0" class="cell-buttom">
        <el-table border :data="item.admin_list" style="width: 100%">
          <el-table-column prop="admin_account" label="登录名" width="220px">
          </el-table-column>
          <el-table-column prop="admin_name" label="真实姓名" width="220px">
          </el-table-column>
          <el-table-column prop="id_number" label="身份证号" width="180px">
          </el-table-column>
          <el-table-column
            prop="admin_phone_number"
            label="手机号码"
            width="120px"
          >
          </el-table-column>
          <el-table-column prop="admin_email" label="电子邮箱" width="280px">
          </el-table-column>
          <el-table-column label="授权书" width="80px">
            <template slot-scope="scope">
              <span v-if="scope.row.authorization_file === ''">未上传</span>
              <el-button
                v-else
                class="check"
                @click="check(scope.row.authorization_file)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ strSub(scope.row.audit_status) }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row)"
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
      title="管理员审核"
      :visible.sync="adminAddType"
      center
    >
      <div class="shenhe-box">
        <el-row>
          <el-col :span="5" class="lable">授权书</el-col>
          <el-col :span="8">
            <div
              v-if="
                shenhe.authorization_file != null &&
                  shenhe.authorization_file != ''
              "
            >
              <img
                class="img"
                v-if="substr(shenhe.authorization_file) !== '.pdf'"
                @click="preview(shenhe.authorization_file)"
                :src="shenhe.authorization_file"
              />
              <el-link
                v-else
                type="success"
                @click="preview(shenhe.authorization_file)"
                >{{ sblicet(shenhe.authorization_file) }}</el-link
              >
            </div>
            <el-upload
              :on-preview="preview"
              :on-exceed="exceed"
              :limit="1"
              :action="burl + '/Upload/UploadImage?type=7&original_name=true'"
              :on-change="handleChange"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('authorization_file', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">更换授权书</el-button>
            </el-upload>
          </el-col>
          <el-col :span="8">
            <div style="line-height: 1.5;">
              <span style="font-size:12px;color:#606366;display:block;"
                >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span
              >
              <el-link style="font-size:12px;" @click="upSq" type="success"
                >下载授权委托书模板</el-link
              >
            </div>
          </el-col>
        </el-row>
        <el-form :model="shenhe" label-width="120px">
          <el-form-item label="审核状态">
            <el-radio-group v-model="shenhe.audit_status">
              <el-radio label="Audit_states_0">待审核</el-radio>
              <el-radio label="Audit_states_1">未通过</el-radio>
              <el-radio label="Audit_states_2">已通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核反馈">
            <el-col :span="18">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="审核反馈将呈现给用户"
                v-model="shenhe.audit_feedback"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="后台备注">
            <el-col :span="18">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="后台备注仅后台查看"
                v-model="shenhe.back_remarks"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" @click="examine2">确定</el-button>
        <el-button @click="adminAddType = false">取消</el-button>
      </div>
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
        <el-col :span="4" class="lable">审核反馈</el-col>
        <el-col :span="18" class="lable">
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
        <el-col :span="4" class="lable">后台备注</el-col>
        <el-col :span="18" class="lable">
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
