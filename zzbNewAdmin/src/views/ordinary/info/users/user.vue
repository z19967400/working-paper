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
            <span class="title">设置客服及付款时间</span>
          </span>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="2">
              <span class="lable">专属客服</span>
            </el-col>
            <el-col :span="2">
              <el-select size="small" v-model="data.customer_service_admin_id">
                <el-option
                  v-for="(item, index) in customers"
                  :key="index"
                  :label="item.real_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:20px;" :span="2">
              <el-button size="small" type="primary" @click="setCustomer" plain
                >保存</el-button
              >
            </el-col>
            <el-col :span="2">
              <span class="lable">最后付款日期</span>
            </el-col>
            <el-col :span="3">
              <el-input
                size="small"
                v-model="data.last_payment_time"
              ></el-input>
            </el-col>
            <el-col style="margin-left:20px;" :span="2">
              <el-button
                size="small"
                type="primary"
                @click="setPaymentTime"
                plain
                >保存</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="section">
          <span style="margin-top:0;">
            <span class="title">债权人</span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table :data="data.creditorData" border style="width: 100%">
              <el-table-column prop="id" label="ID"> </el-table-column>
              <el-table-column prop="creditor_name" label="债权人名称">
              </el-table-column>
              <el-table-column prop="creditor_type" label="类型">
              </el-table-column>
              <el-table-column prop="phone_number" label="手机号码">
              </el-table-column>
              <el-table-column prop="email" label="电子邮箱"> </el-table-column>
              <el-table-column prop="audit_status" label="审核状态">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间">
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    class="info"
                    type="text"
                    size="small"
                    @click="creditorEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    class="examine"
                    type="text"
                    size="small"
                    @click="creditorShenhe(scope.$index, scope.row)"
                    >审核</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="creditorDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="section">
          <remark :id="this.$route.params.id" :remarks_type="2"></remark>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button @click="goBaack" type="primary">返回</el-button>
    </div>
    <!-- dialog -->
    <!-- 企业债权人编辑 -->
    <el-dialog
      custom-class="creditorDialog"
      title="债权人编辑"
      :visible.sync="creditorEditShow1"
      center
    >
      <el-form v-loading="loading" :model="userData" label-width="140px">
        <el-form-item
          label="上传营业执照"
          prop="license_img_url"
          class="zhengzhao"
        >
          <el-col class="upBox" :span="20">
            <el-upload
              drag
              class="avatar-uploader"
              :action="burl + '/Upload/UploadImage?type=7'"
              :show-file-list="false"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('license_img_url', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="userData.license_img_url"
                :src="userData.license_img_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                营业执照为最新版原文件拍照照片，要求文件四角都在图片内，清晰无遮挡，图片水印不可与办理业务无关。支持jpg、jpeg、png格式文件，文件须小于10M
              </div>
            </el-upload>
            <i
              v-show="userData.license_img_url"
              @click="preview(userData.license_img_url)"
              class="el-icon-search preview"
              ><span class="preview-text">+</span></i
            >
            <span class="upBox-tip">可将文件拖曳至框内上传</span>
          </el-col>
        </el-form-item>
        <el-form-item label="授权书">
          <el-col :span="8">
            <el-upload
              :on-preview="preview"
              :on-exceed="exceed"
              :limit="1"
              :action="burl + '/Upload/UploadImage?type=7'"
              :on-change="handleChange"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('agent_authorization', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
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
        <el-form-item label="债权人名称">
          <el-col :span="18">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="userData.creditor_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-col :span="18">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="userData.license_no"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员姓名">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="userData.agent_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员身份证号">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="userData.agent_id_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员手机号码">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="userData.phone_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员电子邮箱">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="userData.email"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creditorEditShow1 = false">取 消</el-button>
        <el-button type="primary" @click="creditorEditClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人债权人编辑 -->
    <el-dialog
      custom-class="creditorDialog"
      title="债权人编辑"
      :visible.sync="creditorEditShow2"
      center
    >
      <el-form v-loading="loading" :model="userData" label-width="120px">
        <el-form-item label="身份证人像面" class="zhengzhao">
          <el-col class="upBox" :span="20">
            <el-upload
              drag
              class="avatar-uploader"
              :action="burl + '/Upload/UploadImage?type=7'"
              :show-file-list="false"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('id_card_img_01', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="userData.id_card_img_01"
                :src="userData.id_card_img_01"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <i
              v-show="userData.id_card_img_01"
              @click="preview(userData.id_card_img_01)"
              class="el-icon-search preview"
              ><span class="preview-text">+</span></i
            >
            <span class="upBox-tip">可将文件拖曳至框内上传</span>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证国徽面" class="zhengzhao">
          <el-col class="upBox" :span="20">
            <el-upload
              drag
              class="avatar-uploader"
              :action="burl + '/Upload/UploadImage?type=7'"
              :show-file-list="false"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('id_card_img_02', res, file)
                }
              "
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="userData.id_card_img_02"
                :src="userData.id_card_img_02"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <i
              v-show="userData.id_card_img_02"
              @click="preview(userData.id_card_img_02)"
              class="el-icon-search preview"
              ><span class="preview-text">+</span></i
            >
            <span class="upBox-tip">可将文件拖曳至框内上传</span>
          </el-col>
        </el-form-item>
        <el-form-item label="债权人名称">
          <el-col :span="18">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="userData.creditor_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-col :span="18">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="userData.agent_id_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-col :span="18">
            <el-input
              placeholder="请填写手机号码"
              v-model="userData.phone_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="userData.email"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creditorEditShow2 = false">取 消</el-button>
        <el-button type="primary" @click="creditorEditClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 债权人审核 -->
    <el-dialog
      custom-class="creditorDialog shenhe"
      title="债权人审核"
      :visible.sync="creditorshenhShow"
      center
    >
      <div class="shenhe-box">
        <el-divider content-position="left">债权人信息</el-divider>
        <el-row v-if="userData.creditor_type === 'Creditor_states_1'">
          <el-col :span="5" class="lable">身份证人像面</el-col>
          <el-col :span="12">
            <el-image
              class="img"
              :src="userData.id_card_img_01"
              :preview-src-list="data.srcList"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="5" class="lable">营业执照</el-col>
          <el-col :span="12">
            <el-image
              class="img"
              :src="userData.license_img_url"
              :preview-src-list="data.srcList"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row v-if="userData.creditor_type === 'Creditor_states_1'">
          <el-col :span="5" class="lable">身份证国徽面</el-col>
          <el-col :span="12">
            <el-image
              class="img"
              :src="userData.id_card_img_02"
              :preview-src-list="data.srcList"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="5" class="lable">管理员授权书</el-col>
          <el-col :span="12">
            <el-image
              v-if="substr(userData.agent_authorization) !== 'pdf'"
              class="img"
              :src="userData.agent_authorization"
              :preview-src-list="data.srcList"
            >
            </el-image>
            <el-link v-else type="success">{{
              sblicet(userData.agent_authorization)
            }}</el-link>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">债权人名称</el-col>
          <el-col :span="12">{{ userData.creditor_name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="lable">{{
            userData.creditor_type === 'Creditor_states_1'
              ? '身份证号码'
              : '统一社会信用代码'
          }}</el-col>
          <el-col :span="12">{{
            userData.creditor_type === 'Creditor_states_1'
              ? userData.agent_id_number
              : userData.license_no
          }}</el-col>
        </el-row>
        <div v-if="userData.creditor_type === 'Creditor_states_1'">
          <el-row>
            <el-col :span="5" class="lable">手机号码</el-col>
            <el-col :span="12">{{ userData.phone_number }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">电子邮箱</el-col>
            <el-col :span="12">{{ userData.email }}</el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row>
            <el-col :span="5" class="lable">管理员姓名</el-col>
            <el-col :span="12">{{ userData.agent_name }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">管理员身份证号</el-col>
            <el-col :span="12">{{ userData.agent_id_number }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">管理员手机号码</el-col>
            <el-col :span="12">{{ userData.phone_number }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="lable">管理员电子邮箱</el-col>
            <el-col :span="12">{{ userData.email }}</el-col>
          </el-row>
        </div>
        <el-divider content-position="left">审核</el-divider>
        <el-form :model="shenhe" label-width="120px">
          <el-form-item label="审核状态">
            <el-radio-group v-model="shenhe.audit_status">
              <el-radio label="Audit_states_0">待审核</el-radio>
              <el-radio label="Audit_states_1">未通过</el-radio>
              <el-radio label="Audit_states_2">已通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核反馈">
            <el-col :span="20">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="审核反馈将呈现给用户"
                v-model="shenhe.audit_feedback"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="后台备注">
            <el-col :span="20">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="后台备注仅后台查看"
                v-model="shenhe.back_remarks"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="creditorshenhShow = !creditorshenhShow"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./user.ts"></script>
<style lang="scss">
@import './user.scss';
</style>
