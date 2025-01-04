/**
 * @Author: longmo
 * @Date: 2025-01-04 11:28:00
 * @LastEditTime: 2025-01-04 11:28:19
 * @FilePath: src/plugins/vxeTable.js
 * @Description:
 */
import Vue from "vue";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
import VxeUI from "vxe-pc-ui"; // 否则工具栏配置了无法显示
import "vxe-pc-ui/es/style.css";

Vue.use(VxeUITable);
Vue.use(VxeUI);
