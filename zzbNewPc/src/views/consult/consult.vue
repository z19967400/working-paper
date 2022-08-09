<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="consult">
    <div class="content">
      <div class="box">
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              当事人名称
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:330px;"
              placeholder="请输入"
              v-model="data.name"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              查档地域
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <adress @emitAddress="emitAddress" :address="data.area"></adress>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              查档类型
              <img style="top:30px;" src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-checkbox-group v-model="data.a_type">
              <el-checkbox
                v-for="(item, index) in searchTypes"
                :key="index"
                :label="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">其他类型补充说明</span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:500px;"
              type="textarea"
              rows="4"
              placeholder="“查档类型”选择“其他类型”时请填写补充说明"
              v-model="data.a_type_01"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="2">
            <span class="lable">
              现有资料
              <img style="top:30px;" src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-checkbox-group
              @change="handChange"
              v-model="data.information_01"
            >
              <el-checkbox
                v-for="(item, index) in information"
                :key="index"
                :label="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row v-if="data.information_01.length !== 0" type="flex">
          <el-col style="opacity:0;" :span="2">
            <span class="lable">现有资料补充</span>
          </el-col>
          <el-col :span="14">
            <el-col v-for="(item, index) in replenish" :key="index" :span="12">
              <div v-if="item.name === '其他资料' && item.show">
                <el-col style="margin-top:10px;" :span="6">
                  <span class="lable">{{ item.name }}</span>
                </el-col>
                <el-col style="margin-top:10px;" :span="18">
                  <el-input
                    style="width:330px;"
                    type="textarea"
                    rows="4"
                    placeholder="“现有资料”选择“其他资料”时请填写"
                    v-model="item.value"
                  >
                  </el-input>
                </el-col>
              </div>
              <div
                v-else-if="
                  item.name === '当事人姓名' ||
                    item.name === '当事人身份证号' ||
                    item.name === '当事人户籍地址' ||
                    item.name === '房产具体地址' ||
                    item.name === '公司名称'
                "
              >
                <el-col style="margin-top:10px;" v-show="item.show" :span="6">
                  <span class="lable">{{ item.name }}</span>
                </el-col>
                <el-col style="margin-top:10px;" v-show="item.show" :span="18">
                  <el-input
                    style="width:330px;"
                    placeholder="请输入"
                    v-model="item.value"
                  >
                  </el-input>
                </el-col>
              </div>
              <div
                v-else-if="
                  item.name === '法院立案通知书' ||
                    item.name === '执行通知书' ||
                    item.name === '法院判决' ||
                    item.name === '法院调查令' ||
                    item.name === '仲裁受理通知书' ||
                    item.name === '当事人授权委托书'
                "
              >
                <el-col style="margin-top:10px;" v-show="item.show" :span="6">
                  <span class="lable">{{ item.name }}</span>
                </el-col>
                <el-col style="margin-top:10px;" v-show="item.show" :span="18">
                  <el-radio-group v-model="item.value">
                    <el-radio :label="true">有</el-radio>
                    <el-radio :label="false">无</el-radio>
                  </el-radio-group>
                </el-col>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">现有资料上传</span>
          </el-col>
          <el-col :span="12">
            <el-upload
              drag
              :action="basurl + '/Upload/UploadImage?type=8'"
              :before-upload="beforeTest"
              :on-success="afterTest"
              :show-file-list="false"
            >
              <el-button type="primary" plain size="small">
                点击上传资料
              </el-button>
              <div class="el-upload__text">
                <span
                  style="color:#909399;"
                  v-if="
                    uploadText ==
                      '可拖拽至框内上传,文件小于50M,仅支持zip/rar/7z格式'
                  "
                  >{{ uploadText }}</span
                >
                <span v-else style="color:#409EFF!important;">{{
                  uploadText
                }}</span>
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              联系人姓名
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:330px;"
              v-model="data.contacts_name"
              placeholder="请填写查询人的联系人姓名，以便联系"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              联系人手机号
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:330px;"
              v-model="data.contacts_telphone"
              placeholder="请填写查询人的联系人手机号，以便联系"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              联系人邮箱
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:330px;"
              v-model="data.contacts_email"
              placeholder="请填写查询人的联系人邮箱，以便发送资料"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">备注</span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:500px;"
              type="textarea"
              rows="4"
              placeholder="如有，请填写"
              v-model="data.member_remarks"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-button
      style="margin-left:140px;"
      type="primary"
      :disabled="nextpoxType"
      @click="tijiao"
      class="nextpox"
      >提交委托</el-button
    >
  </div>
</template>
<script lang="ts" src="./consult.ts"></script>

<style lang="scss">
@import "./consult.scss";
</style>
