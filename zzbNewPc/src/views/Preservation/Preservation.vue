<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="Preservation">
    <div class="content">
      <div class="box">
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              财产保全申请人
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="6">
            <el-input
              style="width:330px;"
              v-model="data.applicant"
              placeholder="请填写财产保全申请人名称"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <span class="lable">
              财产保全被申请人
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="6">
            <el-input
              style="width:330px;"
              v-model="data.respondent"
              placeholder="请填写财产保全被申请人名称"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              管辖法院所在地
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="6">
            <adress
              @emitAddress="emitAddress"
              :address="data.seat_of_court"
            ></adress>
          </el-col>
          <el-col :span="2">
            <span class="lable">
              申请保全金额
              <img src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="6">
            <el-input
              style="width:330px;"
              v-model="data.application_amount"
              placeholder="（元/人民币）"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              现有证据
              <img style="top:30px;" src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-checkbox-group v-model="data.evidence_01">
              <el-checkbox
                v-for="(item, index) in evidence"
                :key="index"
                :label="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">其他证据</span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:500px;"
              type="textarea"
              rows="4"
              placeholder="如有,请填写"
              v-model="data.evidence_02"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">证据资料上传</span>
          </el-col>
          <el-col :span="12">
            <el-upload
              drag
              :action="basurl + '/Upload/UploadImage?type=8'"
              :before-upload="beforeTest"
              :on-success="afterTest2"
              :show-file-list="false"
            >
              <el-button type="primary" plain size="small">
                点击上传资料
              </el-button>
              <div class="el-upload__text">
                <span
                  style="color:#909399;"
                  v-if="
                    uploadText2 ==
                      '可拖拽至框内上传,文件小于50M,仅支持zip/rar/7z格式'
                  "
                  >{{ uploadText2 }}</span
                >
                <span v-else style="color:#409EFF!important;">{{
                  uploadText2
                }}</span>
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">
              债务人财产线索
              <img style="top:10px;" src="../../assets/images/bt.svg" />
            </span>
          </el-col>
          <el-col :span="14">
            <el-checkbox-group v-model="data.property_clues">
              <el-checkbox
                v-for="(item, index) in property"
                :key="index"
                :label="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">其他财产线索</span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:500px;"
              type="textarea"
              rows="4"
              placeholder="如有,请填写"
              v-model="data.property_clues_explain"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <span class="lable">财产线索资料上传</span>
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
            <span class="lable">案件简介</span>
          </el-col>
          <el-col :span="14">
            <el-input
              style="width:500px;"
              type="textarea"
              rows="4"
              placeholder="如有,请填写"
              v-model="data.case_profiles"
            >
            </el-input>
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
              placeholder="请填写提交人的联系人姓名，以便联系"
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
              placeholder="请填写提交人的联系人手机号，以便联系"
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
              placeholder="请填写提交人的联系人邮箱，以便发送资料"
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
<script lang="ts" src="./Preservation.ts"></script>

<style lang="scss">
@import "./Preservation.scss";
</style>
