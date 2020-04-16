<template>
  <div class="table-container tree-table">
    <el-table
      :data="data"
      style="width: 100%"
      header-cell-class-name="custom-header"
      :row-class-name="showTr"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="column.dataIndex"
        :label="column.text"
      >
        <template slot-scope="scope">
          <span
            v-if="index === 0"
            v-for="(space) in scope.row._level"
            :key="space"
            class="ms-tree-space"
          ></span>
          <span v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.row)">
            <i v-if="!scope.row._expanded" class="iconfont icon-add cur-point"></i>
            <i v-if="scope.row._expanded" class="iconfont icon-sub cur-point"></i>
          </span>
          <span v-else-if="index===0" class="ms-tree-space">
            <i class="iconfont" :class="leafIcon"></i>
          </span>
          <span v-if="column.filter">
            <status-icon>{{column.filter[scope.row[column.dataIndex]]}}</status-icon>
          </span>
          <span v-else>{{scope.row[column.dataIndex]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200px" v-if="showOperate">
        <template slot-scope="scope">
          <span v-for="(item, index) in outerList" :key="index">
            <div class="action-divider" v-if="index !== 0"></div>
            <el-button type="text" @click.native="item.event(item.type, scope.row)">
              <i class="iconfont" :class="item.icon"></i>
              {{item.name}}
            </el-button>
          </span>
          <div class="action-divider" v-if="innerList.length > 0"></div>
          <el-dropdown trigger="click" v-if="innerList.length > 0">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in innerList"
                :key="index"
                @click.native="item.event(item.type, scope.row)"
              >
                <i class="iconfont" :class="item.icon"></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    operateFun: {},
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 叶子节点的图标
    leafIcon: {
      type: String,
      default: 'icon-fuwu'
    },
    // 这是数据源
    dataSource: {
      type: Array
    },
    // 这个是是否展示操作列
    showOperate: {
      type: Boolean,
      default: true
    },
    eventList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    listname: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      outerList: [],
      innerList: []
    };
  },
  computed: {
    // 格式化数据源
    data: function () {
      let data = this.treeToArray(this.dataSource);
      return data;
    }
  },
  created () {
    if (this.eventList.length > 2) {
      this.outerList = this.eventList.slice(0, 2);
      this.innerList = this.eventList.slice(2);
    } else {
      this.outerList = this.eventList;
    }
  },
  methods: {
    treeToArray (data, parent, level) {
      let tmp = [], self = this;
      data.forEach((record) => {
        if (record._expanded === undefined) {
          self.$set(record, '_expanded', false);
        }
        if (parent) {
          self.$set(record, '_parent', parent);
        }
        let _level = 0;
        if (level !== undefined && level !== null) {
          _level = level + 1;
        }
        self.$set(record, '_level', _level);
        tmp.push(record);
        if (typeof record.children === 'string') record.children = JSON.parse(record.children);
        if (record.children && record.children.length > 0) {
          let children = this.treeToArray(record.children, record, _level);
          tmp = tmp.concat(children);
        }
      });
      return tmp;
    },
    // 显示行
    showTr: function (row) {
      let item = row.row;
      // 判断节点无父节点直接显示， 有父节点且父节点打开则显示
      let show = (item._parent ? (item._parent._expanded && item._parent._show) : true);
      item._show = show;
      return show ? 'slideInSelf' : 'slideOutSelf';
    },
    // 展开下级
    toggle: function (row) {
      row._expanded = !row._expanded;
      if (row.children.length === 0) {
        if (this.listname == 'dictionary') {
          this.operateFun.getData(row.value, row);
        } else {
          this.operateFun.getData(row.id, row);
        }
      }
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow (index, record) {
      // 确保第一列且存在子级节点
      if (index === 0 && record.children) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style>
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}

.ms-tree-space::before {
  content: '';
}

@-webkit-keyframes slideInSelf {
  0% {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    display: table-row;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInSelf {
  0% {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInSelf {
  -webkit-animation: slideInSelf 0.3s;
  animation: slideInSelf 0.3s;
}

.slideOutSelf {
  display: none;
}
</style>
