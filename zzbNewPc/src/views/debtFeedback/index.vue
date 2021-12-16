<template>
  <div class="debtFeedback-wrap">
    <div class="debtFeedback-box">
      <div class="header">
        <img src="../../assets/images/layout/topBG.png" />
        <div class="header-content">
          <div>
            <p>请确认以下债务信息</p>
            <span>编号:{{ data.number }}</span>
            <img class="log" src="../../assets/images/layout/log3.png" alt="" />
          </div>
        </div>
      </div>
      <div class="text">
        <el-tabs
          :stretch="true"
          v-model="data.activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="债务信息" name="first">
            <div
              v-for="(item, index) in data.debtInfo"
              :key="index"
              class="panel"
            >
              <span class="panel-shu"></span
              ><span class="paner-title">{{ item.title }}</span>
              <div
                :class="{ cc: item2.lebel == '负责人名称' && data.type == 1 }"
                v-for="(item2, index2) in item.list"
                :key="index2"
              >
                <el-divider></el-divider>
                <span class="label">{{ item2.lebel }}</span>
                <span class="value">{{ item2.value }}</span>
              </div>
            </div>
            <div class="feedback">
              <div class="cell">
                <p class="title">
                  <span class="feedback-shu"></span>您对以上债务信息
                </p>
                <el-divider></el-divider>
                <div class="radio">
                  <el-radio-group @change="choice" v-model="data.objection">
                    <el-radio :label="1">有异议</el-radio>
                    <el-radio :label="2">无异议</el-radio>
                  </el-radio-group>
                </div>
                <el-checkbox-group v-model="data.checkList">
                  <el-checkbox
                    :label="data.objection == 1 ? '债务不存在' : '将尽快支付'"
                  ></el-checkbox>
                  <el-checkbox
                    :label="
                      data.objection == 1
                        ? '债务本身存有争议'
                        : '请求分期付/还款'
                    "
                  ></el-checkbox>
                  <el-checkbox
                    :label="
                      data.objection == 1
                        ? '金额有异议'
                        : '请求减免利息违约金/还款'
                    "
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="cell">
                <p class="title"><span class="feedback-shu"></span>上传附件</p>
                <el-divider></el-divider>
                <el-upload
                  :action="data.baseURL"
                  list-type="picture-card"
                  :multiple="true"
                  :on-success="handleAvatarSuccess"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      @click="handlePictureCardPreview(file)"
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                  </div>
                </el-upload>
                <el-dialog :visible.sync="data.feedBack.dialogVisible">
                  <img
                    width="100%"
                    :src="data.feedBack.dialogImageUrl"
                    alt=""
                  />
                </el-dialog>
              </div>
              <div class="cell">
                <p class="title"><span class="feedback-shu"></span>备注</p>
                <el-divider></el-divider>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="data.remarks"
                >
                </el-input>
              </div>
            </div>
            <el-button
              style="width:100%;"
              :disabled="data.btnType"
              @click="Submit"
              type="primary"
              >确认并提交</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="债务明细" name="second">
            <el-table :data="data.details" style="width: 100%">
              <el-table-column
                v-for="(item, index) in data.tabHeaders"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="付款通道" name="third">
            <div class="Payment">
              <el-row v-for="(item, index) in data.Payment" :key="index">
                <span class="lebel">{{ item.lebel }}</span
                ><span class="value">{{ item.value }}</span>
                <el-divider></el-divider>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- <el-dialog
        :show-close="false"
        title="输入手机号获取验证码"
        :visible.sync="data.dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form :model="data.form">
          <el-form-item label="手机号" :label-width="data.formLabelWidth">
            <el-input
              size="small"
              v-model="data.form.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" :label-width="data.formLabelWidth">
            <el-col :span="12">
              <el-input
                size="small"
                v-model="data.form.code"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col style="text-align:right;" :span="12">
              <el-button @click="getCode" size="small" type="primary"
                >获取验证码</el-button
              >
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            size="medium"
            type="primary"
            @click="data.dialogFormVisible = false"
            >查看债务信息</el-button
          >
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
