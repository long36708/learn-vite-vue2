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