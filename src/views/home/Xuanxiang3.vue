<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="用户管理"
        name="first"
      ><el-form :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          @click="handleCreate('add1')"
          :disabled="disabledFlag"
        >新增</el-button>
        <el-button
          type="primary"
          @click="remove()"
        >删除</el-button>
        <el-button
          type="primary"
          @click="handleCreate('edit')"
        >编辑</el-button>
        <el-button
          @click="getUser"
          type="success"
        >获取王俊凯</el-button>
        <el-dropdown @command="dropdownClick">
          <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{id: 1}">黄金糕</el-dropdown-item>
            <el-dropdown-item :command="{id: 2}">狮子头</el-dropdown-item>
            <el-dropdown-item :command="{id: 3}">螺蛳粉</el-dropdown-item>
            <el-dropdown-item :command="{id: 4}">双皮奶</el-dropdown-item>
            <el-dropdown-item :command="{id: 5}">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <!-- <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select="handleSelectItem"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>-->
    <el-table
      :data="list"
      ref="multipleTable1"
    >
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户工号"
        prop="name"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span
            class="detail-href"
            @click="getDetail(scope.row)"
          >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户名"
        sortable="custom"
        prop="username"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="所属域"
        prop="opUser[0].domain.domainName"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="所属主项目"
        prop="opUser[0].project.projectName"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="所属部门"
        prop="departmentName"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="所属室"
        prop="sectionName"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="邮箱"
        prop="opUser[0].email"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="固定电话"
        prop="phone"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="移动电话"
        prop="mobile"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="160px"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleEdit(scope.row)"
          >
            <i class="el-icon-edit"></i> 编辑</el-button>
          <div class="action-divider"></div>
          <el-button
            type="text"
            @click="handleDelete(scope.row)"
          >
            删除</el-button>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>
      <el-tab-pane
        label="配置管理"
        name="second"
      >配置管理
      <div ref="htlstr" v-html="htmlData"></div>
      <iframe src="./static/index.html"></iframe>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
export default {
  name: 'Xuanxiang3',
  data () {
    return {
      htmlData: '',
      activeName: 'first',
      list: [],
      disabledFlag: true,
      scope: {
        row: {}
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      ],
      multipleSelection: [],
      showOperate: false,
      columns: [
        {
          text: 'selection',
          dataIndex: 'selection'
        },
        {
          text: '名称',
          dataIndex: 'name'
        },
        {
          text: '内容',
          dataIndex: 'value'
        }
      ],
      // eventList: [
      //   {
      //     name: '新增',
      //     type: 'add',
      //     icon: 'icon-Added',
      //     event: this.handleCreate
      //   },
      //   {
      //     name: '删除',
      //     type: 'remove',
      //     icon: 'icon-delete',
      //     event: this.remove
      //   },
      //   {
      //     name: '编辑',
      //     type: 'edit',
      //     icon: 'icon-hricon10',
      //     event: this.handleCreate
      //   }
      // ],
      operateFun: {
        create: this.handleCreate,
        detail: this.handleDetail,
        getData: this.getList
      },
      dataSource: '',
      listname: 'd ic tionary'
    }
  },
  methods: {
    handleClick (tab) {
      console.log(tab)
      switch (tab) {
        case 'first':
          this.getList()
          break
        case 'second':
          // this.$nextTick(() => {

          // })
          window.open(`/index.html`)
          break
        default:
          break
      }
    },
    getUser () {
      this.$axios.post('/aaa/jkjji/list').then((res) => {
        console.log(res.data)
      })
      this.$axios.get('/ff/api/task/detail').then((res) => {
        console.log(JSON.parse(res.data.data.graph))
        // console.log(res.data.data)
      })
      // this.$axios({
      //   url: '/page/list',
      //   method: 'post'
      // }).then(data => {
      //   console.log(data)
      // })
    },
    dropdownClick (command) {
      console.log(command)
      const project = new Date().getTime()
      this.$store.state.project = project
    },
    getDetail () { },
    handleCreate () {

    },
    remove () {
      this.$router.push('/home/detail')
    },
    handleDetail () {

    },
    handleSelectItem (selection, row) {
      this.disabledFlag = false
      if (selection.length > 0) {
        this.scope.row = selection[0]
      }
      if (selection.length === 0 || selection.length > 1) {
        this.disabledFlag = true
      }
      console.log(this.scope.row)
    },
    handleSelectAll (selection) {
      if (selection.length == 1) {
        this.disabledFlag = false
        this.scope.row = selection[0]
      } else {
        this.disabledFlag = true
      }
      console.log(selection.length)
      console.log(this.scope.row)
    },
    getData () {

    },
    getList () {}
  },
  created () {
    this.getList()
    this.getData()
  },

  computed: {
    project () {
      return this.$store.state.project
    }
  },
  watch: {
    project (n, o) {
      console.log(n, o)
      this.getUser()
    }
  }
}
</script>
<style scoped>
</style>
