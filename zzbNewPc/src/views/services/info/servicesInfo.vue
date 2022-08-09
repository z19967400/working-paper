<template>
  <div class="servicesInfo-wrap">
    <div class="servicesInfo-box">
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
          <span style="margin-top:0;" :class="{ act: data.rightIndex == 0 }">{{
            this.data.labers[0].children[0].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <p>
                <span>{{ data.auditStatus }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 办案事项 -->
        <div ref="section1" class="section">
          <span :class="{ act: data.rightIndex == 1 }">{{
            this.data.labers[0].children[1].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p>
                <span>{{ item.name }}</span>
                <span
                  v-if="item.prop === 'information_01'"
                  v-html="item.value"
                ></span>
                <el-link
                  v-else-if="item.prop === 'information_file'"
                  @click="openUrl(item.value)"
                  type="success"
                  >{{ Mysubstring(item.value) }}</el-link
                >
                <span v-else>{{ item.value }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 案件信息 -->
        <div ref="section2" class="section">
          <span :class="{ act: data.rightIndex == 2 }">{{
            this.data.labers[0].children[2].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <div style="font-size:14px !important;color:#606266;">
                <span v-if="data.quote === 0">暂无报价</span>
                <span v-else>人民币{{ data.quote }}元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

<script lang="ts" src="./servicesInfo.ts"></script>

<style lang="scss">
@import "./servicesInfo.scss";
</style>
