<template>
  <div class="lawyerLetteInfo-wrap">
    <div class="lawyerLetteInfo-box">
      <div class="left">
        <el-divider content-position="left">委托信息</el-divider>
        <el-row>
          <el-col :span="8">
            <span>委托编号</span>
            <span>{{ data.info.batch_no }}</span>
          </el-col>
          <el-col :span="8">
            <span>委托执行进度</span>
            <span>{{ data.info.execution_progress }}</span>
          </el-col>
          <el-col :span="8">
            <span>律师函下载</span>
            <el-button
              @click="dowload(data.info.lawyer_file)"
              style="color:#67C23A;"
              type="text"
              >下载</el-button
            >
          </el-col>
        </el-row>
        <el-divider content-position="left">快递信息</el-divider>
        <el-row>
          <el-col>
            <span>债务人名称</span>
            <span>{{ data.lawyerLette.debtor_name }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>收件人</span>
            <el-input
              style="width:220px;"
              size="small"
              v-model="data.lawyerLette.receiving_name"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <span>收件人电话</span>
            <el-input
              style="width:220px;"
              size="small"
              v-model="data.lawyerLette.receiving_phone"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <span>收件人地址</span>
            <el-input
              style="width:330px;"
              size="small"
              v-model="data.lawyerLette.receiving_address"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>快递状态</span>
            <el-radio-group
              style="line-height:50px;"
              v-model="data.lawyerLette.execution_status"
            >
              <el-radio :label="0">待投递</el-radio>
              <el-radio :label="1">快递中</el-radio>
              <el-radio :label="3">投递成功</el-radio>
              <el-radio :label="4">投递失败</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>快递公司</span>
            <el-select
              style="width:220px;"
              size="small"
              v-model="data.lawyerLette.courier_company"
              placeholder="快递公司"
            >
              <el-option label="邮政EMS" value="邮政EMS"></el-option>
              <el-option label="顺丰快递" value="顺丰快递"></el-option>
              <el-option label="邮政挂号信" value="邮政挂号信"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>快递单号</span>
            <el-input
              style="width:220px;"
              size="small"
              v-model="data.lawyerLette.courier_number"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>快递底单状态</span>
            <el-radio-group
              style="line-height:50px;"
              v-model="data.lawyerLette.courier_receipt"
            >
              <el-radio :label="0">未收到</el-radio>
              <el-radio :label="1">已收到</el-radio>
              <el-radio :label="2">无需</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>快递底单图片</span>
            <span>
              <el-upload
                class="avatar-uploader"
                :action="baseURl + '/Upload/UploadImage?type=0'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <div
                  v-if="
                    data.lawyerLette.courier_receipt_img !== '' &&
                      data.lawyerLette.courier_receipt_img != null
                  "
                  class="avatar"
                >
                  <img :src="data.lawyerLette.courier_receipt_img" />
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </span>
          </el-col>
          <el-col :span="8">
            <el-button
              style="margin-right:20px;"
              size="small"
              plain
              type="primary"
              @click="dowload(data.lawyerLette.courier_receipt_img)"
              v-if="
                data.lawyerLette.courier_receipt_img !== '' &&
                  data.lawyerLette.courier_receipt_img != null
              "
              icon=" el-icon-zoom-in"
              >查看底单</el-button
            >
            <el-tag
              v-if="
                data.lawyerLette.courier_receipt_img !== '' &&
                  data.lawyerLette.courier_receipt_img != null
              "
              :style="
                `color:${
                  data.lawyerLette.evidence_status == 0 ? '#f56c6c' : '#67c23a'
                };width:65px`
              "
              :type="
                `${
                  data.lawyerLette.evidence_status == 0 ? 'danger' : 'success'
                }`
              "
              >{{
                data.lawyerLette.evidence_status == 0 ? '未存证' : '已存证'
              }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>退件</span>
            <el-radio-group
              style="line-height:50px;"
              v-model="data.lawyerLette.express_return"
            >
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>退件原因</span>
            <el-input
              type="textarea"
              style="width:500px;"
              :rows="6"
              v-model="data.lawyerLette.express_return_reason"
              placeholder="退件原因"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>后台备注</span>
            <span>
              <el-input
                type="textarea"
                v-model="data.lawyerLette.back_remarks"
                placeholder="后台备注"
              ></el-input>
            </span>
          </el-col>
          <el-col style="margin-top:20px;">
            <span>附件</span>
            <span>
              <el-upload
                class="upload-demo"
                :on-success="handleAvatarSuccess2"
                :action="baseURl + '/Upload/UploadImage?type=10'"
                :on-preview="preview"
                :on-remove="handleRemove"
                multiple
                :on-change="handleChange"
                :limit="5"
                :on-exceed="handleExceed"
                :file-list="filelist"
              >
                <el-button size="small" type="primary">上传附件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </span>
          </el-col>
        </el-row>
        <el-button
          style="margin-left:100px;"
          type="primary"
          size="small"
          plain
          @click="joinInfo"
          >保存</el-button
        >
        <div class="left-bottom">
          <el-divider content-position="left">物流信息</el-divider>
          <el-row>
            <el-col>
              <span>新增快递进度</span>
              <span class="kuaidi">
                <!-- <p v-for="(item, index) in data.express" :key="index">
                  {{ item.update_time }} {{ item.update_context }}
                </p> -->
                <el-row>
                  <el-col :span="9">
                    <el-date-picker
                      style="width:90%"
                      size="small"
                      v-model="data.addExpressData.update_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col :span="11">
                    <el-input
                      size="small"
                      placeholder="请输入进度"
                      v-model="data.addExpressData.update_context"
                      clearable
                    >
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      type="primary"
                      style="margin-top:4px;"
                      size="small"
                      icon="el-icon-circle-plus-outline"
                      plain
                      @click="addExpress"
                      >新增</el-button
                    >
                  </el-col>
                </el-row>
              </span>
            </el-col>
            <el-col :span="16">
              <span>快递进度</span>
              <el-table border :data="data.express">
                <el-table-column
                  prop="update_time"
                  width="180"
                  label="更新时间"
                >
                </el-table-column>
                <el-table-column prop="update_context" label="物流进度">
                </el-table-column>
                <el-table-column label="操作" width="50">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="text"
                      size="small"
                    >
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- <div class="right"> -->
      <!-- <div>
          <el-button type="primary" size="small" plain
            >点击下载律师函</el-button
          >
        </div> -->
      <!-- <div style="height:100%;">
          <iframe class="iframe" :src="pdfsrc" frameborder="0"></iframe>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" src="./lawyerLetteInfo.ts"></script>

<style lang="scss">
@import './lawyerLetteInfo.scss';
</style>
