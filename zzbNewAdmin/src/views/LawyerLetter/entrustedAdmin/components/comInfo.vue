<template>
  <div class="smsPhone-wrap">
    <div class="smsPhone-box">
      <el-tabs
        v-loading="data.loading"
        v-model="data.activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="首次短信" name="first">
          <el-row>
            <el-col :span="4">手机号码</el-col>
            <el-col :span="20">{{ data.infoData.phone }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">
              {{
                data.info.run_status == '-1'
                  ? '待执行'
                  : data.info.run_status == '0'
                  ? '执行成功'
                  : data.info.run_status == '2'
                  ? '执行失败'
                  : '未委托'
              }}</el-col
            >
          </el-row>
          <el-row v-if="data.info.send_time">
            <el-col :span="4">{{
              data.info.run_status == '0' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row v-if="data.info.content">
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20">{{ data.info.content }}</el-col>
          </el-row>
          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '0'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col
              :span="20"
              v-show="data.info.run_msg != null && data.info.run_msg != ''"
              >{{
                data.info.run_msg == '01052665273invalid mobile number'
                  ? '无效号码'
                  : data.info.run_msg
              }}</el-col
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="首次电话" name="second">
          <el-row>
            <el-col :span="4">手机号码</el-col>
            <el-col :span="20">{{ data.infoData.phone }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '-1'
                ? '待执行'
                : data.info.run_status == '0'
                ? '执行中'
                : data.info.run_status == '1'
                ? '执行成功'
                : data.info.run_status == '2'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <el-row v-if="data.info.send_time">
            <el-col :span="4">{{
              data.info.run_status == '1' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row v-if="data.info.content">
            <el-col :span="4">拨打内容</el-col>
            <el-col :span="20">{{ data.info.content }}</el-col>
          </el-row>

          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '1'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="电子邮件催款函" name="third">
          <el-row>
            <el-col :span="4">电子邮箱</el-col>
            <el-col :span="20">{{ data.infoData.email || '未填写' }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '-1'
                ? '待执行'
                : data.info.run_status == '0'
                ? '执行成功'
                : data.info.run_status == '1'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20">{{ data.info.content }}</el-col>
          </el-row> -->
          <el-row
            v-if="
              data.info.run_status == '-1' ||
                data.info.run_status == '0' ||
                data.info.run_status == '1'
            "
          >
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20"
              ><span
                @click="
                  toinfo(
                    'http://api1.debteehelper.com/AILawyerLetter/CollectionLetter?debtor_number='
                  )
                "
                class="info"
                >点击查看</span
              ></el-col
            >
          </el-row>
          <el-row
            v-if="
              data.info.run_status == '-1' ||
                data.info.run_status == '0' ||
                data.info.run_status == '1'
            "
          >
            <el-col :span="4">{{
              data.info.run_status == '0' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '0'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="电子邮件律师函" name="fourth">
          <el-row>
            <el-col :span="4">电子邮箱</el-col>
            <el-col :span="20">{{ data.infoData.email || '未填写' }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '-1'
                ? '待执行'
                : data.info.run_status == '0'
                ? '执行成功'
                : data.info.run_status == '1'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <el-row
            v-if="
              data.info.run_status == '-1' ||
                data.info.run_status == '0' ||
                data.info.run_status == '1'
            "
          >
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20"
              ><span
                @click="
                  toinfo(
                    'http://api1.debteehelper.com/AILawyerLetter/LawyerLetter?debtor_number='
                  )
                "
                class="info"
                >点击查看</span
              ></el-col
            >
          </el-row>
          <el-row
            v-if="data.info.lawyer_file != '' && data.info.lawyer_file != null"
          >
            <el-col :span="4">下载律师函</el-col>
            <el-col :span="20"
              ><span @click="toinfo2(data.info.lawyer_file)" class="info"
                >点击下载</span
              ></el-col
            >
          </el-row>
          <el-row
            v-if="
              data.info.run_status == '-1' ||
                data.info.run_status == '0' ||
                data.info.run_status == '1'
            "
          >
            <el-col :span="4">{{
              data.info.run_status == '0' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '0'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="EMS律师函" name="Five">
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '0'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '0'
                ? '待执行'
                : data.info.run_status == '1'
                ? '执行中'
                : data.info.run_status == '3'
                ? '执行成功'
                : data.info.run_status == '4'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <el-row
            v-if="
              data.info.run_status == '0' ||
                data.info.run_status == '1' ||
                data.info.run_status == '3' ||
                data.info.run_status == '4'
            "
          >
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20"
              ><span
                @click="
                  toinfo(
                    'http://api1.debteehelper.com/AILawyerLetter/LawyerLetter?debtor_number='
                  )
                "
                class="info"
                >点击查看</span
              ></el-col
            >
          </el-row>
          <el-row
            v-if="data.info.lawyer_file != '' && data.info.lawyer_file != null"
          >
            <el-col :span="4">下载律师函</el-col>
            <el-col :span="20"
              ><span @click="toinfo2(data.info.lawyer_file)" class="info"
                >点击下载</span
              ></el-col
            >
          </el-row>
          <el-row
            v-if="
              data.info.run_status == '0' ||
                data.info.run_status == '1' ||
                data.info.run_status == '3'
            "
          >
            <el-col :span="4">{{
              data.info.run_status == '3' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '3'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
          <div v-if="data.info.logistics != null" class="bottom">
            <span>快递信息</span>
            <span @click="data.expressType = !data.expressType" class="edit">{{
              data.expressType ? '返回' : '编辑'
            }}</span>
            <el-divider></el-divider>
            <div
              :style="{
                color:
                  data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '0'
                    ? '#909399'
                    : ''
              }"
              class="express-Box"
            >
              <!-- <el-row>
                <el-col :span="4">律师函下载</el-col>
                <el-col :span="20">{{ data.info.logistics.receiving_name }}</el-col>
              </el-row> -->
              <el-row v-if="!data.expressType">
                <el-col :span="4">快递状态</el-col>
                <el-col
                  v-if="
                    data.infoData.isStop == 'AI_State_4' &&
                      data.info.run_status == '0'
                  "
                  :span="20"
                  >已终止</el-col
                >
                <el-col v-else :span="20">{{
                  data.info.logistics.execution_status == '0'
                    ? '待投递'
                    : data.info.logistics.execution_status == '1'
                    ? '快递中'
                    : data.info.logistics.execution_status == '3'
                    ? '投递成功'
                    : '投递失败'
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4">快递状态</el-col>
                <el-col :span="20">
                  <el-radio-group
                    v-model="data.info.logistics.execution_status"
                  >
                    <el-radio :label="0">待投递</el-radio>
                    <el-radio :label="1">快递中</el-radio>
                    <el-radio :label="3">投递成功</el-radio>
                    <el-radio :label="4">投递失败</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row
                v-if="
                  data.info.logistics.execution_status == 4 && !data.expressType
                "
              >
                <el-col :span="4">异常提示</el-col>
                <el-col :span="20">{{
                  data.info.logistics.error_prompt
                }}</el-col>
              </el-row>
              <el-row v-if="data.expressType">
                <el-col :span="4" class="laber">异常提示</el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    v-model="data.info.logistics.error_prompt"
                    placeholder="请输入异常提示"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">收件人姓名</el-col>
                <el-col :span="20">{{
                  data.info.logistics.receiving_name
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4" class="laber">收件人姓名</el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    v-model="data.info.logistics.receiving_name"
                    placeholder="请输入收件人姓名"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">收件人电话</el-col>
                <el-col :span="20">{{
                  data.info.logistics.receiving_phone
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4" class="laber">收件人电话</el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    v-model="data.info.logistics.receiving_phone"
                    placeholder="请输入收件人姓名"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">收件人地址</el-col>
                <el-col :span="20">{{
                  data.info.logistics.receiving_address
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4" class="laber">收件人地址</el-col>
                <el-col :span="16">
                  <!-- <comAddress @emitAddress="addressEdit" :address="data.info.logistics.receiving_address"></comAddress> -->
                  <el-input
                    size="small"
                    v-model="data.info.logistics.receiving_address"
                    placeholder="请输入收件人地址"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">快递单号</el-col>
                <el-col :span="20">{{
                  data.info.logistics.courier_number
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4" class="laber">快递单号</el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    v-model="data.info.logistics.courier_number"
                    placeholder="请输入快递单号"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">快递底单</el-col>
                <el-col :span="20">
                  <el-image
                    style="cursor: pointer;"
                    @click="openImg(data.info.logistics.courier_receipt_img)"
                    :src="data.info.logistics.courier_receipt_img"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4" class="laber">快递底单</el-col>
                <el-col :span="16">
                  <el-upload
                    drag
                    class="avatar-uploader"
                    :action="data.baseURL + '/Upload/UploadImage?type=0'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                  >
                    <img
                      v-if="data.info.logistics.courier_receipt_img"
                      :src="data.info.logistics.courier_receipt_img"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">快递底单状态</el-col>
                <el-col :span="20">{{
                  data.info.logistics.courier_receipt == 0 ? '未收到' : '已收到'
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4">快递底单状态</el-col>
                <el-col :span="16">
                  <el-radio-group v-model="data.info.logistics.courier_receipt">
                    <el-radio :label="0">未收到</el-radio>
                    <el-radio :label="1">已收到</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">退件</el-col>
                <el-col :span="20">{{
                  data.info.logistics.express_return == 0 ? '否' : '是'
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4">退件</el-col>
                <el-col :span="16">
                  <el-radio-group v-model="data.info.logistics.express_return">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row v-if="!data.expressType">
                <el-col :span="4">退件原因</el-col>
                <el-col :span="20">{{
                  data.info.logistics.express_return_reason || '暂无'
                }}</el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="4">退件原因</el-col>
                <el-col :span="16">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="data.info.logistics.express_return_reason"
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-button
                v-if="data.expressType"
                style="margin:auto;display:block;margin-bottom:20px;"
                @click="expressSave"
                type="primary"
                >保存</el-button
              >
              <el-row>
                <el-col v-if="!data.expressType" :span="4">快递进度</el-col>
                <el-col v-if="data.expressType" class="laber" :span="4"
                  >快递进度</el-col
                >
                <el-col :span="20">
                  <p
                    v-for="(item, index) in data.info.logistics_details"
                    :key="index"
                  >
                    <span>{{ item.update_time }}</span
                    ><span>{{ item.update_context }}</span>
                    <el-button
                      style="margin-left:20px;"
                      v-if="data.expressType"
                      @click="logisticsDelect(item)"
                      type="text"
                      >删除</el-button
                    >
                  </p>
                </el-col>
              </el-row>
              <el-row v-if="data.expressType">
                <el-col style="margin-right:10px;" :span="8">
                  <el-date-picker
                    style="width:100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="addData.update_time"
                    size="small"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="11">
                  <el-input
                    size="small"
                    v-model="addData.update_context"
                    placeholder="物流信息"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button
                    style="position: relative;top: -6px;text-align: center;left:10px;"
                    @click="logisticsSave"
                    type="text"
                    >保存</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="末次短信" name="six">
          <el-row>
            <el-col :span="4">手机号码</el-col>
            <el-col :span="20">{{ data.infoData.phone }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '-1'
                ? '待执行'
                : data.info.run_status == '0'
                ? '执行成功'
                : data.info.run_status == '2'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">{{
              data.info.run_status == '0' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">发送内容</el-col>
            <el-col :span="20">{{ data.info.content }}</el-col>
          </el-row>

          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '0'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="末次电话" name="seven">
          <el-row>
            <el-col :span="4">手机号码</el-col>
            <el-col :span="20">{{ data.infoData.phone }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">执行状态</el-col>
            <el-col
              v-if="
                data.infoData.isStop == 'AI_State_4' &&
                  data.info.run_status == '-1'
              "
              :span="20"
              >已终止</el-col
            >
            <el-col v-else :span="20">{{
              data.info.run_status == '-1'
                ? '待执行'
                : data.info.run_status == '0'
                ? '执行中'
                : data.info.run_status == '1'
                ? '执行成功'
                : data.info.run_status == '2'
                ? '执行失败'
                : '未委托'
            }}</el-col>
          </el-row>
          <el-row
            v-show="data.info.send_time != null && data.info.send_time != ''"
          >
            <el-col :span="4">{{
              data.info.run_status == '0' ? '执行时间' : '计划执行时间'
            }}</el-col>
            <el-col :span="20">{{ data.info.send_time }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">拨打内容</el-col>
            <el-col :span="20">{{ data.info.content }}</el-col>
          </el-row>
          <el-row
            v-show="
              data.info.run_msg != null &&
                data.info.run_msg != '' &&
                data.info.run_status != '1'
            "
          >
            <el-col :span="4">异常反馈</el-col>
            <el-col :span="20">{{ data.info.run_msg }}</el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { baseURL } from '../../../../utils/request'
import * as Api from '../../../../api/business'
import { comAddress } from '../../../../components/index'
@Component({
  components: {
    comAddress
  }
})
export default class About extends Vue {
  // prop
  @Prop() info!: any
  @Prop() actName!: string
  @Prop() infoData!: any
  @Prop() loading!: boolean
  //Watch
  @Watch('info', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.info = newVal
  }
  @Watch('actName')
  actNameChange(newVal: string, oldVal: string) {
    this.data.activeName = newVal
  }
  @Watch('infoData', { deep: true, immediate: true })
  infoDataChange(newVal: any, oldVal: any) {
    this.data.infoData = newVal
  }
  @Watch('loading', { deep: true, immediate: true })
  loadingChange(newVal: boolean, oldVal: boolean) {
    this.data.loading = newVal
    this.addData = {
      log_logistics_id: '',
      update_time: '',
      update_context: ''
    }
  }
  data: any = {
    info: {},
    name: '',
    baseURL: '',
    Details: [],
    logistics: {},
    activeName: 'first',
    expressType: false,
    infoData: {},
    loading: ''
  }
  addData: any = {
    log_logistics_id: '',
    update_time: '',
    update_context: ''
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.data.baseURL = baseURL
  }
  handleClick(tab: any, event: any) {
    this.$emit('nameWatch', tab.paneName)
  }
  toinfo(url: string) {
    let self: any = this
    window.open(url + self.data.info.debtor_number)
  }
  toinfo2(url: string) {
    // const iframe: any = document.createElement('iframe')
    // iframe.style.display = 'none'
    // iframe.src = url
    // document.body.appendChild(iframe)
    window.open(url)
  }
  //地址子组件
  addressEdit(data: any) {
    //
  }
  //快递底单上传
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      self.data.info.logistics.courier_receipt_img =
        'http://file.debteehelper.com/' +
        res.data.FileUrl +
        res.data.FileExtension
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  //快递进度删除
  logisticsDelect(data: any) {
    let self: any = this
    self
      .$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.delectExpress(data.id).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
            self.data.info.logistics_details = self.data.info.logistics_details.filter(
              (item: any) => {
                return item.id != data.id
              }
            )
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //新增物流信息
  logisticsSave() {
    let self: any = this
    self.addData.log_logistics_id = this.data.info.logistics.id
    Api.addExpress(self.addData).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        self.addData['id'] = res.data
        let add: any = Object.assign(
          {},
          JSON.parse(JSON.stringify(self.addData))
        )
        self.data.info.logistics_details.push(add)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //保存快递信息
  expressSave() {
    let parmas: any = this.data.info.logistics
    Api.joinExpress(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.expressType = false
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //快递底单查看
  openImg(path: string) {
    window.open(path)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.smsPhone-wrap {
  width: 100%;
  & > .smsPhone-box {
    & .el-row {
      margin-bottom: 20px;
      .el-col:nth-child(1) {
        color: $Secondary-text;
      }
    }
    & .laber {
      position: relative;
      top: 10px;
    }
    & .bottom {
      & > span:first-child {
        font-size: 12px;
        color: #909399;
        margin-top: 10px;
        display: block;
      }
      & p {
        margin-top: 0;
        & span:first-child {
          margin-right: 20px;
        }
      }
    }
    & .info {
      color: #62d493;
      cursor: pointer;
    }
    & .express-Box {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  & .el-image {
    width: 150px;
    height: 75px;
    & .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 14px;
    }
  }
  .edit {
    color: #e6a23c;
    float: right;
    cursor: pointer;
    position: relative;
    top: -16px;
  }
  .avatar-uploader,
  .el-upload-dragger,
  .avatar-uploader-icon,
  .avatar {
    width: 150px;
    height: 75px;
  }
  .avatar-uploader-icon {
    line-height: 75px;
  }
}
</style>
