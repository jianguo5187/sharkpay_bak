<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="98px">
      <el-form-item label="记录时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="游戏" prop="gameId">
        <el-select v-model="queryParams.gameId" placeholder="请选择游戏" @change="getList" clearable>
          <el-option
            v-for="item in gameListOptions"
            :key="item.gameId"
            :label="item.gameName"
            :value="item.gameId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="包含测试用户" prop="includeTestUserFlg">
        <el-switch v-model="queryParams.includeTestUserFlg" @change="getList"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="gameReportList">
      <el-table-column label="日期" align="center" prop="calendarDate" />
      <el-table-column label="流水" align="center" prop="betMoneyTotal" />
      <el-table-column label="平台盈亏" align="center" prop="winMoneyTotal" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            title="流水统计"
            type="info"
            icon="el-icon-burger"
            circle
            @click="showUserFlowDetailList(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog :title="userFlowMoney.title" :visible.sync="userFlowMoney.open" width="1400px" append-to-body>
      <user-flow-money-list :user="userFlowMoney.user"/>
    </el-dialog>
  </div>
</template>

<script>
import {listGameReport} from "@/api/system/userWin";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import UserFlowMoneyList from "@/views/system/userMoney/index.vue";
import {getValidGame} from "@/api/system/game";

export default {
  name: "gameReport",
  components: {Treeselect,UserFlowMoneyList},
  dicts: ['sys_postal_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 登录用户ID
      loginUserId: this.$store.state.user.id,
      // 登录用户Name
      loginUserName: this.$store.state.user.name,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户盈利表格数据
      gameReportList: [],
      gameListOptions:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        includeTestUserFlg:false,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      userFlowMoney: {
        // 遮罩层
        loading: true,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,

        user: {
          userId:undefined,
          // 日期范围
          dateRange: [],
        },
      },
    };
  },
  created() {
    this.getGameList();
    this.getList();
  },
  methods: {
    /** 查询投注机器人列表 */
    getList() {
      this.loading = true;
      listGameReport(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.gameReportList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    showUserFlowDetailList(row){
      this.userFlowMoney.open = true;
      this.userFlowMoney.user = {};
      this.userFlowMoney.user.userId = row.userId;
      this.userFlowMoney.user.dateRange = [row.calendarDate, row.calendarDate];
    },
    getGameList(){
      getValidGame().then(response => {
        this.gameListOptions = response.gameList;
      });
    },
  }
};
</script>
