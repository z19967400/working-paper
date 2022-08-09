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
      <div class="form-box">
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
        <el-form-item
          style="margin-top:80px;"
          label="债权人名称"
          prop="creditor_name"
        >
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
      </div>

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
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../../api/creditor";
import { baseURL, pp } from "../../../utils/request";
import { comAddress } from "../../../components/index";
import { verifyPhone, verifyEmall } from "../../../utils/common";
import { api } from "../../../../../zzbPc/src/assets/js/api";
import { getCookie } from "../../../utils/common";
@Component({
  components: {
    comAddress
  }
})
export default class editCreditor extends Vue {
  name: any = "addForms";
  //prop
  @Prop() editCreditorData: any;
  //Watch
  @Watch("editCreditorData", { immediate: true, deep: true })
  parentIdChange(newVal: any, oldVal: any) {
    let self: any = this;
    // self.data.edit.admin.creditor_id = 0;
    self.fileList = [];
    self.data.edit = {
      creditor_id: newVal.creditor_id,
      creditor_name: newVal.creditor_name,
      license_no: newVal.license_no,
      license_img_url: newVal.license_img_url,
      detailed_address: newVal.detailed_address //详细地址
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
    type: "新增管理员",
    active: "",
    edit: {
      id: 0,
      creditor_name: "",
      license_no: "",
      license_img_url: "",
      detailed_address: "" //详细地址
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
  //表单提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName];
    let self: any = this;
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.submitType = true;
        self.loading = true;
        Api.UpdateCreditor(self.data.edit).then((res: any) => {
          if (res.state == true) {
            self.$message.success(res.msg, 4000);
            setTimeout(() => {
              self.close();
              // self.$emit("csh");
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
      // self.resetForm("editcedriorFrom");
      // self.resetForm("editcedriorFrom2");
      self.$emit("cancel", self.data.submitType);
    });
  }
  //图片预览
  preview(file: any) {
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
          // self.CreditCode(self.data.edit.license_no).then((response: any) => {
          //   self.data.edit.creditor_id = response.data.creditor.id;
          //   self.data.edit.admin_id = response.data.admin_id;
          // });
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
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
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
