<template>
  <div class="index-wrap">
    <div class="index-box">
      <div class="box">
        <el-link
          v-show="data.is_super"
          @click="daiban"
          class="qh"
          type="success"
          >切换到待办工作</el-link
        >
        <el-row :gutter="20">
          <!-- <el-col :span="4">
            <div style="height:362px;" class="panl">
              <p class="header">待办工作</p>
              <div class="list-box">
                <p v-for="(item, index) in data.workList" :key="index">
                  {{ index + 1 }}.{{ getText(item.name, item.val) }}
                  <span
                    @click="toUrl(item.url)"
                    style="color:#67C23A;float:right;cursor: pointer;"
                    >查看</span
                  >
                </p>
              </div>
            </div>
          </el-col> -->
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">用户统计</p>
                  <p>
                    VIP用户<span style="float:right;">{{
                      data.statistical.number_1
                    }}</span>
                  </p>
                  <p>
                    VIP用户管理员<span style="float:right;">{{
                      data.statistical.number_2
                    }}</span>
                  </p>
                  <p>
                    普通用户<span style="float:right;">{{
                      data.statistical.number_3
                    }}</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    债权人统计
                  </p>
                  <p>
                    总数量
                    <span style="float:right;">{{
                      data.statistical.number_7
                    }}</span>
                  </p>
                  <p>
                    企业债权人
                    <span style="float:right;">{{
                      data.statistical.number_8
                    }}</span>
                  </p>
                  <p>
                    个人债权人
                    <span style="float:right;">{{
                      data.statistical.number_9
                    }}</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">律师统计</p>
                  <p>
                    总数量<span style="float:right;">{{
                      Thousand(data.statistical.number_4)
                    }}</span>
                  </p>
                  <p>
                    待认证<span style="float:right;">{{
                      Thousand(data.statistical.number_5)
                    }}</span>
                  </p>
                  <p>
                    已认证<span style="float:right;">{{
                      Thousand(data.statistical.number_6)
                    }}</span>
                  </p>
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
                    <span style="float:right;"
                      >{{ Thousand2(data.statistical.number_22) }}/{{
                        Thousand2(data.statistical.number_23)
                      }}</span
                    >
                  </p>
                  <p>
                    律师办案
                    <span style="float:right;"
                      >{{ Thousand2(data.statistical.number_24) }}/{{
                        Thousand2(data.statistical.number_25)
                      }}</span
                    >
                  </p>
                  <p>
                    平台管理费
                    <span style="float:right;"
                      >{{ Thousand2(data.statistical.number_26) }}/{{
                        Thousand2(data.statistical.number_27)
                      }}</span
                    >
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:18px;" :gutter="20">
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">AI律师函统计</p>
                  <p>
                    委托总数量<span style="float:right;">{{
                      Thousand(data.statistical.number_13)
                    }}</span>
                  </p>
                  <p>
                    债务总金额
                    <span style="float:right;">{{
                      Thousand2(data.statistical.number_14)
                    }}</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">律师办案统计</p>
                  <p>
                    委托总数量<span style="float:right;">{{
                      Thousand(data.statistical.number_15)
                    }}</span>
                  </p>
                  <p>
                    债务总金额
                    <span style="float:right;">{{
                      Thousand2(data.statistical.number_16)
                    }}</span>
                  </p>
                  <p>
                    律师费<span style="float:right;">{{
                      Thousand2(data.statistical.number_17)
                    }}</span>
                  </p>
                  <p>
                    平台管理费<span style="float:right;">{{
                      Thousand2(data.statistical.number_18)
                    }}</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="height:170px;" class="panl">
                  <p class="header">
                    增值服务统计
                  </p>
                  <p>
                    律师查档数量
                    <span style="float:right;">{{
                      Thousand(data.statistical.number_19)
                    }}</span>
                  </p>
                  <p>
                    诉讼助资数量
                    <span style="float:right;">{{
                      Thousand(data.statistical.number_20)
                    }}</span>
                  </p>
                  <p>
                    保全保险数量
                    <span style="float:right;">{{
                      Thousand(data.statistical.number_21)
                    }}</span>
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
                    <span style="float:right;"
                      >{{ Thousand2(data.statistical.number_22) }}/{{
                        Thousand2(data.statistical.number_23)
                      }}</span
                    >
                  </p>
                  <p>
                    律师请款单
                    <span style="float:right;">
                      {{ Thousand2(data.statistical.number_24) }}/{{
                        Thousand2(data.statistical.number_25)
                      }}</span
                    >
                  </p>
                  <p>
                    平台管理费请款单
                    <span style="float:right;">
                      {{ Thousand2(data.statistical.number_26) }}/{{
                        Thousand2(data.statistical.number_27)
                      }}</span
                    >
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
                <span style="float:right;">{{
                  Thousand(data.statistical.number_10)
                }}</span>
              </p>
              <p>
                企业债务人
                <span style="float:right;">{{
                  Thousand(data.statistical.number_11)
                }}</span>
              </p>
              <p>
                个人债务人
                <span style="float:right;">{{
                  Thousand(data.statistical.number_12)
                }}</span>
              </p>
              <p class="header">
                债务人地区 top10
                <span style="float:right;">人数/债务金额(万元)</span>
              </p>
              <!-- <p v-for="(item, index) in data.workList" :key="index">
                北京
                <span style="float:right;">1,100/993,111</span>
              </p> -->
              <span class="noData">暂未统计</span>
            </div>
          </el-col>
        </el-row>
        <div class="chartBox">
          <el-row style="margin-top:20px;" :gutter="20">
            <el-col :span="8">
              <div class="chart1" id="chart2"></div>
            </el-col>
            <el-col :span="16">
              <div class="chart1" id="chart3"></div>
            </el-col>
          </el-row>
        </div>
        <div class="chartBox">
          <el-row style="margin-top:20px;" :gutter="20">
            <el-col :span="24">
              <div class="chart1" id="chart4"></div>
            </el-col>
          </el-row>
        </div>
        <div class="chartBox">
          <el-row style="margin-top:20px;" :gutter="20">
            <el-col :span="24">
              <div class="chart1" id="chart5"></div>
            </el-col>
          </el-row>
        </div>
        <p class="time">数据更新时间:{{ data.update_time }}</p>
        <el-dialog
          :destroy-on-close="true"
          :visible.sync="data.dialogVisible"
          title="案件报价待审核"
        >
          <div class="list-box">
            <el-divider class="xian2"></el-divider>
            <div class="flow-box">
              <p v-for="(item, index) in data.offerList" :key="index">
                <span> 委托{{ item }}的报价</span>
                <span @click="tiaozhuan(item)">查看报价</span>
              </p>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- <div id="chart" class="chart"></div> -->
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
