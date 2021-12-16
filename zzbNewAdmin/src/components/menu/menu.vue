<template>
  <div :class="{ open: data.isCollapse }" class="menu-wrap">
    <div class="menu-header">
      <div v-show="!data.isCollapse">
        <img
          @click="toweb"
          class="logo"
          src="https://file.debteehelper.com/logo/logo_200.png"
          alt=""
        />
        <span style="margin-left:20px;font-size:12px;">后台</span>
      </div>
      <i
        class="icon"
        :class="[data.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="data.isCollapse = !data.isCollapse"
      ></i>
    </div>
    <el-menu
      :default-active="data.menuActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="data.isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <el-submenu
        v-for="(item, index) in $store.state.layout.Routers"
        :key="index + 1"
        :index="tostr(index)"
        v-show="item.ismenu == true"
      >
        <template slot="title">
          <div class="xian"></div>
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-submenu
            v-for="(item2, index2) in item.children"
            :key="index2 + 1"
            :index="item2.meta.index"
          >
            <template slot="title">
              <div class="xian"></div>
              <i :class="item2.meta.icon"></i>
              <span slot="title">{{ item2.meta.title }}</span>
            </template>
            <el-menu-item-group>
              <div
                v-for="(item3, index3) in item2.children"
                v-show="item3.ismenu == true"
                :key="index3 + 1"
              >
                <router-link :to="item3.path">
                  <el-menu-item class="menuList" :index="item3.meta.index">
                    <div class="xian"></div>
                    {{ item3.meta.title }}
                  </el-menu-item>
                </router-link>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { MenuData } from '../../types/components/menu.interface'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  })
  name!: string

  @Watch('$route')
  onChangeValue(newVule: any, oldVule: any) {
    let self: any = this
    if (newVule.meta.index != '') {
      this.data.menuActive = newVule.meta.index
    }
  }
  @Watch('data', { immediate: true, deep: true })
  openChangeValue(newVule: any, oldVule: any) {
    this.$emit('open', newVule.isCollapse)
  }
  // data
  data: MenuData = {
    componentName: 'menu',
    isCollapse: false,
    menuActive: '1-1-1'
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    this.data.menuActive = self.$route.meta.index
  }

  handleOpen(key: number, keyPath: string) {
    // eslint-disable-next-line no-console
    // console.log(key, keyPath);
  }

  handleClose(key: number, keyPath: string) {
    // eslint-disable-next-line no-console
    // console.log(key, keyPath);
  }

  tostr(index: number) {
    let aa: number = index + 1
    let xx: string = String(aa)
    return xx
  }

  toweb() {
    window.open('http://www.debteehelper.com/')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
$bg-color1: rgba(24, 28, 33, 0.9); //1级菜单背景，主题背景
$color: #fff; //头部字体颜色
$color-1: #fff; //menu字体颜色
$hover-color: none; //菜单悬浮色
$active-color: #606c72; //三级菜单选中色  #606c72
.menu-wrap {
  width: 220px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: $bg-color1;
  .menu-header {
    // background-color: $menu-header-color;
    line-height: 50px;
    color: $color;
    display: flex;
    justify-content: space-around;
    font-size: $large-title;
    height: 50px;
    width: 100%;
    max-width: 200px;
    .icon {
      font-size: 20px;
      cursor: pointer;
      line-height: 50px;
    }
    .logo {
      width: 90px;
      position: relative;
      top: 10px;
    }
  }
  .el-menu {
    border-right: none;
    background: none;
    width: 200px;
    .el-submenu {
      .el-submenu__title {
        color: $color-1;
      }
    }
    .el-menu-item {
      color: $color-1;
      background: none;
    }
    .el-menu--inline {
      // background-color: $bg-color1;
      .is-opened {
        .el-menu--inline {
          background-color: $bg-color1;
          .is-active {
            background-color: $active-color;
          }
        }
      }
    }
  }
  .el-menu--collapse {
    width: auto;
  }
}
.el-menu-item-group__title {
  padding: 0;
}
.el-submenu__title i,
.el-icon-s-fold {
  color: #ddd;
}
.el-menu-item:hover,
.el-submenu__title:hover {
  // background-color: $hover-color;
  background: none;
  .xian {
    height: 80%;
  }
}
.menuList:hover .xian {
  height: 80%;
}
a {
  text-decoration: none;
}
.el-menu
  > .el-submenu
  > .el-menu
  > .el-menu-item-group
  > ul
  > .el-submenu
  > .el-submenu__title {
  padding-left: 50px !important;
}
.xian {
  position: absolute;
  left: 5px;
  width: 2px;
  height: 0;
  transition: height 0.2s ease;
  background-color: red;
  top: 10%;
}
</style>
