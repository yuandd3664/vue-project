<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      fit
      header-cell-class-name="custom-header"
      :row-key="getRowKey"
      :row-style="rowStyle"
      :params="params"
      @select="handleSelectItem"
      @select-all="handleSelectAll"
      :header-row-style="{
        height: '35px'
      }"
      class="tableBox"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="云主机名称" show-overflow-tooltip prop="name" sortable="custom">
        <template slot-scope="scope">
          <span class="detail-href" @click="getDetail(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="taskState"
        label="任务状态"
        show-overflow-tooltip
        sortable="custom"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.taskState}}</template>
      </el-table-column>
      <el-table-column prop="hostName" label="宿主机" show-overflow-tooltip sortable="custom"></el-table-column>
      <el-table-column label="业务网IP" show-overflow-tooltip prop="biznetIps" sortable="custom">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.biznetIps" :key="index">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column label="管理网IP" show-overflow-tooltip prop="managerIps" sortable="custom">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.managerIps" :key="index">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column label="镜像" show-overflow-tooltip prop="imageName" sortable="custom"></el-table-column>
      <el-table-column label="集群" show-overflow-tooltip prop="zone" sortable="custom"></el-table-column>
      <el-table-column label="配置" show-overflow-tooltip prop="flavorName" sortable="custom"></el-table-column>
      <el-table-column
        label="业务系统"
        show-overflow-tooltip
        prop="systemName"
        sortable="custom"
        :key="1"
      ></el-table-column>
      <el-table-column
        label="业务子系统"
        show-overflow-tooltip
        prop="subSystemName"
        sortable="custom"
        :key="2"
      ></el-table-column>
      <!-- <el-table-column label="可用域" show-overflow-tooltip prop="subSystemName">
      </el-table-column>-->
      <!--<el-table-column  label="内网IP"  show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--<span v-for="(item, index) in scope.row.privateIpsList" :key="index">-->
      <!--<div v-for="(items1, index) in item.addresses" :key="index">-->
      <!--{{items1.address+(!item.networkName?'':'('+item.networkName+')')}}-->
      <!--</div>-->
      <!--</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column  prop="floatingIp" label="浮动IP" show-overflow-tooltip></el-table-column>-->
      <!--<el-table-column  prop="vendorName" label="所属平台" show-overflow-tooltip></el-table-column>-->
      <!-- 此处字段待确认是否需要修改 -->
      <el-table-column prop="gmtVmCreate" label="创建时间" show-overflow-tooltip sortable="custom"></el-table-column>
      <el-table-column label="操作" width="220px" align="center">
          <template slot-scope="scope">

             <div class="action-divider"></div>
            <el-dropdown @command="dropdownClick" trigger="click" >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item type="text" @click="dropdownClick({id: scope.row,index:2})">
              <i class="el-icon-edit"></i> 编辑
            </el-dropdown-item>
            <el-dropdown-item type="text" @click="dropdownClick({id: scope.row,index:3})" >
              <i class="el-icon-delete"></i> 删除
            </el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row.id,index:1}"> VNC登录</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:18}">
                  <i class="el-icon-printer"></i> 创建快照</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:15}"> 修改配置</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isShowStart" :command="{id: scope.row,index:23}"> 开机</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isShowStop" :command="{id: scope.row,index:6}"> 关机</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:8}">暂停</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isStopDormant" :command="{id: scope.row,index:9}"> 恢复</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:10}"> 挂起</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isResume" :command="{id: scope.row,index:16}"> 激活</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.fipId" :command="{id: scope.row.fipId,index:14}">解绑IP</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isShowRestart" :command="{id: scope.row,index:7}">重启</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:11}">挂载网卡</el-dropdown-item>
                <el-dropdown-item :command="{row: scope.row,index:12}">卸载网卡</el-dropdown-item>
                <el-dropdown-item  :command="{id: scope.row,index:34}">在线扩容</el-dropdown-item>
                <el-dropdown-item :disabled="scope.row.status != 'RUNNING'" :command="{id: scope.row,index:17}"> 修改密码</el-dropdown-item>
                <el-dropdown-item :disabled="scope.row.status == 'PAUSED'" :command="{id: scope.row,index:19,hostId: scope.row.hostId,zone:scope.row.zone}">热迁移</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:20,name:scope.row.name}">冷迁移</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.affirmModify" :disabled="scope.row.status == 'RESTORING' ||scope.row.status=='SHELVED'" :command="{id: scope.row,index:21}"> 确认修改</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.affirmModify" :disabled="scope.row.status == 'RESTORING' ||scope.row.status=='SHELVED'" :command="{id: scope.row,index:22}">回滚配置</el-dropdown-item>
                <el-dropdown-item :disabled="scope.row.status == 'EXCEPTION' || scope.row.status == 'MIGRATEING'||scope.row.status == 'ERROR'||scope.row.status == 'SUSPENDED'||scope.row.status == 'PAUSED'" :command="{id: scope.row,index:30}">挂载云硬盘</el-dropdown-item>
                <el-dropdown-item :disabled="scope.row.status == 'EXCEPTION' ||scope.row.status == 'MIGRATEING'||scope.row.status == 'ERROR'||scope.row.status == 'SUSPENDED'||scope.row.status == 'PAUSED'" :command="{id: scope.row,index:31}">卸载云硬盘</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:36}">
                  <i class="el-icon-refresh"></i> 更改状态</el-dropdown-item>
                <el-dropdown-item :command="{id: scope.row,index:39}" :disabled="scope.row.tentandId">
                  <i class="el-icon-tickets"></i> 控制台日志</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
    <el-form>
      <el-form-item style="float:right;margin-right:10px">
        <el-button type="success" @click="confirmAdd">确认</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[1, 2, 3, 44]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Xuanxiang2',
  data () {
    return {
      tableData: [],
      params: {
        page: 1,
        rows: 10
      },
      selectList: [],
      idList: []
    }
  },
  methods: {
    dropdownClick () {

    },
    refreshId () {
      this.idList = []
      this.selectList.forEach(item => {
        this.idList.push(item.id)
      })
    },
    // 详情
    getDetail (data) {
      let bv4, bv6, mv4, mv6
      if (data.bizAddr) {
        bv4 = data.bizAddr.addressV4[0]
        bv6 = data.bizAddr.addressV6[0]
      }
      if (data.mgmAddr) {
        mv4 = data.mgmAddr.addressV4[0]
        mv6 = data.mgmAddr.addressV6[0]
      }
      this.$router.push({
        path: '/home/detail',
        query: {
          name: data.name,
          bv4: bv4,
          bv6: bv6,
          mv4: mv4,
          mv6: mv6
        }
      })
    },
    // 单选
    handleSelectItem (selection, row) {
      this.refreshId()
      if (this.idList.indexOf(row.id) > -1) {
        for (let j = 0; j < this.selectList.length; j++) {
          let item = this.selectList[j]
          if (item.id === row.id) {
            item.role = []
            this.selectList.splice(j, 1)
            break
          }
        }
      } else {
        // row.role = ['admin']
        this.selectList.push(row)
      }
      console.log(this.selectList)
    },
    // 全选
    handleSelectAll (selection) {
      this.refreshId()
      if (selection.length) { // 全选情况下
        this.tableData.forEach(item => {
          if (this.idList.indexOf(item.id) == -1) {
            // if (item.role.length == 0) item.role = ['admin']
            this.selectList.push(item)
          }
        })
      } else { // 全不选情况下
        this.tableData.forEach(item => {
          if (this.idList.indexOf(item.id) > -1) {
            for (let j = 0; j < this.selectList.length; j++) {
              let row = this.selectList[j]
              if (item.id === row.id) {
                // item.role = []
                this.selectList.splice(j, 1)
                break
              }
            }
          }
        })
      }
      console.log(this.selectList)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    rowStyle () {
      return {
        color: '#000',
        height: '30px'
      }
    },
    getRowKey (row) {
      return row.id
    },
    confirmAdd () {
      let ids = this.selectList.map(item => item.id)
      console.log(ids)
    }
  },
  created () {
    let data = {
      'success': true,
      'message': '查询成功',
      'errorMsg': null,
      total: 5,
      'data': [
        {
          'hostName': 'localhost.localdomain',
          'flavorName': '1-1-1',
          'bizAddr': {
            'addressV4': [
              '11.0.0.25'
            ],
            'addressV6': [
              '1111::19'
            ]
          },
          'imageName': null,
          'memory': 1024,
          'subSystemName': null,
          'gmtVmCreate': '2020-02-10 18:03:38',
          'instanceType': 'snapshot',
          'cpu': 1,
          'disk': 1,
          'id': '45c247ca-3d02-4a65-a19b-a43893d19169',
          'taskState': null,
          'systemName': null,
          'zone': 'nova',
          'name': 'qqq',
          'status': 'RUNNING',
          tentandId: true
        },
        {
          'hostName': 'localhost.localdomain',
          'flavorName': 'm1.tiny',
          'bizAddr': {
            'addressV4': [
              '11.0.0.25'
            ],
            'addressV6': [
              '1111::19'
            ]
          },
          'imageName': 'cirros',
          'memory': 512,
          'subSystemName': null,
          'gmtVmCreate': '2020-02-05 23:50:35',
          'instanceType': 'image',
          'cpu': 1,
          'mgmAddr': {
            'addressV4': [
              '22.2.2.25'
            ],
            'addressV6': [
              '2222::15'
            ]
          },
          'disk': 1,
          'id': '69bfc1d3-bd9a-41cb-a55e-9ccd149d81c7',
          'taskState': null,
          'systemName': null,
          'zone': 'nova',
          'name': 'ddd',
          'status': 'STOPPED'
        },
        {
          'hostName': 'localhost.localdomain',
          'flavorName': '1-1-1',
          'bizAddr': {
            'addressV4': [
              '11.0.0.13'
            ],
            'addressV6': [
              '1111::d'
            ]
          },
          'imageName': null,
          'memory': 1024,
          'subSystemName': null,
          'gmtVmCreate': '2020-02-05 19:50:55',
          'instanceType': 'snapshot',
          'cpu': 1,
          'mgmAddr': {
            'addressV4': [
              '22.2.2.13'
            ],
            'addressV6': [
              '2222::10'
            ]
          },
          'disk': 1,
          'id': '2f14c318-30f6-4693-ad92-fb22abb4961a',
          'taskState': null,
          'systemName': null,
          'zone': 'nova',
          'name': 'aaaaaaaaa',
          'status': 'RUNNING',
          tentandId: false
        },
        {
          'hostName': 'localhost.localdomain',
          'flavorName': 'm1.tiny',
          'imageName': null,
          'memory': 512,
          'bizAddr': {},
          'subSystemName': null,
          'gmtVmCreate': '2020-01-21 23:41:20',
          'instanceType': 'snapshot',
          'cpu': 1,
          'mgmAddr': {
            'addressV4': [
              '22.2.2.23'
            ],
            'addressV6': [
              '2222::13'
            ]
          },
          'disk': 1,
          'id': 'a058c881-1b8a-4a6e-a3b6-cc94623cfb01',
          'taskState': null,
          'systemName': null,
          'zone': 'nova',
          'name': 'aaa',
          'status': 'STOPPED'
        },
        {
          'hostName': 'localhost.localdomain',
          'flavorName': 'm1.tiny',
          'bizAddr': {
            'addressV4': [
              '11.0.0.18'
            ],
            'addressV6': [
              '1111::10'
            ]
          },
          'imageName': null,
          'memory': 512,
          'subSystemName': null,
          'gmtVmCreate': '2020-01-15 21:52:34',
          'instanceType': 'snapshot',
          'cpu': 1,
          'mgmAddr': {
          },
          'disk': 1,
          'id': '7827ae9e-3c98-42a0-b033-a2780368a131',
          'taskState': null,
          'systemName': null,
          'zone': 'nova',
          'name': 'ccccc',
          'status': 'STOPPED',
          tentandId: false
        }
      ],
      'status': null,
      'solution': null,
      'failed': false
    }
    this.tableData = data.data
    this.total = data.total
    this.$nextTick(() => {
      this.tableData.forEach((data, index) => {
        // 业务网IP和管理网IP
        let bizV4Arr = []
        let bizV6Arr = []
        let mamV4Arr = []
        let mamV6Arr = []
        if (data.bizAddr && Object.keys(data.bizAddr).length !== 0) {
          data.bizAddr.addressV4.forEach(item => {
            bizV4Arr.push(item)
          })
          data.bizAddr.addressV6.forEach(item => {
            bizV6Arr.push(item)
          })
        }
        if (data.mgmAddr && Object.keys(data.mgmAddr).length !== 0) {
          data.mgmAddr.addressV4.forEach(item => {
            mamV4Arr.push(item)
          })
          data.mgmAddr.addressV6.forEach(item => {
            mamV6Arr.push(item)
          })
        }
        data.biznetIps = bizV4Arr.concat(bizV6Arr)
        data.managerIps = mamV4Arr.concat(mamV6Arr)
        this.idList.push(data.id)
        // this.selectList.push(data)
        if (!data.tentandId) {
          this.$refs.multipleTable.toggleRowSelection(data, true)
          this.selectList.push(data)
        }
      })
      console.log(this.selectList)
    })
  }
}
</script>

<style scoped>
.tableBox th,
td {
  padding: 0 !important;
}
.el-pagination {
  display: inline-block;
  line-height: 30px;
}
.detail-href {
  cursor: pointer;
  color: darkblue;
}
</style>
