// export const INIT_COUNT= 300_000;
export const INIT_COUNT = 1_000_000;
export const ITEM_KEY = "id";
export const ITEM_NAME = "label";

export const mockBigData = (count) => {
  // const count = 1_000_000;
  // const count = 250;
  // const count = 250_000;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      key: i,
      label: `标签${i}`,
    });
  }
  return data;
};

/**
 * 将数据源格式化为包含id和label的对象数组
 * @param dataSource
 * @param itemKey
 * @param itemName
 * @returns {*[]}
 */
export function normalizeList1(
  dataSource,
  itemKey = ITEM_KEY,
  itemName = ITEM_NAME
) {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return [];
  }
  if (ITEM_NAME === itemName && itemKey === ITEM_KEY) return dataSource;
  const list = [];
  for (let i = 0; i < dataSource.length; i++) {
    const item = dataSource[i];
    if (item[itemKey] === undefined) {
      // 可以为0，但是不允许是 undefined
      console.error(`数据源中没有找到itemKey为${itemKey}的字段，请检查数据`);
    }
    list.push({
      ...item,
      [ITEM_KEY]: item[itemKey],
      [ITEM_NAME]: item[itemName],
    });
  }
  return list;
}

export function normalizeList2(
  dataSource,
  itemKey = ITEM_KEY,
  itemName = ITEM_NAME
) {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return [];
  }

  // 使用 map 方法简化代码逻辑
  return dataSource
    .map((item) => {
      if (item[itemKey] === undefined) {
        console.error(`数据源中没有找到itemKey为${itemKey}的字段，请检查数据`);
      }

      // 直接返回新的对象，而不是先推入再返回整个列表
      return {
        ...item,
        [ITEM_KEY]: item[itemKey],
        [ITEM_NAME]: item[itemName],
      };
    })
    .filter((item) => item[ITEM_KEY] !== undefined); // 移除任何未定义 ID 的条目
}

export function normalizeList3(
  dataSource,
  itemKey = ITEM_KEY,
  itemName = ITEM_NAME
) {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return [];
  }
  if (ITEM_NAME === itemName && itemKey === ITEM_KEY) return dataSource;
  for (let i = 0; i < dataSource.length; i++) {
    const item = dataSource[i];
    if (item[itemKey] === undefined) {
      // 可以为0，但是不允许是 undefined
      console.error(`数据源中没有找到itemKey为${itemKey}的字段，请检查数据`);
    }

    item[ITEM_KEY] = item[itemKey];
    item[ITEM_NAME] = item[itemName];
  }
  return dataSource;
}
