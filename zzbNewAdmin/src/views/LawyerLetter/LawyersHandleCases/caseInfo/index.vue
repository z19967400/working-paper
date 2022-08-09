<template>
  <div class="caseInfo-wrap">
    <el-tabs
      :tab-position="data.tabPosition"
      v-model="data.activeName"
      @tab-click="tableSwitch"
    >
      <el-tab-pane label="案件概览" name="first">
        <caseoverview
          :height="data.height"
          :debtor_number="data.debtor_number"
          @init="init"
          @toInfo="toInfo"
          :caseoverview="data.caseoverview"
        ></caseoverview>
      </el-tab-pane>
      <el-tab-pane label="案件评估" name="second">
        <assessment
          :Case_state="data.caseoverview.information[0][1]"
          @release="data.case_status_code = 'Case_state_2'"
          @init="getCaseAssment"
          @init2="init"
          :height="data.height"
          :assessment="data.assessmentData"
          :debtor_number="data.debtor_number"
        ></assessment>
      </el-tab-pane>
      <el-tab-pane label="用户签约" name="Three">
        <contract
          @getContracts="getContracts"
          :name="'用户签约'"
          :height="data.height"
          :contract="data.contracts"
          :debtor_number="data.debtor_number"
        ></contract>
      </el-tab-pane>
      <el-tab-pane label="分配律师" name="Four">
        <distributionLawyer
          @init="getCaseLawyer"
          :height="data.height"
          :distributionLawyer="data.distributionLawyer"
          :debtor_number="data.debtor_number"
        ></distributionLawyer>
      </el-tab-pane>
      <el-tab-pane label="律师签约" name="Three2">
        <contract
          @getContracts="getContracts"
          :name="'律师签约'"
          :height="data.height"
          :contract="data.contracts2"
          :debtor_number="data.debtor_number"
        ></contract>
      </el-tab-pane>
      <el-tab-pane label="办案进度" name="five">
        <handCase
          :height="data.height"
          :handCase="data.caseProgress"
          @init="getCaseMatter"
        ></handCase>
      </el-tab-pane>
      <el-tab-pane label="财务结算" name="six">
        <settlement
          :height="data.height"
          :settlement="data.finance"
          @init="getFinance"
        ></settlement>
      </el-tab-pane>
    </el-tabs>
    <div class="bottom-box">
      <div>
        <el-button
          style="width:100px;"
          size="small"
          @click="goBack"
          type="primary"
          >返回</el-button
        >
        <el-button
          style="width:100px;"
          size="small"
          :disabled="data.case_status_code != 'Case_state_2'"
          @click="caseRelease"
          type="primary"
        >
          {{
            data.case_status_code == 'Case_state_0' ||
            data.case_status_code == 'Case_state_1' ||
            data.case_status_code == 'Case_state_2'
              ? '案件发布'
              : '案件已发布'
          }}
        </el-button>
        <el-button
          style="width:120px;"
          size="small"
          :disabled="data.case_status_code != 'Case_state_0'"
          @click="sendAssessment"
          type="primary"
          >发送报价至用户</el-button
        >
        <el-button
          style="width:100px;"
          size="small"
          @click="caseRevoke"
          type="primary"
          >案件撤销</el-button
        >
        <!-- :disabled="data.case_status_code !='Case_state_3'" -->
      </div>
      <div>
        <el-button
          style="width:100px;"
          size="small"
          :disabled="data.case_status_code != 'Case_state_3'"
          @click="noLawyerRelease"
          type="primary"
          >无律师接案</el-button
        >
        <el-button
          style="width:100px;"
          size="small"
          :disabled="data.case_status_code == 'Case_state_6'"
          @click="endTypeOpen = true"
          type="primary"
          >申请结案</el-button
        >
      </div>
    </div>
    <el-dialog title="选择结案方式" width="35%" :visible.sync="endTypeOpen">
      <div class="info-box">
        <el-row>
          <el-col :span="3">
            <span>结案方式</span>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="endType">
              <el-radio label="0">已结案</el-radio>
              <el-radio label="4">已终止</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="3">
            <span>结案备注</span>
          </el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="closeCaseRemarks"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="endTypeOpen = false">取 消</el-button>
        <el-button type="primary" @click="Release">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
