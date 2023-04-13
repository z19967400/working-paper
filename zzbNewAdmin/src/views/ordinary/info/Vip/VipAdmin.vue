<template>
  <div class="userAdmin-wrap">
    <div class="ordinaryAdmin-box">
      <div id="section1" class="right">
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">基础信息</span>
            <el-button
              class="edit"
              type="text"
              size="small"
              @click="editBasicInfo()"
              >{{ data.BasicInfoType ? '取消' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p
                style="display:flex;"
                v-for="(item2, index2) in item"
                :key="index2"
              >
                <span class="text-lable">{{ item2.name }}</span>
                <span
                  class="text-value"
                  v-if="item2.prop != 'head_img' && !data.BasicInfoType"
                  >{{ item2.value }}</span
                >
                <el-input
                  class="text-input"
                  v-if="
                    item2.prop != 'head_img' &&
                      data.BasicInfoType &&
                      item2.prop != 'register_source'
                  "
                  v-model="item2.value"
                ></el-input>
                <img
                  class="head_img"
                  v-if="item2.prop == 'head_img'"
                  :src="
                    item2.value ||
                      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  "
                />
                <span
                  class="text-value"
                  v-if="item2.prop == 'register_source' && data.BasicInfoType"
                  >{{ item2.value }}</span
                >
              </p>
            </div>
          </div>
          <el-button
            v-if="data.BasicInfoType"
            size="small"
            type="primary"
            @click="saveBasicInfo()"
            >保存</el-button
          >
        </div>
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">支付管理</span>
            <el-button
              class="edit"
              @click="paySetTypeEdit = !paySetTypeEdit"
              type="text"
              size="small"
              >{{ paySetTypeEdit ? '返回' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <!-- 支付管理展示 -->
          <div v-if="!paySetTypeEdit" class="box">
            <div class="text">
              <p>
                <span>先催后付</span>
                <span>
                  {{ data.pay_set.is_postpaid == 1 ? '开通' : '未开通' }}</span
                >
              </p>
              <p>
                <span>标准AI律师函</span>
                <span>{{ data.pay_set.standard_ai_price }} 元</span>
              </p>
              <p>
                <span>电子AI律师函</span>
                <span>{{ data.pay_set.electron_ai_price }} 元</span>
              </p>
            </div>
          </div>
          <!-- 支付管理编辑 -->
          <el-form
            :model="edit.pay_set"
            :rules="edit.pay_setRules"
            label-width="120px"
            class="demo-ruleForm"
            v-if="paySetTypeEdit"
          >
            <div class="box">
              <div class="text">
                <el-form-item label="先催后付">
                  <el-radio-group v-model="edit.pay_set.is_postpaid">
                    <el-radio :label="0">关闭</el-radio>
                    <el-radio :label="1">开通</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="标准AI律师函" prop="standard_ai_price">
                  <el-input v-model="edit.pay_set.standard_ai_price"></el-input>
                </el-form-item>
                <el-form-item label="电子AI律师函" prop="electron_ai_price">
                  <el-input v-model="edit.pay_set.electron_ai_price"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="paySetEdit" type="primary">保存</el-button>
                  <el-button @click="paySetTypeEdit = false">取消</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <!-- AI律师函赠送 -->
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">赠送服务</span>
            <el-button
              class="edit"
              @click="zengson = !zengson"
              type="text"
              size="small"
              >{{ zengson ? '返回' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <p v-if="!zengson" style="font-size:12px;color:#606266;">
              赠送AI律师函总数量/已使用&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="font-size:16px;">{{
                present.ai_lawyer_letter_total_quantity
              }}</span
              >&nbsp;/&nbsp;<span style="font-size:16px;">{{
                present.ai_lawyer_letter_used_quantity
              }}</span>
            </p>
            <div v-else>
              <el-row style="display:flex;">
                <span
                  style="width:200px;display:inline-block;color:#606366;"
                  class="label"
                  >赠送AI律师函总数量</span
                >
                <el-input size="small" v-model="total_quantity"></el-input>
              </el-row>
              <el-row>
                <el-button
                  style="margin-left:135px;"
                  size="small"
                  @click="zengsonBtn"
                  type="primary"
                  >保存</el-button
                >
                <el-button
                  size="small"
                  @click="
                    () => {
                      ;(zengson = false), total_quantity
                    }
                  "
                  >取消</el-button
                >
              </el-row>
            </div>
          </div>
        </div>
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">设置客服及付款时间</span>
          </span>
          <el-divider></el-divider>
          <el-row>
            <span class="lable">专属客服</span>
            <el-select
              style="width:180px;margin:0 20px;"
              size="small"
              v-model="data.customer_service_admin_id"
            >
              <el-option
                v-for="(item, index) in customers"
                :key="index"
                :label="item.real_name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button size="small" type="primary" @click="setCustomer" plain
              >保存</el-button
            >
            <span style="margin-left:20px;" class="lable">用户付款账期</span>
            <el-input
              style="width:100px;margin-left:20px;margin-right:10px;"
              size="small"
              v-model="data.last_payment_time"
            ></el-input>
            <span style="color:#606366;font-size:12px;">日</span>

            <el-button
              size="small"
              style="margin-left:20px;"
              type="primary"
              @click="setPaymentTime"
              plain
              >保存</el-button
            >
          </el-row>
        </div>
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">账号管理员</span>
          </span>
          <el-button
            type="primary"
            style="float: right"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="VipAdminEdit('add')"
            plain
            >新增管理员</el-button
          >
          <el-divider></el-divider>
          <el-table
            :data="data.admin_list"
            :max-height="500"
            center
            border
            style="width: 100%"
          >
            <el-table-column fixed prop="admin_id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="admin_account" label="登录名">
            </el-table-column>
            <el-table-column prop="admin_name" label="真实姓名" width="120">
            </el-table-column>
            <el-table-column prop="id_number" label="身份证号" width="180">
            </el-table-column>
            <el-table-column
              prop="admin_phone_number"
              label="手机号码"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="admin_email" label="电子邮箱">
            </el-table-column>
            <el-table-column prop="is_super" label="权限" width="100">
            </el-table-column>
            <el-table-column prop="delete_state" label="状态" width="150">
              <template slot-scope="scope">
                <span>{{
                  scope.row.delete_state == -1
                    ? `已删除(${scope.row.delete_time})`
                    : '正常'
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="150">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  @click="VipAdminEdit(scope.row)"
                  type="text"
                  style="color:#E6A23C;"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="openSandpass(scope.row)"
                  type="text"
                  style="color:#67C23A;"
                  size="small"
                  >登录密码</el-button
                >
                <el-button
                  @click="deleteAdmin(scope.row.admin_id)"
                  type="text"
                  style="color:#ec193a;"
                  :disabled="scope.row.delete_state == -1"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">
              债权人
              <span style="color:#606366;font-size:12px;font-weight: normal;"
                >共有{{ data.creditorList.length }}条数据</span
              >
            </span>
          </span>
          <el-button
            type="primary"
            style="float: right"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="creditorEditFc('add')"
            plain
            >新增债权人</el-button
          >
          <el-divider></el-divider>
          <creditor
            @setAdmin="setAdmin"
            :burl="burl"
            :adminList="data.admin_list"
            @deleteSqAdmin="deleteSqAdmin"
            @openAdminSh="openAdminSh"
            @DeleteCreditor="DeleteCreditor"
            @creditorEditFc="creditorEditFc"
            :Creditors="data.creditorList"
            @init="init"
          ></creditor>
        </div>
        <div class="section">
          <remark :id="this.$route.params.id" :remarks_type="1" />
          <!-- <span style="margin-top:0;">
            <span class="title">后台备注</span>
          </span>
          <el-divider></el-divider>
          <el-form>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="24"
                v-model="data.back_remarks"
              ></el-input>
            </el-form-item>
            <el-button
              style="margin-left:140px;"
              type="primary"
              @click="SaveNotes"
              size="small"
              >保存</el-button
            >
          </el-form> -->
        </div>
      </div>
      <!-- 弹窗 -->
      <el-dialog
        custom-class="creditorDialog"
        :title="adminEditData.admin_id == 0 ? '新增管理员' : '管理员编辑'"
        :visible.sync="adminEditType"
        center
      >
        <el-form :model="adminEditData" label-width="140px">
          <el-form-item label="登录名">
            <el-col :span="18">
              <el-input
                placeholder="请填写登录名"
                v-model="adminEditData.admin_account"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-col :span="18">
              <el-input
                placeholder="请填写真实姓名"
                v-model="adminEditData.admin_name"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-col :span="18">
              <el-input
                placeholder="请填写身份证号"
                v-model="adminEditData.id_number"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-col :span="18">
              <el-input
                placeholder="请填写手机号码"
                v-model="adminEditData.admin_phone_number"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-col :span="18">
              <el-input
                placeholder="请填写电子邮箱"
                v-model="adminEditData.admin_email"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="权限">
            <el-col :span="18">
              <el-radio-group v-model="adminEditData.is_super">
                <el-radio :label="0">普通管理员</el-radio>
                <el-radio :label="1">超级管理员</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <div style="text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="adminEditType = !adminEditType">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 发送密码 -->
      <el-dialog
        custom-class="creditorDialog"
        title="发送登录密码"
        :visible.sync="sandPassWordShow"
        center
      >
        <el-form :model="sandPassWordData" label-width="140px">
          <el-form-item label="登录名">
            <span>{{ sandPassWordData.admin_account }}</span>
          </el-form-item>
          <el-form-item label="真实姓名">
            <span>{{ sandPassWordData.admin_name }}</span>
          </el-form-item>
          <el-form-item label="发送对象">
            <el-select v-model="sandType">
              <el-option label="用户" value="用户"></el-option>
              <el-option label="客服" value="客服"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-col :span="18">
              <el-input
                v-if="sandType == '用户'"
                placeholder="请填写电子邮箱"
                v-model="sandPassWordData.toAddress"
              ></el-input>
              <el-select style="width:100%;" v-else v-model="toAddress">
                <el-option
                  v-for="(item, index) in customers"
                  :key="index"
                  :label="item.real_name + '_' + item.email"
                  :value="item.email"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sandPassWord">确定</el-button>
            <el-button @click="sandPassWordShow = !sandPassWordShow"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑债权人 -->
      <el-dialog
        custom-class="creditorDialog"
        :title="creditorEdit.id == 0 ? '新增债权人' : '债权人编辑'"
        :visible.sync="creditorEditShow"
        center
      >
        <el-form
          v-loading="loading"
          :model="creditorEdit"
          :inline="true"
          class="demo-form-inline demo-ruleForm"
          label-width="135px"
        >
          <el-form-item
            style="display:flex;"
            v-if="creditorEdit.id == 0"
            label="管理员"
          >
            <el-select
              style="width:330px;"
              v-model="data.adminSelectData"
              value-key="id"
              @change="adminSelect"
            >
              <el-option
                v-for="item in data.admin_list2"
                :key="item.id"
                :label="item.admin_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="display:flex;" label="营业执照">
            <el-col class="upBox" :span="20">
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
                  v-if="creditorEdit.license_img_url"
                  :src="creditorEdit.license_img_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  营业执照为最新版原文件拍照照片，要求文件四角都在图片内，清晰无遮挡，图片水印不可与办理业务无关。支持jpg、jpeg、png格式文件，文件须小于10M
                </div>
              </el-upload>
            </el-col>
            <!-- <i v-show="creditorEdit.license_img_url" @click="preview(creditorEdit.license_img_url)" class="el-icon-zoom-in preview"></i> -->
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input
              style="width:330px;"
              placeholder="上传证照自动填充"
              v-model="creditorEdit.license_no"
            ></el-input>
          </el-form-item>
          <el-form-item label="债权人名称">
            <el-input
              style="width:330px;"
              placeholder="上传证照自动填充"
              v-model="creditorEdit.creditor_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公地址">
            <el-input
              style="width:330px;"
              placeholder="请填写办公地址"
              v-model="creditorEdit.detailed_address"
            ></el-input>
          </el-form-item>
          <div style="text-align: center;">
            <el-button type="primary" @click="creditorSubmit">确定</el-button>
            <el-button @click="creditorEditShow = !creditorEditShow"
              >取消</el-button
            >
          </div>
        </el-form>
      </el-dialog>
      <!-- 债权人管理员审核 -->
      <el-dialog
        custom-class="creditorDialog shenhe"
        title="授权管理员审核"
        :visible.sync="creditorshenhShow"
        center
      >
        <div class="shenhe-box">
          <el-row>
            <el-col :span="5" class="lable">债权人名称</el-col>
            <el-col class="value" :span="8">{{
              shenheCreditor.creditor_name
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">管理员姓名</el-col>
            <el-col class="value" :span="8">{{
              shenheCreditor.admin_name
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">营业执照</el-col>
            <el-col style="position: relative;top:4px;" :span="12">
              <img
                class="img"
                @click="preview(shenhe.license_img_url)"
                :src="shenhe.license_img_url"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">代理人授权书</el-col>
            <el-col style="position: relative;top:8px;" :span="8">
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
            <el-col style="position: relative;top:5px;" :span="8">
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
            <el-form-item>
              <template slot="label">
                <span style="position: relative;top:-10px;">
                  审核反馈
                  <span style="font-size:12px;color:#909399;display:block;"
                    >(此处反馈将直接反馈给用户)</span
                  >
                </span>
              </template>
              <el-col :span="20">
                <span></span>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="审核反馈将呈现给用户"
                  v-model="shenhe.audit_feedback"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span style="position: relative;top:-10px;">后台备注</span>
              </template>
              <el-col :span="20">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="后台备注仅后台查看"
                  v-model="shenhe.back_remarks"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <el-divider
            v-if="shenheCreditor.history.length > 0"
            content-position="left"
            >授权委托书更换记录</el-divider
          >
          <div style="padding-bottom:20px;">
            <el-table
              v-show="shenheCreditor.history.length > 0"
              :data="shenheCreditor.history"
              border
              max-height="300"
              style="width: 80%;margin:auto;"
            >
              <el-table-column prop="authorization_file" label="授权委托书文件">
                <template slot-scope="scope">
                  <div
                    style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;"
                  >
                    <span
                      @click="preview(scope.row.authorization_file)"
                      style="color:rgb(103, 194, 58);cursor: pointer;"
                      >{{ sblicet(scope.row.authorization_file) }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="create_time" label="更换时间" width="180">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div style="text-align: center;">
          <el-button type="primary" @click="shenheSubmit">确定</el-button>
          <el-button @click="creditorshenhShow = !creditorshenhShow"
            >取消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="footer">
      <el-button @click="goBaack" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./VipAdmin.ts"></script>
<style lang="scss">
@import './VipAdmin.scss';
</style>
