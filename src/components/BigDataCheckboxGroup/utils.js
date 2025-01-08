export const ITEM_KEY = "id";
export const ITEM_NAME = "label";

export const EVENT_NAME_UP_MAX = 'emitUpMax';
export const MAX_LENGTH = Infinity

/**
 * 将数据源格式化为包含id和label的对象数组
 * @param dataSource
 * @param itemKey
 * @param itemName
 * @returns {*[]}
 */
export function normalizeList(
    dataSource,
    itemKey = ITEM_KEY,
    itemName = ITEM_NAME
) {
    if (!Array.isArray(dataSource) || dataSource.length === 0) {
        return [];
    }
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

/**
 * 比较两个数组，返回新增、删除和相等的keys
 * @param nextValues
 * @param preValues
 * @returns {{data: *, type: string}|{data, type: string}}
 */
export const compare = (nextValues, preValues) => {
    if (nextValues.length > preValues.length) {
        // 新增了
        return {
            type: "add",
            data: nextValues.filter((item) => !preValues.includes(item)),
        };
    } else if (nextValues.length < preValues.length) {
        // 删除了
        return {
            type: "del",
            data: preValues.filter((item) => !nextValues.includes(item)),
        };
    } else if (nextValues.length === preValues.length) {
        return {
            type: "equal",
            data: nextValues,
        };
    }
};

/**
 * 获取当前页选中的keys
 * @param visibleList
 * @param checkedLabelKeys
 * @returns {*}
 */
export function getCurrentPageCheckedKeys(visibleList, checkedLabelKeys) {
    const visibleIds = visibleList.map((item) => item.id);
    const result = [];
    for (let i = 0; i < checkedLabelKeys.length; i++) {
        const key = checkedLabelKeys[i];
        if (visibleIds.includes(key)) {
            result.push(key);
        }
    }
    return result;
}

/**
 * 获取选中的前指定数量的keys
 * @param filteredLabelList
 * @param maxLength
 * @returns {*}
 */
export function getLimitKeys(filteredLabelList, maxLength) {
    return filteredLabelList.slice(0, maxLength).map((item) => item.id);
}

/**
 * 判断数组是否相等，不考虑顺序
 */
export function isEqualArray(arr1, arr2) {
    const arr1Str = arr1.sort().toString();
    const arr2Str = arr2.sort().toString();
    return arr1Str === arr2Str;
}

/**
 * 判断当前页是否全选
 * @param currentPageKeys
 * @param checkedLabelKeys
 * @param visibleList
 * @returns {*|boolean}
 */
export function calcIfCurrentPageCheckedAll(
    currentPageKeys,
    checkedLabelKeys,
    visibleList
) {
    const currentPageKeysLength = currentPageKeys.length;
    const checkedCount = checkedLabelKeys.length;
    if (currentPageKeysLength === 0 || checkedCount === 0) {
        return false;
    }
    const currentPageCheckedKeys = getCurrentPageCheckedKeys(
        visibleList,
        checkedLabelKeys
    );
    console.log("currentPageCheckedKeys", currentPageCheckedKeys);
    if (currentPageCheckedKeys.length !== currentPageKeysLength) {
        return false;
    } else {
        return currentPageKeys.every((key) => currentPageCheckedKeys.includes(key));
    }
}

/**
 * 判断是否全选所有
 * @param allCheckedCount
 * @param filterLength
 * @returns {{isCheckedAll: boolean, isIndeterminate: boolean}}
 */
export function calcIfCheckedAll(allCheckedCount, filterLength) {
    return {
        isCheckedAll: allCheckedCount > 0 && allCheckedCount === filterLength,
        isIndeterminate: allCheckedCount > 0 && allCheckedCount < filterLength,
    };
}

/**
 * 数组差集 在arr1中，不在arr2中的元素
 * @param arr1
 * @param arr2
 */

export function difference(arr1, arr2) {
    return Array.from(new Set(arr1.filter((item) => !arr2.includes(item))));
}
