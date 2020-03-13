<template>
  <div>
    <span class="demonstration">默认 click 触发子菜单</span>
    <el-cascader v-model="value" :options="options" @change="handleChange" :props="{ checkStrictly: true }"></el-cascader>
    <el-dropdown trigger="click">
      <el-button type="primary" split-button>
        更多
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-button type="primary" @click="dropdownClick({index:1})">编辑</el-button>
      <el-button type="ghost" @click="handleDelete">删除</el-button>
      <!-- <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="dropdownClick({index:1})">
          <i class="el-icon-edit"></i> 编辑
        </el-dropdown-item>
        <el-dropdown-item @click="dropdownClick({index:2})">
          <i class="el-icon-edit"></i>新增子系统
        </el-dropdown-item>
      </el-dropdown-menu> -->
    </el-dropdown>
    <el-select v-model="bindDiskData.uuid" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="primary" @click="getData">getData</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: null,
      options: [{
        value: '1',
        label: '指南',
        children: [{
          value: '2',
          label: '设计原则',
          children: [{
            value: '3',
            label: '一致'
          }, {
            value: '4',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        bindDiskData: {
          uuid: '',
          serverUuid: ''
        }
    }
  },
  methods: {
    getData() {
      let objData = {
        name:'王俊凯',
        age: '21',
        ...this.bindDiskData
      }
      let arrData = [
        '王俊凯', '21'
      ]
      console.log(objData)
      // console.log(Object.prototype.toString.call(objData) === '[object Object]', arrData.constructor === Object)
    },
    handleChange(val) {
      console.log(val)
    },
    dropdownClick (command) {
      console.log(command.index)
      // switch (index) {
      //   case 1:
      //     console.log('2222')
      //     break;
      //   default:
      //     break;
      // }
    },
    handleDelete() {
      console.log('删除')
    },
    handleOpen(num){
      switch (num) {
        case 1:
          console.log('one')
          break;
          break
        default:
          break;
      }
    }
  },
  created() {
    this.value = ['1'],
    this.bindDiskData.uuid = this.options1[0].label
  },
  beforeRouteEnter(to, from, next) {
    console.log(from.path)
    window.sessionStorage.setItem('URL_FLAG', from.path)
    next()
  }
}
</script>
<style>
</style>