<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <span>北京</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="handleXuanxiang1" >朝阳区</el-menu-item>
                  <el-menu-item index="1-2" @click="handleXuanxiang2">海淀区</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>上海</span>
                </template>
                <el-menu-item index="2-1">黄浦区</el-menu-item>
                <el-menu-item index="2-2">静安区</el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <span slot="title">广州</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title">深圳</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleXuanxiang1(){
                // console.log('选项1')
                this.$router.push('/home/xuanxiang1')
            },
            handleXuanxiang2(){
              this.$router.push('/home/xuanxiang2')
            }
        }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
