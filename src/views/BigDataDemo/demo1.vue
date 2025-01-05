<!--
 * @Author: longmo
 * @Date: 2025-01-05 10:29:42
 * @LastEditTime: 2025-01-05 10:44:37
 * @FilePath: src/views/BigDataDemo/demo1.vue
 * @Description:
 -->
<template>
  <div class="">
    <h1>BigDataDemo3</h1>
    <button @click="handleSetData">点击初始赋值</button>
    <input type="text" v-model="filterText" />
    <button @click="handleSearch">搜索</button>
    <button @click="reset">重置</button>
    <button @click="handleCheckAll">全选</button>
    <button @click="handleCancelCheckAll">取消全选</button>
    <button @click="handleLog">当前选中项</button>
    <div>
      <span>搜索到的结果数：{{ filteredLabelList.length }}</span>
      <span>当前选中数：{{ checkedLabelKeys.length }}</span>

      <el-checkbox-group
        class="checkbox-group"
        v-model="currentPageCheckedKeys"
        @change="handleCheckedLabelChange"
      >
        <el-checkbox
          v-for="item in visibleList"
          :key="item.id"
          :label="item.id"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>

      <div class="block">
        <section class="pagination-wrap">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="filteredLabelList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mockBigData } from "./mockData.js";
import { PerformanceMonitor } from "@/utils/perf";
import { compare } from "@/views/BigDataDemo/utils";

export default {
  name: "bigDataDemo1",
  data() {
    return {
      labelList: [],
      mockData: [],
      checkedLabelKeys: [],
      filterText: "",
      totalCount: 0,
      filteredLabelList: [],
      currentPage: 1,
      pageSize: 100,
      isCheckedAll: false,
      previousPageCheckedKeys: [],
    };
  },
  methods: {
    handleSetData() {
      this.labelList = this.mockData;
      // todo 测试性能
      // this.labelList.length = 10_000;
      // this.labelList.length = 1_000;
      console.log("labelList", this.labelList);
      this.handleSearch();
    },
    handleCheckedLabelChange(value, e) {
      console.log("handleCheckedLabelChange", value, e);
    },
    handleSearch() {
      const taskName = "handleSearch";
      const performanceMonitor = new PerformanceMonitor({
        unitFn: (duration) => duration / 1000,
        unitLabel: "s",
      });
      console.log("handleSearch", this.filterText);
      performanceMonitor.start(taskName);
      const _labelList = this.labelList;
      const _filterText = this.filterText;
      this.filteredLabelList = _labelList.filter((item) => {
        return item.label.includes(_filterText);
      });

      performanceMonitor.stop(taskName);
      performanceMonitor.logMeasurements();
      console.log("filteredLabelList", this.filteredLabelList);
    },
    reset() {
      this.filterText = "";
      this.handleSearch();
    },
    handleLog() {
      console.log("checkedLabelKeys", this.checkedLabelKeys);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.$nextTick(() => {
        this.handleSearch();
      });
    },
    handleCurrentChange(curPage) {
      this.currentPage = curPage;
      this.$nextTick(() => {
        this.handleSearch();
      });
    },
    handleCheckAll() {
      this.checkedLabelKeys = this.filteredLabelList.map((item) => item.id);
      this.isCheckedAll = true;
      this.previousPageCheckedKeys = [...this.currentPageKeys];
    },
    handleCancelCheckAll() {
      this.checkedLabelKeys = [];
      this.previousPageCheckedKeys = [];
      this.isCheckedAll = false;
    },
  },
  computed: {
    visibleList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.filteredLabelList.slice(start, end);
    },
    currentPageKeys() {
      return this.visibleList.map((item) => item.id);
    },
    // 当前页选中的keys
    currentPageCheckedKeys: {
      get() {
        // 不能使用计算属性this.currentPageKeys，否则会无响应
        return this.checkedLabelKeys.filter((item) => {
          return this.currentPageKeys.includes(item);
        });

        // const _currentPageKeys = this.currentPageKeys;
        // return this.checkedLabelKeys.filter((item) =>
        //   _currentPageKeys.includes(item)
        // );
        // const visibleIds = this.visibleList.map((item) => item.id);
        // return this.checkedLabelKeys.filter((item) => visibleIds.includes(item));
      },
      set(value) {
        const { type, data } = compare(value, this.previousPageCheckedKeys);
        this.previousPageCheckedKeys = [...value];
        if (type === "add") {
          this.checkedLabelKeys = [
            ...new Set([...this.checkedLabelKeys, ...data]),
          ];
        } else if (type === "del") {
          console.log("取消选中");
          this.checkedLabelKeys = this.checkedLabelKeys.filter(
            (item) => !data.includes(item)
          );
        } else {
          // 当前页全部取消选中
          this.checkedLabelKeys = this.checkedLabelKeys.filter(
            (item) => !this.currentPageKeys.includes(item)
          );
        }
      },
    },
  },
  watch: {
    visibleList(newValue) {
      // 拿到的是计算后的值
      // console.log(
      //   "currentPageKeys",
      //   newValue,
      //   JSON.parse(JSON.stringify(this.currentPageKeys))
      // );
      this.previousPageCheckedKeys = this.checkedLabelKeys.filter((item) =>
        this.currentPageKeys.includes(item)
      );
    },
  },
  mounted() {
    this.mockData = mockBigData();
  },
};
</script>

<style scoped>
.checkbox-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  overflow: scroll;
}
</style>
