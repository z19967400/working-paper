<template>
  <div>
    <div v-loading="data.loading" id="adminSetUp" class="adminSetUp">
      <div
        v-for="(item, index) in data.admin_list"
        :key="index"
        class="adminCell"
      >
        <div v-show="!item.editType" class="btns">
          <el-button
            size="small"
            style="color:#E6A23C;"
            @click="edit(index)"
            type="text"
            >变更</el-button
          >
          <el-button
            size="small"
            @click="delect(item.member_vip_admin_id, index)"
            type="text"
            >移除</el-button
          >
        </div>
        <el-row class="zrn-row">
          <span class="el-form-item__label">真实姓名 </span>
          <span v-show="!item.editType" class="value">{{
            item.admin_name
          }}</span>
          <span v-show="item.editType">
            <el-input
              size="small"
              placeholder="请填写真实姓名，已免影响后续操作"
              v-model="item.admin_name"
            ></el-input>
          </span>
        </el-row>
        <el-row class="zrn-row">
          <span class="el-form-item__label">身份证号</span>
          <span v-show="!item.editType" class="value">{{
            item.id_number
          }}</span>
          <span v-show="item.editType">
            <el-input
              size="small"
              placeholder="请输入身份证号"
              v-model="item.id_number"
            ></el-input>
          </span>
        </el-row>
        <el-row class="zrn-row">
          <span class="el-form-item__label">手机号码</span>
          <span v-show="!item.editType" class="value">{{
            item.admin_phone_number
          }}</span>
          <span v-show="item.editType">
            <el-input
              size="small"
              placeholder="请输入手机号码"
              v-model="item.admin_phone_number"
            ></el-input>
          </span>
        </el-row>
        <el-row class="zrn-row">
          <span class="el-form-item__label">电子邮箱</span>
          <span v-show="!item.editType" class="value">{{
            item.admin_email
          }}</span>
          <span v-show="item.editType">
            <el-input
              size="small"
              placeholder="请输入电子邮箱"
              v-model="item.admin_email"
            ></el-input>
          </span>
        </el-row>
        <el-row class="zrn-row">
          <span class="el-form-item__label">管理员授权书</span>
          <span v-show="!item.editType" class="value">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击查看授权委托书"
              placement="top"
            >
              <span
                class="textUrl"
                v-if="substr(item.authorization_file) == '.pdf'"
                @click="preview(item.authorization_file)"
                >{{ sblicet(item.authorization_file) }}</span
              >
              <img
                v-else
                @click="preview(item.authorization_file)"
                class="img"
                :src="item.authorization_file"
              />
            </el-tooltip>
          </span>
          <span style="margin-left:0;" v-show="item.editType" class="value">
            <div class="upload-box">
              <el-upload
                class="upload-demo"
                :on-preview="preview2"
                :on-exceed="exceed"
                :limit="1"
                :action="burl + '/Upload/UploadImage?type=7'"
                :on-change="handleChange"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess1(index, res, file);
                  }
                "
                :before-upload="beforeAvatarUpload1"
                :file-list="fileList2"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div style="line-height: 1.5;width:50%;">
                <span style="font-size:12px;color:#606366;display:block;"
                  >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span
                >
                <el-link style="font-size:12px;" @click="upSq2" type="success"
                  >下载授权委托书模板</el-link
                >
              </div>
            </div>
          </span>
        </el-row>
        <div v-show="item.editType" class="bottom-btns">
          <el-button size="small" @click="setUp(item, index)" type="primary"
            >确认变更</el-button
          >
          <el-button @click="colseEdit(index)" size="small">取消变更</el-button>
        </div>
      </div>
      <el-row class="addAdmin-btns">
        <span
          style="width:140px;display:inline-block;line-height: 32px;"
          class="el-form-item__label"
          >选择管理员</span
        >
        <el-select
          style="width:280px;margin-right:20px;"
          v-model="selectAdminId"
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in admins"
            :key="item.id"
            :label="item.admin_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="selectAdminQury"
          >确定</el-button
        >
        <el-button size="small" type="primary" @click="addAdminQury"
          >新增</el-button
        >
      </el-row>
      <el-form
        v-show="data.addAdminType"
        v-loading="data.loading2"
        :model="addAdmin"
        :rules="data.addAdminRules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm addAdminForm"
      >
        <el-tooltip class="item" effect="dark" content="关闭" placement="top">
          <i @click="addAdminClose" class="el-icon-close"></i>
        </el-tooltip>
        <el-form-item label="真实姓名" prop="admin_name">
          <el-col :span="12">
            <el-input
              size="small"
              placeholder="请填写真实姓名，已免影响后续操作"
              v-model="addAdmin.admin_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="登录名" prop="admin_account">
          <el-col :span="12">
            <el-input size="small" v-model="addAdmin.admin_account"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_number">
          <el-col :span="12">
            <el-input size="small" v-model="addAdmin.id_number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" prop="admin_phone_number">
          <el-col :span="12">
            <el-input
              size="small"
              v-model="addAdmin.admin_phone_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="admin_email">
          <el-col :span="12">
            <el-input size="small" v-model="addAdmin.admin_email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员授权书" prop="authorization_file">
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
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10">
            <div style="line-height: 1.5;">
              <span style="font-size:12px;color:#606366;display:block;"
                >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/png/pdf等格式</span
              >
              <el-link style="font-size:12px;" @click="upSq" type="success"
                >下载授权委托书模板</el-link
              >
            </div>
          </el-col>
        </el-form-item>
        <div style="text-align: center;">
          <el-button
            size="small"
            @click="submitAddAdminForm('ruleForm')"
            type="primary"
            >确定</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import * as Api from "../../api/creditor";
import { Getter, Action } from "vuex-class";
import { api } from "../../../../zzbPc/src/assets/js/api";
import { verifyEmall } from "../../utils/common";
import { baseURL, pp } from "../../utils/request";
@Component({})
export default class About extends Vue {
  @Prop() setUpId!: any;
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
  data: any = {
    id: 0,
    loading: false,
    loading2: false,
    creditor_id: "",
    addAdminType: false,
    admin_list: [], //管理员列表
    list2: [], //备份列表
    addAdminRules: {
      admin_name: [
        { required: true, message: "请输入真实姓名", trigger: "blur" }
      ],
      authorization_file: [
        { required: true, message: "请上传授权书", trigger: "blur" }
      ],
      id_number: [
        { required: true, message: "请输入管理员身份证", trigger: "blur" }
      ],
      admin_account: [
        { required: true, message: "请输入登录名", trigger: "blur" }
      ],
      admin_email: [
        { required: true, validator: this.validateEmall, trigger: "blur" }
      ],
      admin_phone_number: [
        { required: true, message: "电话号码不得为空", trigger: "blur" },
        {
          min: 4,
          max: 12,
          message: "电话号码的长度在4~12个字符之间",
          trigger: "blur"
        }
      ]
    }
  };
  addAdmin: any = {
    id: 0,
    creditor_id: 0,
    admin_id: 0,
    admin_name: "",
    id_number: "",
    admin_account: "",
    admin_phone_number: "",
    admin_email: "",
    authorization_file: ""
  };
  admins: any = [];
  fileList: any = [];
  fileList2: any = [];
  burl: string = "";
  selectAdminId: any = "";
  @Watch("setUpId", { immediate: true })
  setUpIdChangeVal(newId: any, oldId: any) {
    if (newId != 0 && newId != null && newId != "") {
      this.data.id = newId;
      this.data.loading = true;
      this.init(newId);
    }
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let qz: string = pp === "production" ? "/api/" : "/api/pt";
    // this.height = document.body.offsetHeight - 180
    this.burl = baseURL + qz;
    this.getAdminList();
  }
  init(id: any) {
    return new Promise((resolve: any, reject: any) => {
      Api.getcreditor(id).then((res: any) => {
        if (res.state) {
          this.data.creditor_id = res.data.creditor.id;
          res.data.creditor_admin.forEach((item: any) => {
            item["editType"] = false;
          });
          this.data.admin_list = Object.assign(
            {},
            JSON.parse(JSON.stringify(res.data.creditor_admin))
          );
          this.data.list2 = Object.assign(
            {},
            JSON.parse(JSON.stringify(res.data.creditor_admin))
          );
          this.data.loading = false;
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  exceed(files: any, fileList: any) {
    this.$message.warning("请先删除已上传文件");
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3);
  }
  //图片查看
  preview(url: string) {
    window.open(url);
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
  //上传之前
  beforeAvatarUpload2(file: any) {
    this.data.loading2 = true;
    // const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 <= 10;
    // if (!isJPG) {
    //   this.$message.error("上传头像图片只能是 JPG 格式!");
    // }
    if (!isLt2M) {
      this.data.loading2 = false;
      this.$message.error("上传头像图片大小不能超过 50MB!");
    }
    return isLt2M;
  }
  beforeAvatarUpload1(file: any) {
    const isLt2M = file.size / 1024 / 1024 <= 10;
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 50MB!");
    }
    return isLt2M;
  }
  //变更
  edit(idx: number) {
    const list: any = Object.assign(
      {},
      JSON.parse(JSON.stringify(this.data.admin_list))
    );
    let item: any = list[idx];
    item.editType = true;
    this.$set(this.data.admin_list, idx, item);
    if (item.authorization_file != "" && item.authorization_file != null) {
      let item2: any = {
        name: "授权书",
        url: item.authorization_file
      };
      this.fileList2.push(item2);
    }
  }
  //取消变更
  colseEdit(idx: number) {
    const list: any = Object.assign(
      {},
      JSON.parse(JSON.stringify(this.data.list2))
    );
    const item: any = list[idx];
    this.$set(this.data.admin_list, idx, item);
  }
  //下载授权书
  upSq() {
    window.open(
      "http://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
  }
  //下载授权书
  upSq2() {
    window.open(
      "http://file.debteehelper.com/template/变更管理员申请书模板-V1.docx"
    );
  }
  //删除管理员
  delect(id: number | string, index: number) {
    this.$confirm("确认移除该管理员吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.deleteCreditorAdmin(id, this.data.creditor_id).then((res: any) => {
          if (res.state) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.init(this.data.id);
          } else {
            this.$message({
              type: "error",
              message: res.msg
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消移除"
        });
      });
  }
  //获取管理员列表
  getAdminList() {
    Api.GetAdminList({}).then((res: any) => {
      this.admins = res.data;
    });
  }

  //上传成功
  handleAvatarSuccess2(res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg);
      self.addAdmin["authorization_file"] =
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
      self.$message.warning(res.data.Msg);
    }
    self.data.loading2 = false;
  }
  handleAvatarSuccess1(index: number, res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg);
      let obj: any = self.data.admin_list[index];
      obj["authorization_file"] =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      self.$set(self.data.admin_list, index, obj);
      let item: any = [
        {
          name: file.name,
          url:
            "https://file.debteehelper.com" +
            file.response.data.FileUrl +
            file.response.data.FileExtension
        }
      ];
      self.fileList2 = item;
    } else {
      self.$message.warning(res.data.Msg);
    }
  }
  //关闭新增管理员表单
  addAdminClose() {
    let self: any = this;
    self.data.addAdminType = false;
    self.addAdmin.authorization_file = "";
    self.fileList = [];
    self.$nextTick(() => {
      self.$refs["ruleForm"].resetFields();
    });
  }
  //变更确定
  setUp(data: any, index: number) {
    this.$confirm("您确定变更该管理员吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let parmas: any = Object.assign(
          {},
          JSON.parse(JSON.stringify(this.addAdmin))
        );
        Object.keys(parmas).forEach((key: string) => {
          if (key == "admin_account") {
            parmas[key] = data["account_name"];
          } else if (key == "creditor_id") {
            parmas[key] = data["entrust_creditor_id"];
          } else if (key == "admin_id") {
            parmas[key] = data["member_vip_admin_id"];
          } else {
            parmas[key] = data[key];
          }
        });
        Api.CreditorAdminSet(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg);
            data.editType = false;
            this.$set(this.data.admin_list, index, data);
            this.$set(this.data.list, index, data);
          } else {
            this.$message.warning(res.msg);
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消变更"
        });
      });
  }
  //新增管理员
  addAdminQury() {
    let self: any = this;
    self.data.addAdminType = true;
    this.$nextTick(() => {
      const scrollDom: any = document.getElementById("adminSetUp");
      scrollDom.scrollTop = scrollDom.scrollHeight;
    });
  }
  //新增管理员确定
  submitAddAdminForm(formName: string) {
    let self: any = this;
    let from: any = self.$refs[formName];
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.loading2 = true;
        self.addAdmin.creditor_id = self.data.creditor_id;
        self.addAdmin["id"] = 0;
        Api.CreditorAdminSet(self.addAdmin).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg);
            self.addAdminClose();
            self.init(this.data.id).then(() => {
              self.addAdminClose();
              self.data.loading2 = false;
            });
          } else {
            self.$message.warning(res.msg);
            self.data.loading2 = false;
          }
        });
      } else {
        return false;
      }
    });
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
  //确定选择
  selectAdminQury() {
    let sefl: any = this;
    if (sefl.selectAdminId == "") {
      sefl.$message.warning("请选择一个管理员");
      return false;
    }
    const selectData: any = sefl.admins.filter((item: any) => {
      return item.id == sefl.selectAdminId;
    })[0];
    const admin_list: any = JSON.parse(JSON.stringify(sefl.data.admin_list));
    const List: any = new Array();

    Object.keys(admin_list).forEach((key: any) => {
      List.push(admin_list[0]);
    });

    let list2: any = List.filter((item: any) => {
      return item.member_vip_admin_id == selectData.id;
    });
    // eslint-disable-next-line no-console
    console.log(list2);
    if (list2.length > 0) {
      sefl.$message.warning("请勿重复添加管理员");
      return false;
    }
    Object.keys(sefl.addAdmin).forEach((key: string) => {
      if (selectData[key] != null) {
        sefl.addAdmin[key] = selectData[key];
      }
    });
    sefl.addAdminQury();
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.adminSetUp {
  max-height: 600px;
  overflow-y: auto;
  padding-top: 10px;
  overflow-x: hidden;
  & .el-icon-close-tip {
    display: none !important;
  }
  & .addAdminForm,
  & .adminCell {
    box-shadow: 0 0px 5px #ccc;
    width: 90%;
    margin: 0px auto 20px auto;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    & .btns {
      position: absolute;
      right: 0px;
      top: 10px;
      width: 85px;
      z-index: 1111;
    }
    & .bottom-btns {
      text-align: center;
      margin-top: 20px;
    }
    & .el-icon-close {
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      z-index: 1111;
    }
  }
  & .zrn-row {
    min-height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: start;
    & .el-form-item__label {
      width: 110px;
      min-width: 110px;
    }
    & .value {
      color: #303133;
      margin-left: 20px;
      & .img {
        width: 120px;
        cursor: pointer;
      }
      & .textUrl {
        color: #67c23a;
        cursor: pointer;
      }
      & .upload-box {
        display: flex;
        justify-content: space-between;
        max-height: 75px;
        overflow-y: hidden;
        & .upload-demo {
          width: 50%;
        }
      }
    }
  }
  .addAdmin-btns {
    width: 100;
    margin-bottom: 20px;
  }
}
.addAmin-zz {
  display: block !important;
  margin: 20px auto 0 auto;
}
</style>
