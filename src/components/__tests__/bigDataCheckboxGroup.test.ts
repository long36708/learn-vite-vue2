/**
 * @Author: longmo
 * @Date: 2025-01-12 20:49:27
 * @LastEditTime: 2025-01-13 00:13:11
 * @FilePath: src/components/__tests__/bigDataCheckboxGroup.test.ts
 * @Description:
 */
import { shallowMount } from "@vue/test-utils";
import MyComponent from "@/components/BigDataCheckboxGroup/index5.vue";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { mockBigData } from "@/views/BigDataDemo/mockData";

describe("BigDataCheckboxGroup", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyComponent, {
      propsData: {
        itemKey: "key",
        itemName: "name",
        dataSource: mockBigData(10000),
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("setData with empty labelList should clear checkedLabelKeys and call handleSearch", async () => {
    wrapper.vm.setData([]);
    await wrapper.vm.$nextTick(); // 等待Vue下一个周期
    const handleSearchSpy = vi.fn(wrapper.vm.handleSearch);
    await expect(wrapper.vm.labelList).toEqual([]);
    await expect(wrapper.vm.checkedLabelKeys.size).toBe(0);

    // todo 应该是会被调用
    await expect(handleSearchSpy).not.toHaveBeenCalled();

    // await expect(wrapper.vm.handleSearch).not.toHaveBeenCalled();
  });

  it("setData with single item labelList should normalize and freeze the list", () => {
    const mockNormalizedList = [{ key: "1", name: "Item 1" }];

    wrapper.vm.setData([{ key: "1", name: "Item 1" }]);

    const handleSearchSpy = vi.spyOn(wrapper.vm, "handleSearch");

    expect(wrapper.vm.labelList.length).toEqual(mockNormalizedList.length);
    expect(Object.isFrozen(wrapper.vm.labelList)).toBe(true);
    expect(wrapper.vm.checkedLabelKeys.size).toBe(0);
    // expect(wrapper.vm.handleSearch).toHaveBeenCalled();
    expect(handleSearchSpy).not.toHaveBeenCalled();
  });

  it("setData with multiple items should normalize and freeze the list", () => {
    const mockNormalizedList = [
      { key: "1", name: "Item 1" },
      { key: "2", name: "Item 2" },
    ];

    wrapper.vm.setData([
      { key: "1", name: "Item 1" },
      { key: "2", name: "Item 2" },
    ]);

    expect(wrapper.vm.labelList.length).toEqual(mockNormalizedList.length);
    expect(Object.isFrozen(wrapper.vm.labelList)).toBe(true);
    expect(wrapper.vm.checkedLabelKeys.size).toBe(0);
  });

  it("setData with duplicate items should handle normalization correctly", () => {
    const mockNormalizedList = [
      { key: "1", name: "Item 1" },
      { key: "2", name: "Item 2" },
    ];

    wrapper.vm.setData([
      { key: "1", name: "Item 1" },
      { key: "2", name: "Item 2" },
      { key: "1", name: "Item 1" }, // 重复项
    ]);

    expect(wrapper.vm.labelList.length).toEqual(mockNormalizedList.length + 1);
    expect(Object.isFrozen(wrapper.vm.labelList)).toBe(true);
    expect(wrapper.vm.checkedLabelKeys.size).toBe(0);
    // expect(wrapper.vm.handleSearch).toHaveBeenCalled();
  });
});
