<template>
  <div class="lawyer-wrap">
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
            <span class="title">律师认证信息</span>
            <el-button
              v-if="data.lawyer != null"
              class=" edit"
              type="text"
              size="small"
              @click="data.authenticationType = !data.authenticationType"
              >{{ data.authenticationType ? '编辑' : '取消' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <span style="color:#ec193a;" v-if="data.lawyer == null">未认证</span>
          <div
            class="lawyerBox"
            v-if="!data.authenticationType && data.lawyer != null"
          >
            <el-row>
              <el-col :span="1">
                <span class="lable">律师姓名</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.lawyer_name"
                  placeholder="请填写律师姓名"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">身份证号</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.lawyer_IDCard"
                  placeholder="请填写身份证号"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">手机号码</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.lawyer_phone_number"
                  placeholder="请填写手机号码"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">电子邮箱</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.lawyer_email"
                  placeholder="请填写电子邮箱"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">律所全称</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.law_firm_name"
                  placeholder="请填写律所全称"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">律所地区</span>
              </el-col>
              <el-col :span="5">
                <!-- <el-input v-model="lawyerEdit.law_firm_address_detailed" placeholder="请填写律所地区"></el-input> -->
                <comAddress
                  @emitAddress="addressEdit"
                  :address="data.address"
                ></comAddress>
              </el-col>
              <el-col :span="1">
                <span class="lable">律所地址</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.law_firm_address_detailed"
                  placeholder="请填写律所地址"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">执业证号</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.license_number"
                  placeholder="请填写执业证号"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">执业证照</span>
              </el-col>
              <el-col :span="5">
                <div class="upBox">
                  <el-upload
                    drag
                    class="avatar-uploader"
                    :action="burl + '/Upload/UploadImage?type=0'"
                    :show-file-list="false"
                    :on-success="
                      (res, file) => {
                        handleAvatarSuccess('practice_license', res, file)
                      }
                    "
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="lawyerEdit.practice_license"
                      :src="
                        `${
                          serchStr(lawyerEdit.practice_license)
                            ? ''
                            : 'https://file.debteehelper.com'
                        }${lawyerEdit.practice_license}`
                      "
                      class="avatar"
                    />
                  </el-upload>
                </div>
              </el-col>
              <el-col :span="1">
                <span class="lable">年检页照</span>
              </el-col>
              <el-col :span="5">
                <div class="upBox">
                  <el-upload
                    drag
                    class="avatar-uploader"
                    :action="burl + '/Upload/UploadImage?type=0'"
                    :show-file-list="false"
                    :on-success="
                      (res, file) => {
                        handleAvatarSuccess('annual_inspection', res, file)
                      }
                    "
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="lawyerEdit.annual_inspection"
                      :src="
                        `${
                          serchStr(lawyerEdit.annual_inspection)
                            ? ''
                            : 'https://file.debteehelper.com'
                        }${lawyerEdit.annual_inspection}`
                      "
                      class="avatar"
                    />
                  </el-upload>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">专业类型</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="lawyerEdit.expertise"
                  placeholder="请填写专业类型"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <span class="lable">简介</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  type="textarea"
                  :rows="6"
                  v-model="lawyerEdit.brief_introduction"
                  placeholder="请填写简介"
                ></el-input>
              </el-col>
            </el-row>
            <el-button
              style="margin-left:70px;"
              type="primary"
              @click="editAuthentication"
              size="small"
              >保存</el-button
            >
          </div>
          <div
            class="lawyerBox"
            v-if="data.authenticationType && data.lawyer != null"
          >
            <el-row>
              <el-col :span="1">
                <span class="lable">律师姓名</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.lawyer_name }}</el-col>
              <el-col :span="1">
                <span class="lable">身份证号</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.lawyer_IDCard }}</el-col>
              <el-col :span="1">
                <span class="lable">手机号码</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.lawyer_phone_number }}</el-col>
              <el-col :span="1">
                <span class="lable">电子邮箱</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.lawyer_email }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">律所全称</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.law_firm_name }}</el-col>
              <el-col :span="1">
                <span class="lable">律所地区</span>
              </el-col>
              <el-col :span="5">{{
                data.lawyer.law_firm_address_select
              }}</el-col>
              <el-col :span="1">
                <span class="lable">律所地址</span>
              </el-col>
              <el-col :span="5">{{
                data.lawyer.law_firm_address_detailed
              }}</el-col>
              <el-col :span="1">
                <span class="lable">执业证号</span>
              </el-col>
              <el-col :span="5">{{ data.lawyer.license_number }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">执业证照</span>
              </el-col>
              <el-col :span="5">
                <img
                  class="img"
                  @click="
                    preview(
                      `${
                        serchStr(data.lawyer.practice_license)
                          ? ''
                          : 'https://file.debteehelper.com'
                      }${data.lawyer.practice_license}`
                    )
                  "
                  :src="
                    `${
                      serchStr(data.lawyer.practice_license)
                        ? ''
                        : 'https://file.debteehelper.com'
                    }${data.lawyer.practice_license}`
                  "
                />
              </el-col>
              <el-col :span="1">
                <span class="lable">年检页照</span>
              </el-col>
              <el-col :span="5">
                <img
                  class="img"
                  @click="
                    preview(
                      `${
                        serchStr(data.lawyer.annual_inspection)
                          ? ''
                          : 'https://file.debteehelper.com'
                      }${data.lawyer.annual_inspection}`
                    )
                  "
                  :src="
                    `${
                      serchStr(data.lawyer.annual_inspection)
                        ? ''
                        : 'https://file.debteehelper.com'
                    }${data.lawyer.annual_inspection}`
                  "
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <span class="lable">专业类型</span>
              </el-col>
              <el-col :span="5">
                {{ data.lawyer.expertise }}
              </el-col>
              <el-col :span="1">
                <span class="lable">简介</span>
              </el-col>
              <el-col :span="5">
                {{ data.lawyer.brief_introduction }}
              </el-col>
            </el-row>
          </div>
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
        <div v-if="data.lawyer != null" class="section">
          <span style="margin-top:0;">
            <span class="title">审核</span>
          </span>
          <el-divider></el-divider>
          <el-form :model="shenhe">
            <el-form-item label="审核状态">
              <el-radio-group v-model="shenhe.audit_status">
                <el-radio label="Audit_states_0">待审核</el-radio>
                <el-radio label="Audit_states_1">未通过</el-radio>
                <el-radio label="Audit_states_2">已通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <p>审核反馈</p>
                <p style="color:#ec193a;font-size:12px;text-align:left;">
                  （审核反馈将呈现给用户）
                </p>
              </template>
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :rows="8"
                  v-model="shenhe.audit_feedback"
                ></el-input>
              </el-col>
            </el-form-item>

            <el-button
              style="margin-left:68px;"
              type="primary"
              @click="SaveShenhe"
              size="small"
              >保存</el-button
            >
          </el-form>
        </div>
        <div v-if="data.lawyer != null" class="section">
          <span style="margin-top:0;">
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
              style="margin-left:40px;"
              type="primary"
              @click="SaveNotes"
              size="small"
              >保存</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button @click="goBaack" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./lawyer.ts"></script>
<style lang="scss">
@import './lawyer.scss';
</style>
