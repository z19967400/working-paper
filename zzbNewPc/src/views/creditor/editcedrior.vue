<template>
  <div
    class="editcedrior"
    v-loading="loading"
    :element-loading-text="data.submitType ? '提交中' : '识别中'"
  >
    <el-divider></el-divider>
    <el-form
      ref="editcedriorFrom"
      :rules="data.rules"
      :model="data.edit"
      label-width="140px"
      class="editcedrior-form"
    >
      <div v-if="data.step == 0">
        <el-form-item
          label="上传营业执照"
          prop="license_img_url"
          class="zhengzhao"
        >
          <el-col class="upBox" :span="22">
            <el-upload
              drag
              class="avatar-uploader uploader-teshu"
              :action="burl + '/Upload/UploadImage?type=7'"
              :show-file-list="false"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess('license_img_url', res, file);
                }
              "
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="data.edit.license_img_url"
                :src="data.edit.license_img_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                营业执照为最新版原文件拍照照片，要求文件四角都在图片内，清晰无遮挡，图片水印不可与办理业务无关&nbsp;。&nbsp;支持jpg&nbsp;、&nbsp;jpeg、png格式文件，文件须小于10M
              </div>
            </el-upload>
            <i
              v-show="data.edit.license_img_url"
              @click="preview(data.edit.license_img_url)"
              class="el-icon-search preview"
              ><span class="preview-text">+</span></i
            >
            <span class="upBox-tip">可将文件拖曳至框内上传</span>
          </el-col>
        </el-form-item>
      </div>
      <div v-else-if="data.step == 1" class="form-box">
        <el-form-item label="营业执照">
          <img
            @click="preview(data.edit.license_img_url)"
            class="avatar2"
            :src="data.edit.license_img_url"
          />
          <el-button
            @click="data.step = 0"
            class="avatar2-btn"
            size="small"
            type="primary"
            >重新上传</el-button
          >
        </el-form-item>
        <el-form-item label="债权人名称" prop="creditor_name">
          <el-col :span="22">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="data.edit.creditor_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="license_no">
          <el-col :span="22">
            <el-input
              placeholder="可自动填充或手动修改"
              v-model="data.edit.license_no"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="办公地址" prop="detailed_address">
          <el-col :span="22">
            <el-input v-model="data.edit.detailed_address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="!is_super == 1">
          <template slot="label">
            <span class="xinghao">当前管理员</span>
          </template>
          <el-col :span="7">
            <el-input disabled v-model="admin_name"></el-input>
          </el-col>
          <el-col
            v-html="
              `<span style='font-size:12px;margin-left:25px;'>您的权限为普通管理员，只可新增由您作为管理员的债权人</span>`
            "
            :span="15"
          >
          </el-col>
        </el-form-item>

        <el-form-item style="margin-bottom:0px;" v-if="!is_super == 1">
          <template slot="label">
            <span class="xinghao">管理员授权书</span>
          </template>
          <el-link
            style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
            @click="upSq"
            type="success"
            >下载授权书模板</el-link
          >
        </el-form-item>
        <el-form-item v-if="!is_super == 1">
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              :on-preview="preview2"
              :on-exceed="exceed"
              :limit="1"
              :action="burl + '/Upload/UploadImage?type=7'"
              :on-change="handleChange"
              :on-success="
                (res, file) => {
                  handleAvatarSuccess2(res, file);
                }
              "
              :before-upload="beforeAvatarUpload2"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传授权书</el-button>
            </el-upload>
          </el-col>
          <el-col :span="14">
            <div style="line-height: 1.5;">
              <span
                style="font-size:12px;color:#606366;display:block;;position: relative;top:-27px"
                >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
              >
              <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                >下载授权委托书模板</el-link
              > -->
            </div>
          </el-col>
        </el-form-item>
      </div>
      <div v-else-if="data.step == 2" class="form-box">
        <el-form
          ref="editcedriorFrom2"
          :rules="data.rules2"
          :model="data.edit.admin"
          :label-width="formLabelWidth"
        >
          <el-form-item label="债权人名称">
            <span>{{ data.edit.creditor_name }}</span>
          </el-form-item>
          <el-form-item label="管理员设置">
            <el-radio-group @change="typeChange" v-model="data.type">
              <el-radio label="新增管理员"></el-radio>
              <el-radio label="选择已有管理员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="addFrom" v-if="data.type === '新增管理员'">
            <el-form-item label="登录名" prop="admin_account">
              <el-input
                v-model="data.edit.admin.admin_account"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="admin_name">
              <el-input
                v-model="data.edit.admin.admin_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="id_number">
              <el-input
                v-model="data.edit.admin.id_number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="admin_phone_number">
              <el-input
                v-model="data.edit.admin.admin_phone_number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="admin_email">
              <el-input
                v-model="data.edit.admin.admin_email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              style="margin-bottom:0px;"
              label="管理员授权书"
              prop="authorization_file"
            >
              <el-link
                style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
                @click="upSq"
                type="success"
                >下载授权书模板</el-link
              >
            </el-form-item>
            <el-form-item prop="authorization_file">
              <el-col :span="12">
                <el-upload
                  class="upload-demo"
                  :on-preview="preview2"
                  :on-exceed="exceed"
                  :limit="1"
                  :action="burl + '/Upload/UploadImage?type=7'"
                  :on-change="handleChange"
                  :on-success="
                    (res, file) => {
                      handleAvatarSuccess2(res, file);
                    }
                  "
                  :before-upload="beforeAvatarUpload2"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">上传授权书</el-button>
                </el-upload>
              </el-col>
              <el-col :span="10">
                <div style="line-height: 1.5;">
                  <span
                    style="font-size:12px;color:#606366;display:block;position: relative;top:-27px;letter-spacing: 1px;"
                    >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
                  >
                  <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                    >下载授权委托书模板</el-link
                  > -->
                </div>
              </el-col>
            </el-form-item>
          </div>
          <div v-else>
            <!-- <el-form-item style="margin-bottom:0px;" label="选择管理员"> -->
            <el-table
              style="width: 90%;margin-left:28px;"
              border
              :data="data.tableData"
              height="250"
            >
              <el-table-column prop="index" label="序号" width="60px">
              </el-table-column>
              <el-table-column prop="admin_name" label="真实姓名" width="120px">
              </el-table-column>
              <el-table-column prop="id_number" label="身份证号" width="180px">
              </el-table-column>
              <el-table-column
                prop="admin_phone_number"
                label="手机号码"
                width="180px"
              >
              </el-table-column>
              <el-table-column
                prop="admin_email"
                label="电子邮箱"
                width="330px"
              >
              </el-table-column>
              <el-table-column fixed="right" label="选择">
                <template slot-scope="scope">
                  <el-radio
                    v-model="data.active"
                    @change="choice"
                    :label="scope.row.id"
                    >选中</el-radio
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- </el-form-item> -->
            <el-form-item style="margin-bottom:0px;">
              <template slot="label">
                <span class="xinghao">管理员授权书</span>
              </template>
              <el-link
                style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
                @click="upSq"
                type="success"
                >下载授权书模板</el-link
              >
            </el-form-item>
            <el-form-item>
              <el-col :span="10">
                <el-upload
                  class="upload-demo"
                  :on-preview="preview2"
                  :on-exceed="exceed"
                  :limit="1"
                  :action="burl + '/Upload/UploadImage?type=7'"
                  :on-change="handleChange"
                  :on-success="
                    (res, file) => {
                      handleAvatarSuccess2(res, file);
                    }
                  "
                  :before-upload="beforeAvatarUpload2"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">上传授权书</el-button>
                </el-upload>
              </el-col>
              <el-col :span="12">
                <div style="line-height: 1.5;">
                  <span
                    style="font-size:12px;color:#606366;display:block;position: relative;top:-27px;"
                    >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
                  >
                  <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                    >下载授权委托书模板</el-link
                  > -->
                </div>
              </el-col>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-else class="step3-box">
        <el-form style="width:100%;margin:auto;" label-width="140px">
          <el-form-item label="债权人名称">
            <span>{{ data.edit.creditor_name }}</span>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <span>{{ data.edit.license_no }}</span>
          </el-form-item>
          <el-form-item label="当前管理员">
            <span>{{ admin_name }}</span>
          </el-form-item>
          <el-form-item style="margin-bottom:0px;">
            <template slot="label">
              <span class="xinghao">管理员授权书</span>
            </template>
            <el-link
              style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
              @click="upSq"
              type="success"
              >下载授权书模板</el-link
            >
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                :on-preview="preview2"
                :on-exceed="exceed"
                :limit="1"
                :action="burl + '/Upload/UploadImage?type=7'"
                :on-change="handleChange"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess2(res, file);
                  }
                "
                :before-upload="beforeAvatarUpload2"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">上传授权书</el-button>
              </el-upload>
            </el-col>
            <el-col :span="10">
              <div style="line-height: 1.5;">
                <span
                  style="font-size:12px;color:#606366;display:block;position: relative;top:-27px;"
                  >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
                >
                <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                    >下载授权委托书模板</el-link
                  > -->
              </div>
            </el-col>
          </el-form-item>
          <div class="edit-bottom-bin">
            <el-button
              :loading="data.submitType"
              type="primary"
              @click="submitForm('editcedriorFrom')"
              >确定</el-button
            >
            <el-button @click="close">取消</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="data.step != 0 && data.step != 3">
        <div v-if="is_super == 1" class="edit-bottom-bin">
          <div v-if="data.step == 1">
            <el-button type="primary" @click="goTwo('editcedriorFrom')"
              >下一步</el-button
            >
            <el-button @click="close">取消</el-button>
          </div>
          <div v-if="data.step == 2">
            <el-button @click="data.step = 0">上一步</el-button>
            <el-button
              :loading="data.submitType"
              type="primary"
              @click="submitForm('editcedriorFrom2')"
              >确定</el-button
            >
            <el-button @click="close">取消</el-button>
          </div>
        </div>
        <div v-else class="edit-bottom-bin">
          <el-button
            :loading="data.submitType"
            type="primary"
            @click="submitForm('editcedriorFrom')"
            >确定</el-button
          >
          <el-button @click="close">取消</el-button>
        </div>
      </div>
      <div v-if="data.step == 0" class="edit-bottom-bin">
        <el-button @click="close">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../api/creditor";
import { baseURL, pp } from "../../utils/request";
import { comAddress } from "../../components/index";
import { verifyPhone, verifyEmall } from "../../utils/common";
import { api } from "../../../../zzbPc/src/assets/js/api";
import { getCookie } from "../../utils/common";
@Component({
  components: {
    comAddress
  }
})
export default class About extends Vue {
  name: any = "addForms";
  //prop
  @Prop() parentId?: number;
  //Watch
  @Watch("parentId", { immediate: true })
  parentIdChange(newVal: number, oldVal: number) {
    let self: any = this;
    self.data.edit.admin.creditor_id = 0;
    self.data.step = 0;
    self.fileList = [];
    self.data.edit = {
      creditor_name: "",
      license_no: "",
      license_img_url: "",
      detailed_address: "", //详细地址
      admin: {
        //管理员信息
        creditor_id: 0,
        admin_id: "",
        admin_name: "",
        id_number: "",
        admin_phone_number: "",
        admin_email: "",
        admin_account: "",
        authorization_file: ""
      }
    };
  }
  //手机号码验证
  validatePhone = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyPhone(value);
    if (!vtf.done) {
      callback(new Error(vtf.errMsg));
    } else {
      callback();
    }
  };
  //邮箱验证
  validateEmall = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyEmall(value);
    if (!vtf.done) {
      callback(new Error(vtf.errMsg));
    } else {
      callback();
    }
  };
  // data
  formLabelWidth: string = "120px";
  data: any = {
    step: 0,
    type: "新增管理员",
    active: "",
    edit: {
      id: 0,
      creditor_name: "",
      license_no: "",
      license_img_url: "",
      detailed_address: "", //详细地址
      admin: {
        //管理员信息
        admin_id: "",
        admin_name: "",
        id_number: "",
        admin_phone_number: "",
        admin_email: "",
        admin_account: "",
        authorization_file: ""
      }
    },
    tableData: [],
    submitType: false,
    rules: {
      creditor_name: [
        { required: true, message: "请输入债权人名称", trigger: "blur" }
      ],
      license_img_url: [
        { required: true, message: "请上传证照图片", trigger: "blur" }
      ],
      license_no: [
        { required: true, message: "请输入证照号码", trigger: "blur" }
      ],
      email: [
        { required: true, message: "请输入电子邮箱", trigger: "blur" },
        { validator: this.validateEmall, trigger: "blur" }
      ],
      county: [{ required: true, message: "请选择地区", trigger: "change" }],
      phone_number: [
        { required: true, message: "电话号码不得为空", trigger: "blur" },
        {
          min: 4,
          max: 12,
          message: "电话号码的长度在4~12个字符之间",
          trigger: "blur"
        }
      ],
      detailed_address: [
        { required: true, message: "请输入地址详情", trigger: "blur" }
      ]
    },
    rules2: {
      admin_name: [
        { required: true, message: "请输入管理员名称", trigger: "blur" }
      ],
      id_number: [
        { required: true, message: "请输入身份证号", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 1);
          }
        }
      ],
      admin_phone_number: [
        { required: true, message: "请输入管理员手机号码", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 2);
          }
        }
      ],
      admin_email: [
        { required: true, message: "请输入管理员邮箱", trigger: "blur" }
      ],
      admin_account: [
        { required: true, message: "请输入管理员登录名", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 0);
          }
        }
      ],
      authorization_file: [
        { required: true, message: "请上传管理员授权书", trigger: "blur" }
      ]
    }
  };
  loading: boolean = false;
  height: number = 0;
  burl: string = "";
  address: string = ""; //地区
  fileList: any = [];
  loading2: boolean = false;
  is_super: any = 0;
  admin_name: any = "";
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let qz: string = pp === "production" ? "/api/" : "/api/pt";
    this.height = document.body.offsetHeight - 180;
    this.burl = baseURL + qz;
    this.is_super = getCookie("is_super");
    this.admin_name = getCookie("userName");
  }

  beforeDestroy() {
    //
  }
  initsetout() {}
  //获取地址栏子组件选择值
  getAddress(data: any) {
    this.data.edit.country = data.country;
    this.data.edit.city = data.city;
    this.data.edit.county = data.county;
    this.data.edit.province = data.province;
  }
  //选中管理员
  choice(id: number) {
    let row: any = this.data.tableData.filter((item: any) => {
      return item.id === id;
    });
    this.data.edit.admin.admin_id = row[0].id;
    this.data.edit.admin.admin_name = row[0].admin_name;
    this.data.edit.admin.id_number = row[0].id_number;
    this.data.edit.admin.admin_phone_number = row[0].admin_phone_number;
    this.data.edit.admin.admin_email = row[0].admin_email;
    this.data.edit.admin.admin_account = row[0].admin_account;
  }
  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName];
    let self: any = this;
    from.validate((valid: Boolean) => {
      if (valid) {
        if (
          self.data.type == "选择已有管理员" &&
          self.data.edit.admin.admin_id == ""
        ) {
          self.$message.warning("请先选择管理员", 4000);
          return false;
        }
        if (self.data.edit.admin.authorization_file == "") {
          self.$message.warning("请上传授权委托书", 4000);
          return false;
        }
        self.data.submitType = true;
        self.loading = true;
        Api.AddCreditor(self.data.edit).then((res: any) => {
          if (res.state == true) {
            self.$message.success(res.msg, 4000);
            setTimeout(() => {
              self.close();
              self.$emit("csh");
            }, 1000);
          } else {
            self.$message.warning(res.msg, 4000);
          }
          self.loading = false;
          self.data.submitType = false;
        });
      } else {
        return false;
      }
    });
  }
  //验证管理员信息是否重复
  VerifyAdminInfo(rule: any, value: string, callback: any, type: number) {
    Api.VerifyAdminInfo({ type, content: value }).then((res: any) => {
      if (res.state) {
        callback();
      } else {
        callback(new Error(res.msg));
      }
    });
  }
  //下一步
  goTwo(formName: string) {
    let from: any = this.$refs[formName];
    let self: any = this;
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.step = 2;
      } else {
        return false;
      }
    });
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this;
    self.loading = true;
    if (res.data.State == true) {
      // this.$message.success(res.data.Msg)
      self.data.edit[prop] =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      let parmas: any = {
        img_path:
          "https://file.debteehelper.com" +
          res.data.FileUrl +
          res.data.FileExtension,
        img_type: 2
      };
      Api.PostRecognition(parmas).then((res2: any) => {
        if (res2.state) {
          self.data.edit.creditor_name = res2.data.name;
          self.data.edit.license_no = res2.data.reg_num;
          self.data.edit.detailed_address = res2.data.address;
          // self.$message.success(
          //   "上传成功，请确认债权人名称和统一社会信用代码识别正确。"
          // );
          self.CreditCode(self.data.edit.license_no).then((response: any) => {
            if (this.is_super == 1) {
              if (response.data.creditor != null) {
                //债权人已存在
                self.data.edit.admin.creditor_id = response.data.creditor.id;
                this.GetAdminByNotCreditorId();
                self.data.step = 2;
              } else {
                //债权人不存在
                this.getAllAdmin();
                self.data.step = 1;
              }
            } else {
              if (
                response.data.is_authorized &&
                response.data.creditor != null
              ) {
                //已上传 已授权
                self.$message.warning("请勿重复提交", 4000);
              } else if (
                !response.data.is_authorized &&
                response.data.creditor != null
              ) {
                //未授权已上传
                self.data.step = 3;
                self.data.edit.admin.creditor_id = response.data.creditor.id;
                self.data.edit.admin.admin_id = response.data.admin_id;
              } else {
                //未授权未上传
                self.data.step = 1;
              }
            }
          });
        } else {
          self.$message.warning("图片识别失败", 4000);
        }
        self.loading = false;
      });
    } else {
      self.$message.warning(res.data.Msg, 4000);
      self.loading = false;
    }
  }
  // 通过统一信用代码获取债权人
  CreditCode(code: string) {
    return new Promise((resolve: any, reject: any) => {
      Api.CreditCode(code).then((res: any) => {
        if (res.state) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  beforeAvatarUpload(file: any) {
    let self: any = this;
    const isLt2M = file.size / 1024 / 1024 < 10;
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isLt2M) {
      self.$message.error("上传图片大小不能超过 50MB!", 4000);
    }
    if (!isJPG) {
      self.$message.error("图片只能是 JPG/JPEG/PNG 格式!", 4000);
    }
    return isLt2M && isJPG;
  }
  beforeAvatarUpload2(file: any) {
    // eslint-disable-next-line no-console
    console.log(file);

    let self: any = this;
    self.loading2 = true;
    const isLt2M = file.size / 1024 / 1024 <= 50;
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "application/pdf";
    if (!isLt2M) {
      self.loading2 = false;
      self.$message.error("上传图片大小不能超过 50MB!", 4000);
    }
    if (!isJPG) {
      self.$message.error("图片只能是 JPG/JPEG/PNG/PDF 格式!", 4000);
    }
    return isLt2M && isJPG;
  }
  //重置表
  resetForm(formName: string) {
    let self: any = this;
    self.data.edit.license_img_url = "";
    self.$nextTick(() => {
      self.$refs[formName].resetFields();
    });
  }

  //关闭弹出
  close() {
    this.$nextTick(() => {
      let self: any = this;
      self.data.submitType = false;
      self.resetForm("editcedriorFrom");
      self.resetForm("editcedriorFrom2");
      self.$emit("cancel", self.data.submitType);
    });
  }
  //图片预览
  preview(url: string) {
    window.open(url);
  }
  //切换类别
  typeChange() {
    this.data.edit.admin = {
      admin_id: "",
      creditor_id: this.data.edit.admin.creditor_id,
      admin_name: "",
      id_number: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_file: ""
    };
    this.data.active = "";
    this.fileList = [];
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3);
  }
  preview2(file: any) {
    if (file.url == undefined) {
      let url: string =
        "https://file.debteehelper.com" +
        file.response.data.FileUrl +
        file.response.data.FileExtension;
      window.open(url);
    } else {
      window.open(file.url);
    }
  }
  exceed(files: any, fileList: any) {
    let self: any = this;
    self.$message.warning("请先删除已上传文件", 4000);
  }
  handleAvatarSuccess2(res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg, 4000);
      self.data.edit.admin["authorization_file"] =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      let item: any = [
        {
          name: file.name,
          url:
            "https://file.debteehelper.com" +
            file.response.data.FileUrl +
            file.response.data.FileExtension
        }
      ];
      self.fileList = item;
    } else {
      self.$message.warning(res.data.Msg, 4000);
    }
    self.loading2 = false;
  }
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
  }
  //截取小数点后字符
  substr(val: string) {
    if (val == null || val == "") {
      return null;
    }
    let result: string = val.substring(val.lastIndexOf("."));
    return result;
  }
  //字符截取
  sblicet(val: string) {
    let var1: string = val.substring(val.lastIndexOf("/") + 1);
    let var2: any = var1.substring(0, var1.indexOf("_"));
    return var2;
  }
  //获取所有管理员
  getAllAdmin() {
    Api.GetAllAdmin().then((res: any) => {
      res.data.forEach((item: any, index: number) => {
        item["index"] = index + 1;
      });
      this.data.tableData = res.data;
    });
  }
  //获取当前债权人未授权管理员
  GetAdminByNotCreditorId() {
    Api.GetAdminByNotCreditorId(this.data.edit.admin.creditor_id).then(
      (res: any) => {
        res.data.forEach((item: any, index: number) => {
          item["index"] = index + 1;
        });
        this.data.tableData = res.data;
      }
    );
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";
.editcedrior {
  & .el-form-item {
    height: auto !important;
  }
  & .el-icon-close-tip {
    display: none !important;
  }
  & .el-icon-close {
    top: 5px !important;
  }
  .zhengzhao {
    height: 100px !important;
    margin-bottom: 30px;
  }
  .form-box {
    max-height: 580px;
    overflow-y: auto;
    & .el-form-item__label {
      // text-align: left !important;
    }
  }
  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    line-height: 1.5;
    position: absolute;
    top: 0;
    width: 60%;
    right: 0;
    padding-right: 15px;
  }
  .el-upload-dragger {
    width: 100px !important;
    height: 100px !important;
  }
  .upBox {
    position: relative;
    & .uploader-teshu {
      & .el-upload {
        margin-top: 10px;
        width: 130px;
        height: 130px;
        & .el-upload-dragger {
          width: 130px !important;
          height: 130px !important;
          & .avatar {
            width: 100%;
            height: 100%;
            max-width: 130px;
            max-height: 130px;
          }
          & .avatar-uploader-icon {
            width: 130px;
            height: 130px;
            line-height: 130px;
          }
        }
      }
    }
    .preview {
      position: absolute;
      // right: 20px;
      left: 125px;
      top: 0;
      cursor: pointer;
      font-size: 18px;
      .preview-text {
        position: absolute;
        top: 2px;
        right: 5px;
        font-size: 12px;
      }
    }
    .upBox-tip {
      position: absolute;
      bottom: -20px;
      font-size: 12px;
      color: #409eff;
    }
  }
  & .avatar2 {
    cursor: pointer;
    max-width: 100px;
    max-height: 100px;
    display: inline-block;
  }
  & .avatar2-btn {
    position: relative;
    top: -20px;
    left: 20px;
  }
  & .editcedrior-form {
    & .el-form-item__label {
      position: relative;
      // margin-right: 10px;
      padding-right: 12px !important;
    }
    & .el-form-item__label::before {
      position: absolute;
      right: 0px;
    }
  }
  .adminList {
    max-height: 300px;
    overflow-y: auto;
  }
  .addAdminForm,
  .adminCell {
    box-shadow: 0 0px 5px #ccc;
    width: 80%;
    margin: 0px auto 20px auto;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    & .el-form-item {
      min-height: 40px;
      margin-bottom: 20px;
    }
    & .el-icon-close,
    & .el-icon-back {
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      z-index: 1111;
    }
  }
  .addAdmin-btns {
    width: 100;

    // margin-bottom: 20px;
  }
  .zrn-row {
    min-height: 40px !important;
    line-height: 40px !important;
    display: flex;
    margin-bottom: 0 !important;
    justify-content: start;

    & .value {
      color: #303133;
      & .img {
        width: 120px;
        cursor: pointer;
      }
      & .textUrl {
        color: #67c23a;
        cursor: pointer;
      }
    }
  }
  // & .step3-box {
  //   & .el-upload-list {
  //     padding-left: 100px;
  //   }
  // }
  .edit-bottom-bin {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    margin-top: 20px;
    position: static;
    & .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  & .addFrom {
    & .el-input {
      width: 520px;
    }
  }
  & .el-radio {
    flex: none !important;
  }
  & .xinghao:after {
    content: "*";
    color: #f56c6c;
    // margin-right: 4px;
    position: absolute;
    right: 4px;
  }
  .el-input.is-disabled .el-input__inner {
    color: #303133;
  }
}
</style>
