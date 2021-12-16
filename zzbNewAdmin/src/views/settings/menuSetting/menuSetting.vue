<template>
  <div class="menuSetting-warp">
    <div class="block">
      <p>用户管理</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="text">{{ node.label }}</span>
          <span>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="() => append(data)"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- <div class="block">
      <p>业务管理</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="text">{{ node.label }}</span>
          <span>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="() => append(data)"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="block">
      <p>平台管理</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="text">{{ node.label }}</span>
          <span>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="() => append(data)"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
    </div> -->
  </div>
</template>
<script lang="ts" src="./menuSetting.ts"></script>
<style lang="scss">
@import './menuSetting.scss';
</style>
