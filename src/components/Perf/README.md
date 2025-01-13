# 测试结果

## 100w

- fori 93-102ms
- map 150ms
- include 2.6-2.9ms
- set-has 122ms-131ms

- set转为数组，要 100ms

> include 比 set has 快，因为 大数据量下 转为set的耗时非常久
> 使用 Set 提高查找效率：建议在data中定义的时候就是Set格式的
> 减少不必要的dom监听，事件委托为上层

- fori 比 map 快
- 使用 浅拷贝 不如直接修改源对象 快


- includes: 403.9130859375 ms
- indexOf: 410.324951171875 ms
- match: 847.489990234375 ms
- search: 807.906982421875 ms

> 在使用 Object.freeze 冻结数据后，使用 indexOf 和 includes 耗时差不多
