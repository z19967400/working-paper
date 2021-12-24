<template>
  <div class="creditorAdmin">
    <el-input
      v-model="searchVal"
      placeholder="请输入关键字查询"
      size="small"
      class="serch"
    ></el-input>
    <el-button
      style="margin-left:10px;"
      @click="searchVal = ''"
      plain
      type="primary"
      size="small"
      >清空</el-button
    >
    <div class="creditorAdmin-list">
      <div
        v-for="(item, index) in data.list.filter(
          data =>
            !this.searchVal ||
            data.creditor_name
              .toLowerCase()
              .includes(this.searchVal.toLowerCase())
        )"
        :key="index"
        class="cell"
      >
        <span class="icon">{{ index + 1 }}</span>
        <span style="margin-left:10px;color:#606366;font-size:14px;"
          >债权人ID：{{ item.creditor_id }}</span
        >
        <!-- <span
          v-show="is_super == 1"
          @click="delect(item.creditor_id)"
          class="cell-delect"
          >删除债权人</span
        > -->
        <div class="cell-top">
          <div class="cell-top-left">
            <img
              @click="check(item.license_img_url)"
              :src="item.license_img_url"
              alt=""
            />
          </div>
          <div class="cell-top-right">
            <p class="cell-top-right-row">
              <span class="label">债权人名称</span>
              <span class="value">{{ item.creditor_name || "未填写" }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">统一社会信用代码</span>
              <span class="value">{{ item.license_no || "未填写" }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">办公地址</span>
              <span class="value">{{ item.detailed_address || "未填写" }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">创建人</span>
              <span class="value">{{ item.create_name || "未填写" }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">创建时间</span>
              <span class="value">{{ item.create_time || "未填写" }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">审核状态</span>
              <span class="value">{{
                getAuditstatusText(item.audit_status)
              }}</span>
            </p>
            <p class="cell-top-right-row">
              <span class="label">审核反馈</span>
              <span class="value">{{ item.audit_feedback || "未填写" }}</span>
            </p>
          </div>
        </div>
        <el-divider content-position="left">授权管理员</el-divider>
        <div class="cell-buttom">
          <el-button
            v-show="is_super == 1"
            class="addButtom"
            @click="openAddAdmin(item.creditor_id, item.creditor_name)"
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            >新增授权管理员</el-button
          >
          <el-table border :data="item.admin_list" style="width: 100%">
            <el-table-column prop="admin_account" label="登录名" width="180px">
            </el-table-column>
            <el-table-column prop="admin_name" label="真实姓名" width="180px">
            </el-table-column>
            <el-table-column prop="id_number" label="身份证号" width="180px">
            </el-table-column>
            <el-table-column
              prop="admin_phone_number"
              label="手机号码"
              width="120px"
            >
            </el-table-column>
            <el-table-column prop="admin_email" label="电子邮箱" width="220px">
            </el-table-column>
            <el-table-column label="授权书" width="80px">
              <template slot-scope="scope">
                <el-button
                  class="check"
                  @click="check(scope.row.authorization_file)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="audit_status" label="状态" width="80px">
            </el-table-column>
            <el-table-column label="创建时间" width="150px">
              <template slot-scope="scope">
                {{ timeStr(scope.row.create_time) }}
              </template>
            </el-table-column>
            <el-table-column prop="audit_feedback" label="审核反馈">
            </el-table-column>

            <!-- <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  class="edit"
                  type="text"
                  size="small"
                  >编辑</el-button
                > -->
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button> -->
            <!-- </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button
        class="addButtom"
        type="primary"
        @click="openAddCreditor"
        size="small"
        icon="el-icon-circle-plus-outline"
        >新增债权人</el-button
      >
      <el-button
        v-show="is_super != '1'"
        type="primary"
        @click="openAddCreditorAdmin"
        size="small"
        icon="el-icon-circle-plus-outline"
        >新增授权管理员</el-button
      >
    </div>
    <addAdmin
      :creditor_name="creditor_name"
      :adminIds="adminIds"
      :dialogFormVisible="dialogFormVisible"
      @hanlAddAdmin="hanlAddAdmin"
      @addAdminClose="addAdminClose"
    ></addAdmin>
    <editAdmin
      :dialogFormVisible="dialogFormVisible2"
      :edit="data.edit"
      @editAdminClose="editAdminClose"
    ></editAdmin>
    <!-- 新增债权人 弹框 -->
    <el-dialog
      custom-class="addCreditor"
      title="新增债权人"
      @close="closeCreditor"
      :visible.sync="dialogFormVisible3"
    >
      <addForms
        ref="changdialog"
        :parentId="parentId"
        @csh="addParams"
        @cancel="closeCreditor"
      ></addForms>
    </el-dialog>
    <!-- 新增授权管理员 -->
    <el-dialog
      custom-class="addCreditor"
      :visible.sync="data.UploadAuthorization"
      title="新增授权管理员"
    >
      <el-table
        v-if="!data.editAdminType"
        :max-height="550"
        :data="
          data.creditorList.filter(
            data =>
              !this.data.search ||
              data.creditor_name
                .toLowerCase()
                .includes(this.data.search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" width="80px"> </el-table-column>
        <el-table-column label="债权人名称" prop="creditor_name">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="data.search"
              size="mini"
              placeholder="输入关键字搜索"
            />
            <span>{{ scope.creditor_name }}</span>
          </template>
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.creditor_admin_audit_status == ''"
              size="mini"
              type="text"
              style="color:#409EFF;"
              @click="UploadAuthorization(scope.row)"
              >上传授权委托书</el-button
            >
            <span
              :style="{
                color:
                  scope.row.creditor_admin_audit_status == '已授权'
                    ? '#67C23A'
                    : scope.row.creditor_admin_audit_status == '待审核' ||
                      scope.row.creditor_admin_audit_status == '审核中'
                    ? '#E6A23C'
                    : '#ec193a'
              }"
              v-else
              >{{ scope.row.creditor_admin_audit_status }}</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form
        v-else
        style="width:90%;margin:auto;margin-top:20px;"
        ref="editcedriorFrom2"
        :rules="data.rules2"
        label-width="140px"
        class="addAdmin-xx"
        v-loading="data.submitType"
      >
        <el-form-item label="债权人名称">
          <span>{{ data.editAdmin.creditor_name }}</span>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <span>{{ data.editAdmin.license_no }}</span>
        </el-form-item>
        <el-form-item label="当前管理员">
          <span>{{ adminName }}</span>
        </el-form-item>
        <el-form-item style="margin-bottom:0px;">
          <template slot="label">
            <span class="xinghao">管理员授权书</span>
          </template>
          <el-link
            style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
            @click="upSq"
            type="success"
            >下载授权书模板</el-link
          >
        </el-form-item>
        <el-form-item prop="authorization_file">
          <el-col :span="10" class="editAdmin">
            <el-upload
              class="upload-demo"
              :on-preview="preview2"
              :on-exceed="exceed"
              :limit="1"
              :action="burl + '/Upload/UploadImage?type=7'"
              :on-change="handleChange"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess2(res, file);
                }
              "
              :before-upload="beforeAvatarUpload2"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传授权书</el-button>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <div style="line-height: 1.5;">
              <span
                style="font-size:12px;color:#606366;display:block;position: relative;top:-27px;"
                >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
              >
              <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                    >下载授权委托书模板</el-link
                  > -->
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button
          type="primary"
          :disabled="data.submitType"
          @click="submitForm('editcedriorFrom2')"
          >确定</el-button
        >
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./creditorAdmin.ts"></script>
<style lang="scss">
@import "./creditorAdmin.scss";
</style>
