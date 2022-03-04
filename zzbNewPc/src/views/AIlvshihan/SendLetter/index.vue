<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="上传中"
    class="letter"
  >
    <!-- 主页面 -->
    <div class="letter" v-show="data.flag">
      <!-- 选择债权人 -->
      <el-row type="flex" align="middle">
        <el-col :span="2">选择债权人</el-col>
        <el-col style="margin-right:30px;" :span="6">
          <div @click="changeDialogVisible" class="select-zz">
            <span>{{ selectCreditors }}</span>
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
      <!-- 债务人类别 -->
      <el-row type="flex" align="middle">
        <el-col :span="2" align="left">债务人类别</el-col>
        <el-col :span="6">
          <el-radio-group v-model="data.Radio">
            <el-radio
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
      <!-- 债务类别 -->
      <el-row type="flex" align="middle" class="zhaiwu">
        <el-col :span="2" align="left">债务类别</el-col>
        <el-col :span="30">
          <el-radio-group v-model="data.collection_scene">
            <el-radio
              v-show="item.type == 'any' || item.type == data.Radio"
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
      <!-- 收款信息 -->
      <el-row type="flex" align="middle">
        <el-col :span="2" align="left">收款信息</el-col>
        <el-col style="margin-right:30px;" :span="4">
          <div @click="openShouKuang" class="select-zz">
            <span>{{ selectTicket }}</span>
            <span class="el-icon-arrow-down"></span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            plain
            @click="data.addCollectionDialogVisible = true"
            >新增收款信息</el-button
          >
        </el-col>
      </el-row>
      <!-- 发函方式 -->
      <!-- <el-row type="flex" align="middle">
        <el-col :span="2" align="left">发函方式</el-col>
        <el-col :span="30">
          <el-radio-group v-model="data.send_type">
            <el-radio
              :label="item.dic_code"
              v-for="(item, index) in data.SendLetter"
              :key="index"
              >{{ item.dic_content }}</el-radio
            >
          </el-radio-group>
        </el-col>
      </el-row> -->
      <!-- 增值服务 -->
      <el-row type="flex" align="middle">
        <el-col :span="2" align="left">增值服务</el-col>
        <el-col :span="9">
          <el-checkbox-group v-model="data.checkList">
            <el-checkbox label="1">催收短信</el-checkbox>
            <el-checkbox label="2">催收电话</el-checkbox>
            <el-checkbox label="3">电子邮件催款函</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!-- 法催主体 -->
      <el-row type="flex" align="middle">
        <el-col :span="2" align="left">法催主体</el-col>
        <el-col :span="6">
          <el-radio-group v-model="data.logo_type">
            <el-radio
              :label="item.dic_code"
              v-for="(item, index) in data.Logo_types"
              :key="index"
            >
              <img
                style="position: relative;top:10px;"
                v-if="item.dic_content == '诚收法催'"
                src="https://file.debteehelper.com/logo/logo_csfc.png"
                height="31"
              />
              <img
                style="position: relative;top:10px;"
                v-else
                src="https://file.debteehelper.com/logo/logo_zzbang_02.png"
                height="31"
              />
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" style="height:auto;" align="middle">
        <el-col :span="2">催收模板下载</el-col>
        <el-col :span="12">
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
        <el-col :span="12">
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
              <span v-if="uploadText == '可将文件拖曳至框内上传'">{{
                uploadText
              }}</span>
              <span
                v-if="uploadText != '可将文件拖曳至框内上传'"
                style="color:#409EFF!important;"
                >{{ uploadText }}</span
              >
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <!-- 下一步按钮 -->
      <el-button
        type="primary"
        :plain="!nextpoxType"
        class="nextpox"
        @click="nexttip"
        >下一步</el-button
      >
    </div>

    <!-- 第二步 批量上传 -->
    <div style="height:100%" v-if="!data.flag">
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
      <!-- <el-row :gutter="20" class="buttonbb">
        <el-col :span="3">
          <el-button type="primary" @click="sendPlace">提交委托</el-button>
        </el-col>
        <el-col :span="3">
          <el-button @click="data.flag = !data.flag">上一步</el-button>
        </el-col>
      </el-row> -->
    </div>

    <!-- 弹框 -->
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
        max-height="400"
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
              style="cursor: pointer;font-size:12px;"
              :style="{
                color:
                  scope.row.creditor_admin_audit_status == '审核未通过'
                    ? '#ec193a'
                    : '#409EFF'
              }"
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
        <el-row style="margin-bottom:0px;">
          <span class="lable xinghao">管理员授权书</span>
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
            <div class="text">
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
                style="font-size:12px;color:#606366;line-height: 1.5;margin:0;position: relative;top:-23px;"
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

    <!-- 选择收款信息 弹框 -->
    <el-dialog
      title="选择收款信息"
      :visible.sync="data.collectionDialogVisible"
    >
      <el-table
        style="width: 100%"
        @row-click="collectionRowClick"
        :data="data.shoukuanTableData"
        max-height="350"
      >
        <!-- <el-table-column fixed prop="id" label="ID" width="50">
        </el-table-column> -->
        <!-- <el-table-column prop="payment_channel_name" label="收款信息名称" width="120">
        </el-table-column> -->
        <el-table-column prop="contacts_name" label="联系人" width="120">
        </el-table-column>
        <el-table-column prop="contacts_phone" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="contacts_email" label="电子邮箱" width="180">
        </el-table-column>
        <el-table-column prop="payee_name" label="收款账户" width="120">
        </el-table-column>
        <el-table-column prop="bank_account" label="收款账号" width="120">
        </el-table-column>
        <el-table-column prop="bank_name" label="收款银行支行" width="120">
        </el-table-column>
        <el-table-column
          prop="alipay_account"
          label="收款企业支付宝"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="pay_remarks" label="收款备注" width="120">
        </el-table-column>
        <!-- <el-table-column prop="time" label="创建时间" width="200">
        </el-table-column> -->
        <el-table-column fixed="left" label="选择" width="60">
          <template slot-scope="scope">
            <el-radio v-model="data.moneids" :label="scope.row.id">{{
              ""
            }}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <!-- <collection-table @listensendMoidss="moneyid"></collection-table> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ticket">确 定</el-button>
        <el-button @click="data.collectionDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增收款信息 -->
    <el-dialog
      title="新增收款信息"
      :visible.sync="data.addCollectionDialogVisible"
    >
      <!-- <shoukuan-form ref="reference" @listenaddid="addcollid"></shoukuan-form> -->
      <el-form
        label-position="left"
        label-width="110px"
        :model="collectList"
        :rules="data.addCollectionRuleForm"
        ref="addRuleRef"
      >
        <!-- <el-form-item label="收款信息名称" prop="payment_channel_name">
          <el-col :span="22">
            <el-input v-model="collectList.payment_channel_name"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="联系人名称" prop="contacts_name">
          <el-col :span="22">
            <el-input v-model="collectList.contacts_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-col :span="22">
            <el-input v-model="collectList.contacts_phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="contacts_email">
          <el-col :span="22">
            <el-input v-model="collectList.contacts_email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账户名称">
          <el-col :span="22">
            <el-input v-model="collectList.alipay_account"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收款账号">
          <el-col :span="22">
            <el-input v-model="collectList.payee_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收款银行">
          <el-col :span="22">
            <el-input v-model="collectList.bank_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="企业支付宝">
          <el-col :span="22">
            <el-input v-model="collectList.bank_account"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="付款备注">
          <el-col :span="22">
            <el-input v-model="collectList.pay_remarks"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getAddCollection">确 定</el-button>
        <el-button @click="data.addCollectionDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改错误信息 -->
    <el-dialog :title="editTitle" :visible.sync="data.errorDialogVisible">
      <el-form :model="data.errorForm">
        <el-form-item>
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
                data.errorForm.type == '主表'
                  ? data.collTable
                  : data.collTabless
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
          <el-input
            v-else
            v-model="data.errorForm.val"
            @keydown.enter.native="
              sendTextVal(
                data.errorForm.val,
                data.errorForm.textNum,
                data.errorForm.rownum,
                data.errorForm.texname,
                data.errorForm.type == '主表'
                  ? data.collTable
                  : data.collTabless
              )
            "
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <span v-show="data.errorForm.msg" style="color:#ec193a;">{{
          data.errorForm.msg
        }}</span>
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
              data.errorForm.type == '主表' ? data.collTable : data.collTabless
            )
          "
          >确 定</el-button
        >
        <el-button @click="data.errorDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 支付弹窗 -->
    <pay :info="payinfo" @close="payClose" v-show="payShow"></pay>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
