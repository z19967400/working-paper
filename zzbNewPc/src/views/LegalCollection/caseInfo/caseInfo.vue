<template>
  <div class="LegalCollection-wrap">
    <div class="LegalCollection-box">
      <div
        :style="{
          height:
            (data.labers.length + data.labers[data.actIndex].children.length) *
              40 +
            'px'
        }"
        class="left"
      >
        <div class="text">
          <div
            v-for="(item, index) in data.labers"
            :key="index"
            :class="{ act: index == data.actIndex }"
            @click="laberClick(index)"
          >
            <!-- <span>{{ item.label }}</span> -->
            <div v-if="item.children.length != 0" class="children">
              <span
                :class="{
                  act2: index == data.actIndex && data.actIndex2 == index2
                }"
                v-for="(item2, index2) in item.children"
                :key="index2"
                @click.stop="laberClick2(index, index2)"
                >{{ item2.name }}</span
              >
            </div>
          </div>
        </div>
        <div class="shuxian-box">
          <div
            :style="{ transform: ' translateY(' + data.actIndex * 40 + 'px)' }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div ref="right" :style="{ height: height + 'px' }" class="right">
        <!-- 案件概览 -->
        <div ref="section0" class="section">
          <span style="margin-top:0;" :class="{ act: data.rightIndex == 0 }"
            >案件概览</span
          >
          <el-divider></el-divider>
          <div class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p
                v-show="item2.value"
                v-for="(item2, index2) in item"
                :key="index2"
              >
                <span>{{ item2.name }}</span>
                <el-link
                  @click="$router.push(`/detailed/${item2.value}`)"
                  v-if="item2.prop === 'ai_number'"
                  type="success"
                  >{{ `AI律师函(${item2.value})` }}</el-link
                >
                <span v-else>{{ item2.value }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 办案事项 -->
        <div ref="section1" class="section">
          <span :class="{ act: data.rightIndex == 1 }">办案事项</span>
          <el-divider></el-divider>
          <div class="box">
            <el-row style="width:100%">
              <el-tag
                style="margin-right:10px;"
                v-for="(item, index) in data.case_matters_name"
                :key="index"
                >{{ item.matters_name }}</el-tag
              >
            </el-row>
          </div>
        </div>
        <!-- 案件信息 -->
        <div ref="section2" class="section">
          <span :class="{ act: data.rightIndex == 2 }">案件信息</span>
          <el-divider></el-divider>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item
              labelClassName="descriptions-label"
              v-for="(item, index) in data.caseInformation"
              :key="index"
              :span="item.width"
              contentClassName="descriptions-value"
            >
              <template slot="label">
                <span :class="item.required ? 'is-required' : 'padding-left'">{{
                  item.lable
                }}</span>
              </template>
              <div>
                <div
                  v-if="
                    item.prop == 'property_clues' ||
                      item.prop == 'available_evidence' ||
                      item.prop == 'entrusted_matters'
                  "
                >
                  <el-tag
                    size="small"
                    type="info"
                    v-for="(item2, index2) in item.value.split(',')"
                    :key="index2"
                    >{{ item2 }}</el-tag
                  >
                </div>
                <span
                  v-else-if="
                    item.prop == 'arrears_principal' ||
                      item.prop == 'arrears_interest'
                  "
                >
                  {{ qianwei(item.value) }}
                </span>
                <span v-else> {{ item.value }}</span>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 债权人 -->
        <div ref="section3" class="section">
          <span :class="{ act: data.rightIndex == 3 }">债权人</span>
          <el-divider></el-divider>
          <div class="box">
            <!-- <div v-for="(item, index) in data.case_creditor" :key="index" class="text">
              <p v-for="(item2, index2) in item" :key="index2">
                <span>{{ item2.name }}</span>
                <span>{{ item2.value }}</span>
              </p>
            </div> -->
            <el-row style="width:100%;">
              <table1
                :tableData="data.case_creditorData"
                :tableOption="data.case_creditorOption"
              ></table1>
            </el-row>
          </div>
        </div>
        <div ref="section4" class="section">
          <span :class="{ act: data.rightIndex == 4 }">服务费报价</span>
          <el-divider></el-divider>
          <div class="box">
            <offer
              :operation_authority="data.operation_authority"
              :debtor_number="this.$route.params.id"
            ></offer>
          </div>
        </div>
        <!-- 签署合同 -->
        <div ref="section5" class="section">
          <span :class="{ act: data.rightIndex == 5 }">签署合同</span>
          <el-divider></el-divider>
          <el-table
            align="left"
            :header-cell-style="{ 'text-align': 'left' }"
            :cell-style="{ 'text-align': 'left' }"
            :data="caseProssData.contract"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in data.contractType"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row[item.prop] }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.sign_status == '已签署'"
                  type="text"
                  @click="handleSee(scope.row)"
                  style="color:#409EFF;"
                  >查看</el-button
                >
                <el-button
                  v-if="scope.row.sign_status == '待签署'"
                  type="text"
                  @click="handleSign(scope.row)"
                  style="color:#67C23A;"
                  >签署</el-button
                >
                <span
                  v-if="scope.row.sign_status == '合同准备中'"
                  style="font-size:14;"
                  >准备中</span
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          class="contractDialog"
          title="合同详情"
          :visible.sync="data.contractVisible"
        >
          <el-row
            style="margin-bottom:10px;"
            v-for="(item, index) in data.contractData"
            :key="index"
          >
            <el-col :span="4">
              <span>合同内容</span>
            </el-col>
            <el-col :span="12">
              <span
                @click="toinfo(item)"
                style="color:#67c23a;cursor: pointer;"
                >{{ item.substring(item.lastIndexOf("/") + 1) }}</span
              >
            </el-col>
          </el-row>
        </el-dialog>
        <!-- 办案律师 -->
        <div ref="section6" class="section">
          <span :class="{ act: data.rightIndex == 6 }">办案律师</span>
          <el-divider></el-divider>
          <table1
            :tableData="caseProssData.lawyer"
            :tableOption="data.lawyerType"
          ></table1>
        </div>
        <!-- 法院信息 -->
        <div ref="section7" class="section">
          <span :class="{ act: data.rightIndex == 7 }">法院信息</span>
          <el-divider></el-divider>
          <table1
            :tableData="caseProssData.court"
            :tableOption="data.courtType"
          ></table1>
        </div>
        <!-- 专属客服 -->
        <div ref="section8" class="section">
          <span :class="{ act: data.rightIndex == 8 }">专案客服</span>
          <el-divider></el-divider>
          <div class="box">
            <el-row style="width:100%">
              <div
                class="customerTag"
                v-for="(item, index) in data.case_customer_service"
                :key="index"
              >
                <p>姓名:{{ item.name }}</p>
                <p>电话:{{ item.phone_number }}(微信同号)</p>
                <p>邮箱:{{ item.email }}</p>
              </div>

              <p
                style="font-size:14px;color:#909399;margin-left:10px;"
                v-show="data.case_customer_service.length == 0"
              >
                待分配
              </p>
            </el-row>
          </div>
        </div>
        <div ref="section9" class="section">
          <span :class="{ act: data.rightIndex == 9 }">办案进度</span>
          <el-divider></el-divider>
          <handCasePross :caseProssData="caseProssData"></handCasePross>
        </div>
        <div ref="section10" class="section">
          <span :class="{ act: data.rightIndex == 9 }">服务费</span>
          <el-divider></el-divider>
          <el-table class="table2" :data="data.list2" border :max-height="400">
            <el-table-column
              v-for="(item, index) in data.dataType2"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
              :align="item.label === '风险服务费' ? 'center' : ''"
            >
              <template slot-scope="scope">
                <span
                  :style="{
                    color: scope.row[item.prop] == '未生成' ? '#c0c4cc' : ''
                  }"
                  v-if="item.prop == 'settlement_status'"
                  >{{ scope.row[item.prop] }}</span
                >
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
              <el-table-column
                v-if="item.label === '风险服务费'"
                prop="collection_amount"
                label="回款金额"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="float_service_rate"
                label="风险服务费率(%)"
                width="130"
                v-if="item.label === '风险服务费'"
              >
              </el-table-column>
              <el-table-column
                prop="float_service_fee"
                label="风险服务费额"
                width="120"
                v-if="item.label === '风险服务费'"
              >
              </el-table-column>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  :disabled="scope.row.bill_number == null"
                  style="color:#67C23A;"
                  @click="handlInfo(scope.row)"
                  size="small"
                  >{{
                    scope.row.bill_number == null ? "未生成" : "查看账单"
                  }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover
      :title="data.infoTitle"
      popper-class="editData"
      v-model="data.visible"
    >
      <span @click="close" class="el-icon-close close"></span>
      <smsPhone :name="data.infoTitle" :info="infoData"></smsPhone>
    </el-popover>

    <div class="btn-box">
      <!-- <el-button size="small" type="success">下载催收报告</el-button>
      <el-button size="small" type="success">下载快递信息</el-button> -->
      <!-- <el-button size="small" @click="entrustDelet" type="primary"
        >删除</el-button
      > -->
      <el-button size="small" plain @click="revoke" type="primary"
        >返回
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./caseInfo.ts"></script>

<style lang="scss">
@import "./caseInfo.scss";
</style>
