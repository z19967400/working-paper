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
            :style="{
              transform: ' translateY(' + data.actIndex * 40 + 'px)'
            }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div ref="right" :style="{ height: height + 'px' }" class="right">
        <!-- 委托信息 -->
        <div ref="section0" class="section">
          <span style="margin-top:0;" :class="{ act: data.rightIndex == 0 }">
            {{ this.data.labers[0].children[0].name }}
            <el-button
              @click="
                data.states.states0 = !data.states.states0
                Edit()
              "
              style="color:#E6A23C;float:right;top:-5px;position: relative;"
              type="text"
              size="small"
              >{{ data.states.states0 ? '取消' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p v-if="!data.states.states0">
                <span>{{ item.name }}</span>
                <span
                  v-if="
                    item.prop === 'property_clues_file' ||
                      item.prop === 'evidence_file'
                  "
                >
                  <span
                    v-for="(item2, index2) in item.value == null
                      ? []
                      : item.value.split(',')"
                    :key="index2"
                  >
                    <el-link
                      v-show="item2 !== ''"
                      style="margin-right:10px;"
                      @click="openUrl(item2)"
                      type="success"
                      >{{ Mysubstring(item2) }},</el-link
                    >
                  </span>
                </span>
                <span v-else>{{ item.value }}</span>
              </p>
              <p style="min-height:50px;" v-else>
                <span style="width:100px;">{{ item.name }}</span>
                <el-input
                  v-if="
                    item.prop !== 'property_clues_file' &&
                      item.prop !== 'evidence_file'
                  "
                  style="width:330px;"
                  v-model="data.edit[item.prop]"
                ></el-input>
                <el-upload
                  v-else-if="item.prop === 'property_clues_file'"
                  class="upload-demo"
                  :action="`${url}/Upload/UploadImage?type=9`"
                  :on-success="
                    (res, file) => {
                      handleAvatarSuccess(item.prop, res, file)
                    }
                  "
                  :on-preview="handlePreview"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button type="primary">点击上传</el-button>
                </el-upload>
                <el-upload
                  v-else-if="item.prop === 'evidence_file'"
                  class="upload-demo"
                  :action="`${url}/Upload/UploadImage?type=9`"
                  :on-success="
                    (res, file) => {
                      handleAvatarSuccess(item.prop, res, file)
                    }
                  "
                  :on-preview="handlePreview"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :file-list="fileList2"
                >
                  <el-button type="primary">点击上传</el-button>
                </el-upload>
              </p>
            </div>
            <el-button v-show="data.states.states0" @click="save" type="primary"
              >保存</el-button
            >
          </div>
        </div>
        <!-- 执行进度 -->
        <div ref="section1" class="section">
          <span :class="{ act: data.rightIndex == 1 }">
            {{ this.data.labers[0].children[1].name }}
            <el-button
              @click="data.states.states1 = !data.states.states1"
              style="color:#E6A23C;float:right;top:-5px;position: relative;"
              type="text"
              size="small"
              >{{ data.states.states1 ? '取消' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div v-if="!data.states.states1" class="text">
              <p>
                <span style="font-size:14px;color:#606366;">{{
                  data.auditStatus
                }}</span>
              </p>
            </div>
            <div style="margin-top:10px;" v-else>
              <el-radio-group v-model="data.updata.Service_Process">
                <el-radio :label="'Service_Status_0'">待审核</el-radio>
                <el-radio :label="'Service_Status_1'">审核未通过</el-radio>
                <el-radio :label="'Service_Status_2'">确认报价</el-radio>
                <el-radio :label="'Service_Status_3'">执行中</el-radio>
                <el-radio :label="'Service_Status_4'">结束</el-radio>
              </el-radio-group>
              <el-button
                style="display:block;margin-top:20px;"
                size="small"
                plain
                @click="save1"
                type="primary"
                >保存</el-button
              >
            </div>
          </div>
        </div>
        <!-- 委托报价 -->
        <div ref="section2" class="section">
          <span :class="{ act: data.rightIndex == 2 }">
            {{ this.data.labers[0].children[2].name }}
            <el-button
              @click="data.states.states2 = !data.states.states2"
              style="color:#E6A23C;float:right;top:-5px;position: relative;"
              type="text"
              size="small"
              >{{ data.states.states2 ? '取消' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div v-if="!data.states.states2" class="text">
              <p>
                <span
                  style="font-size:14px;color:#606366;"
                  v-if="data.quote === 0"
                  >暂无报价</span
                >
                <span style="font-size:14px;color:#606366;" v-else
                  >人民币{{ data.quote }}元</span
                >
              </p>
            </div>
            <div v-else>
              <p>
                金额
                <el-input
                  size="small"
                  style="width:120px;margin:0 10px;"
                  v-model="data.updata.price"
                  placeholder="请输入金额"
                ></el-input
                >元人民币
              </p>
              <el-button
                style="display:block;margin-top:20px;"
                size="small"
                plain
                @click="save2"
                type="primary"
                >保存</el-button
              >
            </div>
          </div>
        </div>
        <!-- 支付信息 -->
        <!-- <div ref="section3" class="section">
          <span :class="{ act: data.rightIndex == 2 }">
            {{this.data.labers[0].children[3].name}}
            <el-button style="color:#67C23A;float:right;top:-5px;position: relative;" type="text" size="small">编辑</el-button>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <p>
                <span v-if="data.quote === 0">暂无报价</span>
                <span v-else>人民币{{data.quote}}元</span>
              </p>
            </div>
          </div>
        </div> -->
        <!-- 后台备注 -->
        <div ref="section3" class="section">
          <span :class="{ act: data.rightIndex == 3 }">
            {{ this.data.labers[0].children[3].name }}
            <el-button
              @click="data.states.states3 = !data.states.states3"
              style="color:#E6A23C;float:right;top:-5px;position: relative;"
              type="text"
              size="small"
              >{{ data.states.states3 ? '取消' : '编辑' }}</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <p v-if="!data.states.states3">
                <span
                  style="font-size:14px;color:#606366;"
                  v-if="data.updata.back_remarks === ''"
                  >暂无备注</span
                >
                <span
                  style="font-size:14px;color:#606366;display:block;width:600px;word-wrap: break-word;height: auto;word-break: break-all;"
                  v-else
                  >{{ data.updata.back_remarks }}</span
                >
              </p>
              <div v-else>
                <el-input
                  type="textarea"
                  :rows="6"
                  style="width:600px;"
                  placeholder="请输入后台备注"
                  v-model="data.updata.back_remarks"
                >
                </el-input>
                <el-button
                  style="display:block;margin-top:20px;"
                  size="small"
                  plain
                  @click="save3"
                  type="primary"
                  >保存</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button size="small" plain @click="revoke" type="primary"
        >返回
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./servicesInfo2.ts"></script>

<style lang="scss">
@import './servicesInfo.scss';
</style>
