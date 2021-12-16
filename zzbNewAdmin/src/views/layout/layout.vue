<template>
  <div class="layout-wrap">
    <el-container>
      <el-aside :class="{ open: openType }">
        <Menu @open="openWacth"></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <span
            v-show="left < 0"
            @click="
              right = !right
              left = 0
            "
            class="el-icon-d-arrow-left tag-left"
          ></span>
          <div class="header-tag" ref="headerTag">
            <div
              unselectable="on"
              onselectstart="return false;"
              style="-moz-user-select:none;"
              :style="{ left: left + 'px' }"
              @mousemove="move"
              @mousedown.prevent.stop="down"
              @mouseup="isMove = false"
              class="tags-box"
              ref="tagsBox"
            >
              <el-tag
                v-for="tag in data.tags"
                :key="tag.name"
                :closable="tag.closable"
                :type="tag.type"
                @click="handleClick(tag)"
                @close="handleClose(tag)"
                :class="{ active: tag.active }"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
          <span
            v-show="right"
            @click="tagRight"
            class="el-icon-d-arrow-right tag-left"
          ></span>
          <div class="header-user">
            <div class="user-img">
              <img :src="$store.state.Login.headImg" alt="用户头像" />
            </div>
            <div class="user-name">
              <span>{{ $store.state.Login.userName }}</span>
            </div>
            <div class="user-operation">
              <el-dropdown trigger="click" @command="handleCommand">
                <i class="el-icon-arrow-down el-dropdown-link"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">
                    退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadList"
              :key="index"
              :to="{ path: item.path }"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <transition mode="out-in" name="fade">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view />
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" src="./layout.ts"></script>

<style lang="scss">
@import './layout.scss';
</style>
