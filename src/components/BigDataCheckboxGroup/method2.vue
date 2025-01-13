<!--
 * @Author: longmo
 * @Date: 2025-01-13 22:04:00
 * @LastEditTime: 2025-01-13 22:14:57
 * @FilePath: src/components/BigDataCheckboxGroup/method2.vue
 * @Description:
 -->
<template>
  <div>
    <div
      style="
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: baseline;
      "
    >
      <h3>初始化设置</h3>
      <div>
        <el-input
          style="width: 200px"
          placeholder="请生成节点数量,最高80w"
          v-model="nodeNum"
          clearable
        ></el-input>
        <el-button @click="getData">请求获取数据</el-button>
      </div>
    </div>
    <!-- 模板使用End -->
    <div style="display: flex; flex-direction: column; align-items: baseline">
      <div style="margin-bottom: 20px">
        <el-input
          style="width: 200px"
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
        ></el-input>
        <el-button @click="searchData">搜索</el-button>
      </div>
      <div style="margin-bottom: 20px" v-if="currentPageDataList?.length">
        <el-checkbox v-model="selectAll" @change="allSelectChange"
          >全选所有
        </el-checkbox>
        <el-checkbox v-model="selectPage" @change="pageSelectChange"
          >全选本页
        </el-checkbox>
      </div>
      <div>
        <el-checkbox-group v-model="selectDataList" style="text-align: left">
          <template v-for="(item, index) in currentPageDataList">
            <el-checkbox
              style="width: 120px"
              :label="item.label"
              :key="index"
            ></el-checkbox>
          </template>
        </el-checkbox-group>
      </div>
      <div v-if="showDataList?.length">
        <div style="margin: 20px 0">
          <el-pagination
            @size-change="imageSizeChange"
            @current-change="imageCurrentChange"
            :current-page="currentPage"
            :page-sizes="[50, 100, 200, 300, 400, 500, 1000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="showDataList.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
import {
  INIT_COUNT,
  mockBigData,
} from "@/components/BigDataCheckboxGroup/mockBigData";

export default {
  name: "My-Test",
  components: {},
  props: {},
  data() {
    return {
      // 节点数量
      nodeNum: INIT_COUNT,
      // 搜索关键字
      searchKey: "",
      // 全部数据
      allDataList: [],
      // 展示的数据列表
      showDataList: [],
      // 当前页的数据量
      currentPageDataList: [],
      // 勾选的数据量
      selectDataList: [],
      // 反向勾选数据
      disSelectionTarget: [],
      // 全选所有
      selectAll: false,
      selectPage: false,

      currentPage: 1,
      pageSize: 100,
    };
  },
  computed: {
    paginationCompute() {
      return `${this.currentPage} / ${Math.ceil(
        this.filterList.length / this.pageSize
      )}`;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submit() {
      const list = this.allDataList.map(() => {
        return Math.floor(Math.random(0, 1) * 10000000000);
      });
      console.log("list", list);
    },
    /**
     * @desc 获取数据
     * @returns {undefined}
     */
    getData() {
      this.selectDataList = [];
      this.allDataList = mockBigData(this.nodeNum);
      this.showDataList = this.allDataList;
      this.getImageList();
    },

    /**
     * @desc 全选所有
     * @returns {undefined}
     */
    allSelectChange(value) {
      const listArr = this.currentPageDataList.map((item) => item.label);
      if (value) {
        this.disSelectionTarget = [];
        listArr.forEach((fileId) => {
          if (!this.selectDataList.includes(fileId)) {
            this.selectDataList.push(fileId);
          }
        });
        this.selectPage = true;
      } else {
        this.selectDataList = [];
        listArr.forEach((fileId) => {
          if (!this.disSelectionTarget.includes(fileId)) {
            this.disSelectionTarget.push(fileId);
          }
        });
        this.selectPage = false;
      }
    },

    /**
     * @desc 全选当前页
     * @returns {undefined}
     */
    pageSelectChange(value) {
      console.log("全选当前页");
      const listArr = this.currentPageDataList.map((item) => item.label);
      if (value) {
        listArr.forEach((fileId) => {
          // 选择数组中添加
          if (!this.selectDataList.includes(fileId)) {
            this.selectDataList.push(fileId);
          }
          // 未选择数组中删除
          let flag = true;
          while (flag) {
            let myIndex = -1;
            this.disSelectionTarget.some((item, index) => {
              if (item === fileId) {
                myIndex = index;
                return true;
              } else {
                return false;
              }
            });
            if (myIndex > -1) {
              this.disSelectionTarget.splice(myIndex, 1);
            } else {
              flag = false;
            }
          }
        });
      } else {
        listArr.forEach((fileId) => {
          // 未选择数组中添加
          if (!this.disSelectionTarget.includes(fileId)) {
            this.disSelectionTarget.push(fileId);
          }
          // 选择数组中删除
          let flag = true;
          while (flag) {
            let myIndex = -1;
            this.selectDataList.some((item, index) => {
              if (item === fileId) {
                myIndex = index;
                return true;
              } else {
                return false;
              }
            });
            if (myIndex > -1) {
              this.selectDataList.splice(myIndex, 1);
            } else {
              flag = false;
            }
          }
        });
      }
    },

    /**
     * @desc 将结果push到数组中
     * @param {Array}
     * @returns {undefined}
     */
    pushDataTargetId(list) {
      const list1 = list.map((item) => item.label);
      // 是否在勾选的数组中
      const selectListArr = list1.filter((item) =>
        this.selectDataList.includes(item)
      );
      // 是否在不勾选的数组中
      const disSelectlistArr = list1.filter((item) =>
        this.disSelectionTarget.includes(item)
      );
      // 找出返回数据中没有在不勾选数组中的数据
      const disSelect = list1.filter(
        (item) => !this.disSelectionTarget.includes(item)
      );
      // 已经处理过的页面
      if (selectListArr.length === 0 && disSelectlistArr.length === 0) {
        console.log("进入未处理页面");
        // 请求新的页 数据没有被处理
        if (this.selectAll) {
          // 保存到数组
          disSelect.forEach((fileId) => {
            if (!this.selectDataList.includes(fileId)) {
              this.selectDataList.push(fileId);
            }
          });
          this.selectPage = true;
        } else {
          disSelect.forEach((fileId) => {
            if (!this.disSelectionTarget.includes(fileId)) {
              this.disSelectionTarget.push(fileId);
            }
          });
          this.selectPage = false;
        }
      } else {
        console.log("进入到处理页面");
        if (selectListArr.length === list.length) {
          this.selectPage = true;
        } else {
          this.selectPage = false;
        }
      }
    },

    /**
     * @desc 搜索数据
     * @returns {undefined}
     */
    searchData() {
      this.selectDataList = [];
      this.disSelectionTarget = [];
      this.selectPage = false;
      this.selectAll = false;
      console.log("搜索内容", this.searchKey);
      const start = new Date().getTime();
      this.showDataList = this.allDataList.filter((item) => {
        return item.label.includes(this.searchKey);
      });
      const end = new Date().getTime();
      console.log("过滤时间", (end - start) / 1000);
      console.log("过滤出数据量", this.showDataList?.length);
      this.getImageList();
    },

    /**
     * @desc 获得当页数据
     * @returns {undefined}
     */
    getImageList() {
      const start = new Date().getTime();
      this.currentPageDataList = this.showDataList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.pushDataTargetId(this.currentPageDataList);
      const end = new Date().getTime();
      console.log("换页时间", (end - start) / 1000);
    },

    /**
     * @desc 页大小改变
     * @returns {undefined}
     */
    async imageSizeChange(value) {
      this.pageSize = value;
      this.currentPage = 1;
      this.getImageList();
      this.$forceUpdate();
    },

    /**
     * @desc 当前页改变
     * @returns {undefined}
     */
    async imageCurrentChange(value) {
      this.currentPage = value;
      this.getImageList();
    },
  },
};
</script>
<style scoped></style>
