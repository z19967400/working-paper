<template>
  <div class="index-wrap">
    <div class="index-box">
      <div class="box">
        <el-row :gutter="20">
          <el-col :span="4">
            <div style="height:362px;" class="panl">
              <p class="header">待办工作</p>
              <div class="list-box">
                <p v-for="(item, index) in data.workList" :key="index">
                  {{ index + 1 }}.有新的债权人待审核
                  <span style="color:#67C23A;float:right;cursor: pointer;"
                    >查看</span
                  >
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">用户统计</p>
                  <p>VIP用户<span style="float:right;">500</span></p>
                  <p>VIP用户管理员<span style="float:right;">600</span></p>
                  <p>普通用户<span style="float:right;">500</span></p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">律师统计</p>
                  <p>总数量<span style="float:right;">1,100</span></p>
                  <p>待认证<span style="float:right;">600</span></p>
                  <p>已认证<span style="float:right;">500</span></p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    平台收入统计
                    <span style="float:right;">总金额/已结算金额</span>
                  </p>
                  <p>
                    AI律师函
                    <span style="float:right;">500,000/25,000</span>
                  </p>
                  <p>
                    律师办案
                    <span style="float:right;">500,000/10,000</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    财务账单统计
                    <span style="float:right;">总金额/已结算金额</span>
                  </p>
                  <p>
                    法律服务费账单
                    <span style="float:right;">1,000,000/800,000</span>
                  </p>
                  <p>
                    律师请款单
                    <span style="float:right;">500,000/25,000</span>
                  </p>
                  <p>
                    平台管理费请款单
                    <span style="float:right;">500,000/10,000</span>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:18px;" :gutter="20">
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    债权人统计
                  </p>
                  <p>
                    总数量
                    <span style="float:right;">600</span>
                  </p>
                  <p>
                    企业债权人
                    <span style="float:right;">600</span>
                  </p>
                  <p>
                    个人债权人
                    <span style="float:right;">500</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">AI律师函统计</p>
                  <p>委托总数量<span style="float:right;">1,600</span></p>
                  <p>
                    债务总金额
                    <span style="float:right;">709,037,217.28</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">律师办案统计</p>
                  <p>委托总数量<span style="float:right;">1,600</span></p>
                  <p>
                    债务总金额 <span style="float:right;">709,037,217.28</span>
                  </p>
                  <p>律师费<span style="float:right;">11,709,127.55</span></p>
                  <p>平台管理费<span style="float:right;">723,091.06</span></p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    增值服务统计
                  </p>
                  <p>
                    律师查档数量
                    <span style="float:right;">1,600</span>
                  </p>
                  <p>
                    诉讼助资数量
                    <span style="float:right;">1,600</span>
                  </p>
                  <p>
                    保全保险数量
                    <span style="float:right;">1,600</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;" :gutter="20">
          <el-col :span="19">
            <div class="chartBox">
              <div class="chart1" id="chart1"></div>
            </div>
          </el-col>
          <el-col :span="5">
            <div style="height:500px;" class="panl">
              <p class="header">
                债务人统计
              </p>
              <p>
                总数量
                <span style="float:right;">1,100</span>
              </p>
              <p>
                企业债务人
                <span style="float:right;">600</span>
              </p>
              <p>
                个人债务人
                <span style="float:right;">500</span>
              </p>
              <p class="header">
                债务人地区 top10
                <span style="float:right;">人数/债务金额(万元)</span>
              </p>
              <p v-for="(item, index) in data.workList" :key="index">
                北京
                <span style="float:right;">1,100/993,111</span>
              </p>
            </div>
          </el-col>
        </el-row>
        <div class="chartBox">
          <el-row style="margin-top:20px;" :gutter="20">
            <el-col :span="10">
              <div class="chart1" id="chart2"></div>
            </el-col>
            <el-col :span="14">
              <div class="chart1" id="chart3"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- <div id="chart" class="chart"></div> -->
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
