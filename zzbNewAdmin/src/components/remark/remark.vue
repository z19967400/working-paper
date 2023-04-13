<template>
  <div class="remark">
    <span class="header" style="margin-top:0;">
      <span class="title">后台备注</span>
      <el-button class="add btn" @click="openAddRemarks" type="text"
        >新增</el-button
      >
    </span>
    <el-divider></el-divider>
    <div class="block">
      <span style="color:#909399;font-size:14px;" v-show="data.list == 0"
        >暂无备注</span
      >
      <el-timeline>
        <el-timeline-item v-for="(item, index) in data.list" :key="index">
          <div class="el-timeline-item__timestamp is-top item-header">
            {{ timeStr(item.create_time) }} {{ item.admin_name }}
            <el-button
              style="margin-left:10px;"
              @click="edit(item, index)"
              class="edit btn"
              type="text"
              >{{ item.type ? '取消' : '编辑' }}</el-button
            >
            <el-button
              @click="DeleteRemarksByID(item.id)"
              class="delete btn"
              type="text"
              >删除</el-button
            >
          </div>
          <el-card>
            <!-- 文本状态 !-->
            <div v-show="!item.type">
              <p
                v-html="item.remarks_content"
                v-show="item.remarks_content"
                class="text"
              ></p>
              <div class="img-box">
                <el-image
                  v-for="(item2, index2) in item.fileList"
                  :key="index2"
                  :src="item2.file_path"
                  @click="handlePictureCardPreview2(item2.file_path)"
                ></el-image>
              </div>
              <!-- 文件列表 !-->
              <ul
                style="width:50%;"
                class="el-upload-list el-upload-list--text"
              >
                <li
                  v-for="(item2, index2) in item.file_list2"
                  :key="index2"
                  tabindex="0"
                  class="el-upload-list__item is-success"
                  @click="openFile(item2.file_path)"
                >
                  <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                    {{ substr(item2.file_path) }}
                  </a>
                </li>
              </ul>
            </div>
            <!-- 编辑状态 !-->
            <div v-show="item.type">
              <el-input
                class="textarea"
                type="textarea"
                :rows="12"
                v-model="data.editData.remarkText"
              ></el-input>
              <el-upload
                :on-success="file => updataFuc(file, 'edit')"
                :action="burl + '/Upload/UploadImage?type=11'"
                list-type="picture-card"
                :file-list="data.editData.fileList2"
                accept="image/*"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <!-- <span
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span> -->
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-upload
                style="margin-top:20px;"
                class="upload-demo"
                :action="burl + '/Upload/UploadImage?type=11'"
                :on-preview="handlePreview"
                :on-remove="handleRemove2"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="data.editData.fileList3"
                :on-success="file => updataFuc2(file, 'edit')"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf,application/msword,application/vnd.ms-works,aplication/zip"
              >
                <el-button size="small" type="primary">上传新文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
              </el-upload>
              <el-button
                @click="editSubmit(item.id)"
                style="margin-top:20px;"
                size="small"
                type="primary"
                >确定</el-button
              >
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <el-dialog
      title="新增备注"
      :visible.sync="dialogVisible2"
      width="45%"
      :before-close="handleClose"
      class="addRemarks"
    >
      <el-divider></el-divider>
      <div>
        <el-input
          class="textarea"
          type="textarea"
          :rows="12"
          v-model="data.editData.remarkText"
        ></el-input>
        <el-upload
          :on-success="updataFuc"
          :action="burl + '/Upload/UploadImage?type=11'"
          list-type="picture-card"
          :file-list="data.editData.fileList2"
          accept="image/*"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <!-- <span
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span> -->
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-upload
          style="margin-top:20px;"
          class="upload-demo"
          :action="burl + '/Upload/UploadImage?type=11'"
          :on-preview="handlePreview"
          :on-remove="handleRemove2"
          :before-remove="beforeRemove"
          multiple
          :limit="10"
          :on-exceed="handleExceed"
          :file-list="data.editData.fileList3"
          :on-success="updataFuc2"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf,application/msword,application/vnd.ms-works,aplication/zip"
        >
          <el-button size="small" type="primary">上传新文件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./remark.ts"></script>
<style lang="scss">
@import './remark.scss';
</style>
