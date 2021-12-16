<template>
  <!-- 上传证照区域 -->
  <el-upload
    :action="basurl + '/Upload/UploadImage?type=0'"
    :before-upload="beforeAvatarUpload"
    list-type="picture-card"
    :limit="1"
    :on-success="handleAvatarSuccess"
  >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" />
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      file: { url: "", name: "" }
    };
  }
};
</script>
