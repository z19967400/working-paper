<template>
  <div class="entrustAdmin-wrap">
    <div class="entrustAdmin-box">
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
            <span>{{ item.label }}</span>
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
      <div
        @scroll="handleScroll($event)"
        ref="right"
        :style="{ height: height + 'px' }"
        class="right"
      >
        <div ref="section1" class="section">
          <span :class="{ act: data.rightIndex == 1 }"
            >AI律师函 Step 1 申请VIP账户</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >登录网址<a style="cursor: pointer;color:#409EFF;" @click="toWeb"
                >www.debteehelper.com</a
              >，申请VIP账户，经债主帮审核通过后获取VIP账户登录名及密码。</span
            >
            <img src="../../assets/images/manual/1.png" alt="" />
            <img src="../../assets/images/manual/2.png" alt="" />
            <img src="../../assets/images/manual/3.png" alt="" />
          </div>
        </div>

        <div ref="section2" class="section">
          <span :class="{ act: data.rightIndex == 2 }"
            >AI律师函 Step 2 登录控制台</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >输入登录名及密码，登录专属控制台，选择“AI律师函-发送律师函”。</span
            >
            <img src="../../assets/images/manual/4.png" alt="" />
          </div>
        </div>

        <div ref="section3" class="section">
          <span :class="{ act: data.rightIndex == 3 }"
            >AI律师函 Step 3 发起委托</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >选择委托信息，下载催收模板，完成填写后上传，点击“下一步”。（如需新增债权人，则先点击“新增债权人”后完成填写）。</span
            >
            <img src="../../assets/images/manual/5.png" alt="" />
          </div>
        </div>
        <div ref="section4" class="section">
          <span :class="{ act: data.rightIndex == 4 }"
            >AI律师函 Step 4 确认催收信息</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >系统将审核催收信息的填写规范，不符合要求的填写内容将以红框标出，您可点击红框在线
              修改或点击“上一步”重新上传催收信息，请您在确认所有内容填写无误后点击“提交委托”。</span
            >
            <img src="../../assets/images/manual/6.png" alt="" />
          </div>
        </div>

        <div ref="section5" class="section">
          <span :class="{ act: data.rightIndex == 5 }"
            >AI律师函 Step 5 完成支付</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >完成支付，VIP账户可联系您的专属客服申请开通先催后付功能。</span
            >
            <img src="../../assets/images/manual/7.png" alt="" />
          </div>
        </div>

        <div ref="section6" class="section">
          <span :class="{ act: data.rightIndex == 6 }"
            >AI律师函 Step 6 实时查看</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >催收委托经债主帮审核通过后，将自动开始执行，您可在“AI律师函-委托管理-管理”中实时查看执行进展、随时终止执行或获取执行报告。</span
            >
            <img src="../../assets/images/manual/8.png" alt="" />
            <img src="../../assets/images/manual/9.png" alt="" />
          </div>
        </div>

        <div ref="section7" class="section">
          <span :class="{ act: data.rightIndex == 7 }"
            >律师办案 Step 1 申请VIP账户</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >登录网址<a style="cursor: pointer;color:#409EFF;" @click="toWeb"
                >www.debteehelper.com</a
              >，申请VIP账户，经债主帮审核通过后获取VIP账户登录名及密码。</span
            >
            <img src="../../assets/images/manual/1.png" alt="" />
            <img src="../../assets/images/manual/2.png" alt="" />
            <img src="../../assets/images/manual/3.png" alt="" />
          </div>
        </div>

        <div ref="section8" class="section">
          <span :class="{ act: data.rightIndex == 8 }"
            >律师办案 Step 2 登录控制台</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >输入登录名及密码，登录专属控制台，选择“AI律师函-发送律师函”。</span
            >
            <img src="../../assets/images/manual/4.png" alt="" />
          </div>
        </div>

        <div ref="section9" class="section">
          <span :class="{ act: data.rightIndex == 9 }"
            >律师办案 Step 3 发起委托</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >选择委托信息，下载催收模板，完成填写后上传，点击“下一步”。（如需新增债权人，则先点击“新增债权人”后完成填写）。</span
            >
            <img src="../../assets/images/manual/10.png" alt="" />
          </div>
        </div>

        <div ref="section10" class="section">
          <span :class="{ act: data.rightIndex == 10 }"
            >律师办案 Step 4 确认催收信息</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >系统将审核催收信息的填写规范，不符合要求的填写内容将以红框标出，您可点击红框在线修改或点击“上一步”重新上传催收信息，请您在确认所有内容填写无误后点击“提交委托”。</span
            >
            <img src="../../assets/images/manual/11.png" alt="" />
          </div>
        </div>

        <div ref="section11" class="section">
          <span :class="{ act: data.rightIndex == 11 }"
            >律师办案 Step 5 管理案件</span
          >
          <el-divider></el-divider>
          <div class="box">
            <span class="title"
              >债主帮评估案件后将会与您联系并提供案件评估分析报告及报价，您接受报价后与债主帮签署服务合同。您可在“律师办案-案件管理-管理”中查看案件信息及办案进度。</span
            >
            <img src="../../assets/images/manual/12.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./manual.ts"></script>

<style lang="scss">
@import "./manual.scss";
</style>
