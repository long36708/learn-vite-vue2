<template>
  <div class="bigdata-checkbox-group-container">
    <div class="filter-container">
      <el-input
          class="search-input"
          type="text"
          v-model.trim="filterText"
          placeholder="请输入搜索内容"
          suffix-icon="h-icon-search"
      />
      <el-button
          type="primary"
          @click="handleSearch"
          @keyup.enter.native="handleSearch"
          class="search-btn"
      >搜索
      </el-button>
      <!--      <el-button @click="handleReset">重置</el-button>-->
    </div>
    <div class="result-container">
      <span class="text">已选：{{ checkedLabelKeys.length }} 项</span>
      <span class="text">共搜索出：{{ filteredLabelList.length }} 项</span>
      <span class="text" v-show="shouldLimitChecked">
        允许的最大勾选数量：{{ maxLength }}</span
      >
      <span class="text">全选框的状态：{{ isCheckedAll }}</span>
      <span class="text">全选框的半选状态：{{ isIndeterminate }}</span>
      <span class="text">全选当前页的状态：{{ isCurrentPageCheckedAll }} </span>
      <span class="text"
      >全选前{{ maxLength }}的状态：{{ isCheckedLimit }}
      </span>
    </div>
    <div class="operate-container" v-show="hasVisibleData">
      <el-checkbox
          v-show="!shouldLimitChecked"
          v-model="isCheckedAll"
          :indeterminate="isIndeterminate"
          :disabled="disableCheckAllBtn"
          @change="handleCheckedAllChange"
      >
        全选
      </el-checkbox>
      <el-checkbox
          v-model="isCurrentPageCheckedAll"
          :disabled="disableCheckAllCurrentPageBtn"
          @change="handleCheckedAllCurrentChange"
      >
        全选当前页
      </el-checkbox>
      <el-checkbox v-show="shouldLimitChecked" v-model="isCheckedLimit">
        全选前{{ maxLength }}项
      </el-checkbox>
      <el-checkbox-group
          class="checkbox-group"
          v-model="currentPageCheckedKeys"
          @change="handleCheckedLabelChange"
      >
        <el-checkbox
            v-for="item in visibleList"
            :key="item.id"
            :label="item.id"
            :disabled="isCheckboxDisabled(item.id)"
            @change="handleCheckedItemChange"
        >
          <CustomLabel :item="item" :itemComponent="itemComponent" />
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="operate-container empty-status" v-show="!hasVisibleData">
      <slot name="empty">
        <div class="empty">暂无数据</div>
        <!--      <h-empty>暂无数据</h-empty>-->
      </slot>
    </div>
    <section class="pagination-wrap">
      <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="innerPageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="filteredLabelList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>

<script>
import {
  calcIfCheckedAll,
  calcIfCurrentPageCheckedAll,
  compare,
  getLimitKeys,
  isEqualArray,
  normalizeList,
} from "./utils.js";

export default {
  name: "BigDataCheckboxGroup",
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    itemKey: {
      type: String,
      default: "id",
    },
    itemName: {
      type: String,
      default: "label",
    },
    itemComponent: {
      type: Object,
      default: undefined, // 自定义组件
    },
    maxLength: {
      required: false,
      type: Number,
      default: Infinity,
    },
    pageSizes: {
      type: Array,
      default: () => [100, 200, 300, 500, 1000],
    },
    pageSize: {
      type: Number,
      default: 100,
    },
  },
  components: {
    CustomLabel: {
      render(h) {
        // console.log("CustomLabel", this.$attrs);
        const { item, itemComponent } = this.$attrs;
        if (itemComponent) {
          return h(
              itemComponent,
              {
                props: {
                  item,
                },
              },
              this.$slots.default
          );
        }
        return h("span", item?.label, this.$slots.default);
      },
    },
  },
  data() {
    return {
      labelList: [],
      checkedLabelKeys: [], // 所有选中的keys
      filterText: "",
      totalCount: 0,
      filteredLabelList: [],
      currentPage: 1,
      innerPageSize: 100,
      isCheckedAll: false, // 是否全选所有页面的checkbox
      isIndeterminate: false, // 是否半选checkbox
      isCurrentPageCheckedAll: false, // 是否全选当前页
      // isCheckedLimit: false, // 是否全选前xxx条
      previousPageCheckedKeys: [], // 上一次当前页面选中的keys
    };
  },
  methods: {
    // ----------- public method start -----------
    setData(labelList) {
      this.labelList = normalizeList(labelList, this.itemKey, this.itemName);
      // todo 测试性能
      // this.labelList.length = 10_000;
      // this.labelList.length = 1_000;
      console.log("标准化后的labelList", this.labelList);
      this.checkedLabelKeys = [];
      this.handleSearch();
    },
    getAllCheckedKeys() {
      return this.checkedLabelKeys.slice();
    },
    // ----------- public method end -----------

    handleCheckedLabelChange(value, e) {
      console.log("handleCheckedLabelChange", value, e);
      // const checkedCount = value.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.filteredLabelList.length;
    },
    handleCheckedItemChange(value) {
      console.log("handleCheckedItemChange", value);
    },
    onSearch() {
      const _labelList = this.labelList;
      const _filterText = this.filterText;
      this.filteredLabelList = _labelList.filter((item) => {
        return item.label.includes(_filterText);
      });
      // console.log("filteredLabelList", this.filteredLabelList);
    },
    handleSearch() {
      console.log("handleSearch", this.filterText);
      // todo 先进行搜索，若搜索出的结果和上一次的一样，则不重置之前的勾选
      const lastFilteredLabelList = this.filteredLabelList;
      this.onSearch();
      const nextFilteredLabelList = this.filteredLabelList;
      // console.log("lastFilteredLabelList", lastFilteredLabelList);
      // console.log("nextFilteredLabelList", nextFilteredLabelList);
      if (lastFilteredLabelList.length === nextFilteredLabelList.length) {
        if (isEqualArray(lastFilteredLabelList, nextFilteredLabelList)) {
          return;
        }
      }
      this.isCheckedAll = false;
      this.isCurrentPageCheckedAll = false;
      this.checkedLabelKeys = [];
      this.currentPage = 1; // 重置页码
    },
    handleReset() {
      this.filterText = "";
      this.setData([]);
    },
    handleSizeChange(size) {
      this.innerPageSize = size;
      // 通过计算属性重新计算可显示的当前页数据
      // this.$nextTick(() => {
      //   this.onSearch();
      // });
    },
    handleCurrentChange(curPage) {
      this.currentPage = curPage;
    },
    isCheckboxDisabled(id) {
      // 性能优化，减少不必要的计算
      if (!this.shouldLimitChecked) return false;
      if (this.checkedLabelKeys.length < this.maxLength) {
        return false;
      }
      if (!this.checkedLabelKeys.includes(id)) {
        return true;
      }
      return false;
    },
    handleCheckedAllChange(value) {
      this.isIndeterminate = false;
      if (value) {
        let nextCheckedKeys = this.filteredLabelList.map((item) => item?.id);
        if (nextCheckedKeys.length > this.maxLength) {
          console.log(`可勾选数据量超过最大限制${this.maxLength}`);
          nextCheckedKeys = nextCheckedKeys.slice(0, this.maxLength);
          return;
        }
        this.checkedLabelKeys = nextCheckedKeys;
        console.log("全选", nextCheckedKeys);
        this.previousPageCheckedKeys = [...this.currentPageKeys];
      } else {
        this.checkedLabelKeys = [];
        this.previousPageCheckedKeys = [];
        console.log("取消全选", this.checkedLabelKeys);
      }
    },
    handleCheckedAllCurrentChange(value) {
      if (value) {
        // 勾选当前页
        console.log("勾选当前页", value);
        const curKeys = this.visibleList.map((item) => item?.id);
        if (curKeys.length > this.maxLength) {
          console.log(`可勾选数据量超过最大限制${this.maxLength}`);
          this.isCurrentPageCheckedAll = false;
          return false;
        }
        const nextCheckedKeys = [
          ...new Set([...curKeys, ...this.checkedLabelKeys]),
        ];
        if (nextCheckedKeys.length > this.maxLength) {
          console.log(`可勾选数据量超过最大限制${this.maxLength}`);
          this.isCurrentPageCheckedAll = false;
          return false;
        }
        this.checkedLabelKeys = nextCheckedKeys;
        this.previousPageCheckedKeys = [...curKeys];
      } else {
        console.log("取消勾选当前页");
        const currentPageKeysSet = new Set(this.currentPageKeys);
        this.checkedLabelKeys = this.checkedLabelKeys.filter(
            (key) => !currentPageKeysSet.has(key)
        );
        this.previousPageCheckedKeys = [];
      }
    },
  },
  computed: {
    shouldLimitChecked() {
      return this.maxLength !== Infinity;
    },
    visibleList() {
      const start = (this.currentPage - 1) * this.innerPageSize;
      const end = this.currentPage * this.innerPageSize;
      return this.filteredLabelList.slice(start, end);
    },
    currentPageKeys() {
      return this.visibleList.map((item) => item?.id);
    },
    hasVisibleData() {
      return this.visibleList.length > 0;
    },
    /**
     * 是否全选按钮禁用
     * 当没有数据时，禁用全选按钮
     * 当数据量超过最大限制时，禁用全选按钮
     * @returns {boolean}
     */
    disableCheckAllBtn() {
      return (
          this.filteredLabelList.length === 0 ||
          this.checkedLabelKeys.length >= this.maxLength
      );
    },
    /**
     * 是否全选当前页按钮禁用
     * 当没有数据时，禁用全选当前页按钮
     * 当前页数量超过最大限制时，禁用全选当前页按钮
     * 当 pageSize + 当前选中数量大于最大限制时，禁用全选当前页按钮
     * @returns {boolean}
     */
    disableCheckAllCurrentPageBtn() {
      if (
          this.visibleList.length === 0 ||
          this.visibleList.length > this.maxLength
      ) {
        return true;
      }
      // 这样处理不合适，因为当前页选中后，会无法一次性取消选中
      // if (this.shouldLimitChecked) {
      //   const pageNo = Math.ceil(this.maxLength / this.innerPageSize);
      //   if (pageNo < this.currentPage) {
      //     return (
      //       this.visibleList.length + this.checkedLabelKeys.length >
      //       this.maxLength
      //     );
      //   }
      // }
      return false;
    },
    // 当前页选中的keys
    currentPageCheckedKeys: {
      get() {
        // NOTE: 不能使用计算属性this.currentPageKeys，否则会无响应
        // return this.checkedLabelKeys.filter((item) => {
        //   return this.currentPageKeys.includes(item);
        // });

        // const _currentPageKeys = this.currentPageKeys;
        // return this.checkedLabelKeys.filter((item) =>
        //   _currentPageKeys.includes(item)
        // );
        const visibleIds = this.visibleList.map((item) => item?.id);
        return this.checkedLabelKeys.filter((item) =>
            visibleIds.includes(item)
        );
      },
      set(value) {
        console.log(
            "this.previousPageCheckedKeys",
            value,
            JSON.parse(JSON.stringify(this.previousPageCheckedKeys))
        );
        const { type, data } = compare(value, this.previousPageCheckedKeys);
        this.previousPageCheckedKeys = [...value];
        if (type === "add") {
          const nextCheckedKeys = [
            ...new Set([...this.checkedLabelKeys, ...data]),
          ];

          if (nextCheckedKeys.length > this.maxLength) {
            console.log(`可勾选数据量超过最大限制${this.maxLength}`);
            return;
          }
          this.checkedLabelKeys = nextCheckedKeys;
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
    isCheckedLimit: {
      get() {
        if (!this.shouldLimitChecked) return false;
        const maxLength = this.maxLength;
        const checkedCount = this.checkedLabelKeys.length;
        if (checkedCount !== maxLength) return false;
        const limitKeys = getLimitKeys(this.filteredLabelList, maxLength);
        const _checkedLabelKeys = [...this.checkedLabelKeys];
        if (limitKeys.length !== checkedCount) {
          return false;
        } else {
          // 若数量相等，还需要比较是否内容完全一致（顺序可以不同）
          return limitKeys.every((id) => _checkedLabelKeys.includes(id));
        }
      },
      set(value) {
        if (value) {
          const maxLength = this.maxLength;
          this.checkedLabelKeys = getLimitKeys(
              this.filteredLabelList,
              maxLength
          );
          this.previousPageCheckedKeys = this.checkedLabelKeys.filter((item) =>
              this.currentPageKeys.includes(item)
          );
        } else {
          this.checkedLabelKeys = [];
          this.previousPageCheckedKeys = [];
        }
      },
    },
  },
  watch: {
    dataSource(newValue) {
      this.setData(newValue);
    },
    visibleList(newValue) {
      // 拿到的是计算后的值
      // console.log(
      //   "currentPageKeys",
      //   newValue,
      //   JSON.parse(JSON.stringify(this.currentPageKeys))
      // );
      const _currentPageKeys = newValue.map((item) => item?.id);
      this.previousPageCheckedKeys = this.checkedLabelKeys.filter((item) =>
          _currentPageKeys.includes(item)
      );
    },
    checkedLabelKeys(nextCheckedKeys) {
      console.log("nextCheckedKeys", nextCheckedKeys);
      const checkedCount = nextCheckedKeys.length;
      const filterLength = this.filteredLabelList.length;
      const { isCheckedAll, isIndeterminate } = calcIfCheckedAll(
          checkedCount,
          filterLength
      );
      this.isCheckedAll = isCheckedAll;
      this.isIndeterminate = isIndeterminate;

      // 计算当前页选中状态
      const { currentPageKeys, visibleList } = this;
      this.isCurrentPageCheckedAll = calcIfCurrentPageCheckedAll(
          currentPageKeys,
          nextCheckedKeys,
          visibleList
      );
    },
    pageSize(newValue) {
      this.innerPageSize = newValue;
    },
  },
};
</script>

<style scoped>
.bigdata-checkbox-group-container {
}

.search-input {
  width: 200px;
}

.search-btn {
  margin: 0 16px;
}

.result-container {
  margin: 16px 0;
}

.text {
  margin-right: 16px;
}

.checkbox-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  max-height: 300px;
  min-height: 100px;
}

.pagination-wrap {
  margin-top: 16px;
}

.operate-container {
  width: 100%;
  min-height: 100px;
}

.operate-container.empty-status {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
