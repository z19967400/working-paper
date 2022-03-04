<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="上传中"
    class="launchCase"
  >
    <!-- 第一步 -->
    <div v-if="!data.flag" class="theFirstStep">
      <el-row type="flex" align="middle">
        <el-col :span="2">选择债权人</el-col>
        <el-col style="margin-right:30px;" :span="6">
          <div @click="changeDialogVisible" class="select-zz">
            <span>{{ data.selectCreditors }}</span>
            <span class="el-icon-arrow-down"></span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            plain
            icon="el-icon-circle-plus-outline"
            @click="
              data.addDialogVisible = true;
              parentId = 1;
            "
            >新增债权人</el-button
          >
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="2" align="left">债务人类别 </el-col>
        <el-col :span="6">
          <el-radio-group v-model="data.Radio">
            <el-radio
              :disabled="
                data.collection_scene == 'Debt_type_7' &&
                  item.dic_content == '企业'
              "
              :label="item.dic_code"
              @change="getTemplateType"
              v-for="(item, index) in data.obligorType"
              :key="index"
              style="margin-right:60px"
              >{{ item.dic_content }}
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="zhaiwu">
        <el-col :span="2" align="left">债务类别</el-col>
        <el-col :span="30">
          <el-radio-group v-model="data.collection_scene">
            <el-radio
              style="margin-right:30px"
              class="colltype"
              :label="item.dic_code"
              @change="getTemplateType"
              v-for="(item, index) in data.Debt_type"
              :key="index"
              >{{ item.dic_content }}</el-radio
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" style="height:auto;" align="middle">
        <el-col :span="2">催收模板下载</el-col>
        <el-col :span="6">
          <div class="down-zz">
            <a
              target="_self"
              @click="downTempaly(data.templatePath)"
              style="display:block;width:100%;margin-bottom:5px;"
            >
              <el-button type="primary" plain size="small">
                点击下载催收模板
              </el-button>
            </a>
            <a
              target="_self"
              @click="downTempaly(data.templatePath)"
              style="color:#409EFF!important;font-size:12px;"
              ><span>{{ data.templateName }}</span></a
            >
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" style="height:auto;" align="middle">
        <el-col :span="2">催收信息上传</el-col>
        <el-col :span="6">
          <el-upload
            drag
            :action="data.basurl + '/Upload/UploadImage?type=2'"
            :before-upload="beforeTest"
            :on-success="afterTest"
            :show-file-list="false"
          >
            <el-button type="primary" plain size="small">
              点击上传催收信息
            </el-button>
            <div class="el-upload__text">
              <span v-if="data.uploadText == '可将文件拖曳至框内上传'">{{
                data.uploadText
              }}</span>
              <span
                v-if="data.uploadText != '可将文件拖曳至框内上传'"
                style="color:#409EFF!important;"
                >{{ data.uploadText }}</span
              >
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        :plain="!nextpoxType"
        class="nextpox"
        @click="nexttip"
        >下一步</el-button
      >
    </div>
    <div style="height:100%;" v-else class="stepTwo">
      <comSetTwo
        :height="data.height"
        :failcount="data.failcount"
        :btnType="btnType"
        :collTable="data.collTable"
        :collTabless="data.collTabless"
        :columnName="data.columnName"
        :columnNamess="data.columnNamess"
        @edit="changeEnddate"
        @go="gohistry"
        @tijiao="sendPlace"
      ></comSetTwo>
    </div>
    <!-- 选择债权人 弹框-->
    <el-dialog
      @close="
        data.creditorType = false;
        editCreaditor.authorization_file = '';
        fileList = [];
      "
      :title="data.creditortitle"
      :visible.sync="data.dialogVisible"
    >
      <el-divider></el-divider>
      <el-table
        v-if="!data.creditorType"
        :data="
          data.tableData.filter(
            data =>
              !this.data.creditor_serch ||
              data.creditor_name
                .toLowerCase()
                .includes(this.data.creditor_serch.toLowerCase())
          )
        "
        @row-click="creditorRowClick"
        style="width: 100%"
        max-height="370"
      >
        <el-table-column fixed="left" label="选择" width="80">
          <template slot-scope="scope">
            <el-radio
              v-if="scope.row.creditor_admin_audit_status != ''"
              v-model="data.collid"
              :label="scope.row.id"
              >{{ "" }}</el-radio
            >
            <span style="color:#909399;font-size:12px;" v-else>暂不可用</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人名称">
          <template slot-scope="scope">
            <span style="cursor: pointer;">{{ scope.row.creditor_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="data.creditor_serch"
              size="small"
              placeholder="输入关键字搜索"
              clearable
            >
            </el-input>
            <span>{{ scope.creditor_name }}</span>
          </template>
          <template slot-scope="scope">
            <span
              style="font-size:12px;"
              v-if="
                scope.row.creditor_admin_audit_status != '' &&
                  scope.row.creditor_admin_audit_status != '审核未通过'
              "
              :class="[
                scope.row.creditor_admin_audit_status == '审核中'
                  ? 'shenhe'
                  : 'tongguo'
              ]"
              >{{ scope.row.creditor_admin_audit_status }}</span
            >
            <div
              @click="openEditCreditor(scope.row)"
              style="cursor: pointer;color:#409EFF;font-size:12px;"
              v-else
            >
              <p style="margin:0;">
                {{
                  scope.row.creditor_admin_audit_status == "审核未通过"
                    ? "审核未通过"
                    : "未授权"
                }}
                <el-popover
                  v-if="scope.row.creditor_admin_audit_feedback"
                  placement="bottom"
                  trigger="hover"
                  :content="scope.row.creditor_admin_audit_feedback"
                  popper-class="table-click"
                  :visible-arrow="false"
                >
                  <i
                    slot="reference"
                    style="color:#606266;"
                    class="el-icon-question"
                  ></i>
                </el-popover>
              </p>
              <span>{{
                scope.row.creditor_admin_audit_status == "审核未通过"
                  ? "重新上传"
                  : "上传授权委托书"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="time" label="创建时间" width="200">
        </el-table-column> -->
      </el-table>
      <div class="CreditorBox" v-else>
        <el-row>
          <span class="lable">债权人名称</span>
          <span class="value">{{ editCreaditor.creditor_name }}</span>
        </el-row>
        <el-row>
          <span class="lable">统一社会信用代码</span>
          <span class="value">{{ editCreaditor.license_no }}</span>
        </el-row>
        <el-row>
          <span class="lable">当前管理员</span>
          <span class="value">{{ editCreaditor.admin_name }}</span>
        </el-row>
        <el-row>
          <span class="lable">管理员授权书</span>
          <span class="value"
            ><el-link
              style="font-size:14px;letter-spacing: 2px;"
              @click="upSq"
              type="success"
              >下载授权书模板</el-link
            ></span
          >
        </el-row>
        <el-row>
          <span class="lable"></span>
          <span
            style="display:inline-block;position: relative;top:-20px;width:550px;"
            class="value"
          >
            <div style="display:inline-block;" class="text">
              <el-upload
                :on-preview="preview"
                :on-exceed="exceed"
                :limit="1"
                :action="data.basurl + '/Upload/UploadImage?type=7'"
                :on-change="handleChange"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess2('authorization_file', res, file);
                  }
                "
                :before-upload="beforeAvatarUpload2"
                :file-list="fileList"
              >
                <el-button type="primary">上传授权书</el-button>
              </el-upload>
            </div>
            <div style="display:inline-block;right:0;" class="text">
              <p
                style="font-size:12px;color:#606366;line-height: 1.5;margin:0;position: relative;top:-30px;"
              >
                请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式
              </p>
              <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                >下载授权委托书模板</el-link
              > -->
            </div>
          </span>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chacakparams">确 定</el-button>
        <el-button @click="data.dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 新增债权人 弹框 -->
    <el-dialog
      custom-class="addCreditor"
      title="新增债权人"
      @close="parentId = 0"
      :visible.sync="data.addDialogVisible"
    >
      <addForms
        ref="changdialog"
        :parentId="parentId"
        @csh="addParams"
        @cancel="
          data.addDialogVisible = false;
          parentId = 0;
        "
      ></addForms>
    </el-dialog>
    <!-- 修改错误信息 -->
    <el-dialog :title="editTitle" :visible.sync="data.errorDialogVisible">
      <el-form :model="data.errorForm">
        <el-form-item :label="data.errorForm.msg">
          <el-select
            v-if="data.errorForm.texname == 'currency'"
            v-model="data.errorForm.val"
            placeholder="请选择币种"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
          >
            <el-option
              v-for="item in currency"
              :key="item.id"
              :label="item.currency_name"
              :value="item.currency_name"
            >
            </el-option>
          </el-select>
          <div v-else-if="data.errorForm.texname == 'guarantee_type'">
            <el-select
              v-model="data.errorForm.val"
              placeholder="请选择担保类型"
              @keydown.enter.native="
                sendTextVal(
                  data.errorForm.val,
                  data.errorForm.textNum,
                  data.errorForm.rownum,
                  data.errorForm.texname,
                  (data.errorForm.type = data.collTable)
                )
              "
            >
              <el-option
                v-for="(item, index) in juarantee"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <p
              style="font-size:14px;color:#909399;margin:0;padding:0;"
              v-show="data.errorForm.val"
            >
              {{ guarantee_typeTips }}
            </p>
          </div>
          <el-select
            v-else-if="data.errorForm.texname == 'confirmation_method'"
            v-model="data.errorForm.val"
            placeholder="请选择欠款确认方式"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
          >
            <el-option
              v-for="(item, index) in confirmWay"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-date-picker
            v-else-if="
              data.errorForm.texname == 'confirmation_date' ||
                data.errorForm.texname == 'agreed_payment_date'
            "
            v-model="data.errorForm.val"
            type="date"
            placeholder="选择日期"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
            >>
          </el-date-picker>
          <el-select
            v-else-if="data.errorForm.texname == 'is_dispute'"
            v-model="data.errorForm.val"
            placeholder="请选择是否存在争议"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
          >
            <el-option label="是" value="是"> </el-option>
            <el-option label="否" value="否"> </el-option>
          </el-select>
          <el-select
            v-else-if="
              data.errorForm.texname == 'jurisdiction_01_txt' ||
                data.errorForm.texname == 'jurisdiction_02_txt'
            "
            v-model="data.errorForm.val"
            placeholder="请选择管辖地区"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
          >
            <el-option label="债务人所在地" value="债务人所在地"> </el-option>
            <el-option label="债权人所在地" value="债权人所在地"> </el-option>
          </el-select>
          <!-- 多选 -->
          <el-select
            popper-class="multipleSelect"
            multiple
            v-else-if="
              data.errorForm.texname == 'property_clues' ||
                data.errorForm.texname == 'available_evidence' ||
                data.errorForm.texname == 'entrusted_matters'
            "
            @change="multipleSelect"
            v-model="multipleVal"
            style="width:100%;"
            placeholder="请选择"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                (data.errorForm.type = data.collTable)
              )
            "
          >
            <el-option
              v-show="
                data.errorForm.texname == 'property_clues' &&
                  data.Radio == 'Creditor_states_0' &&
                  data.collection_scene == 'Debt_type_4'
              "
              v-for="(item, index) in property_clues"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
            <el-option
              v-show="
                data.errorForm.texname == 'property_clues' &&
                  data.Radio == 'Creditor_states_1' &&
                  data.collection_scene == 'Debt_type_4'
              "
              v-for="(item, index) in property_clues2"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
            <el-option
              v-show="
                data.errorForm.texname == 'property_clues' &&
                  data.collection_scene == 'Debt_type_5'
              "
              v-for="(item, index) in property_clues2"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
            <el-option
              v-show="
                data.errorForm.texname == 'available_evidence' &&
                  data.collection_scene == 'Debt_type_4'
              "
              v-for="(item, index) in available_evidence2"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
            <el-option
              v-show="
                data.errorForm.texname == 'available_evidence' &&
                  data.collection_scene == 'Debt_type_5'
              "
              v-for="(item, index) in available_evidence3"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
            <el-option
              v-show="data.errorForm.texname == 'entrusted_matters'"
              v-for="(item, index) in entrusted_matters2"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 输入 -->
          <el-input
            v-else
            v-model="data.errorForm.val"
            @keyup.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                data.collTable
              )
            "
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            sendTextVal(
              data.errorForm.val,
              data.errorForm.textNum,
              data.errorForm.rownum,
              data.errorForm.texname,
              data.collTable
            )
          "
          >确 定</el-button
        >
        <el-button @click="data.errorDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./launchCase.ts" setup></script>

<style lang="scss">
@import "./launchCase.scss";
</style>
