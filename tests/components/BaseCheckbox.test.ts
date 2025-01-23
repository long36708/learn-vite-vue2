/**
 * @Author: longmo
 * @Date: 2025-01-23 22:24:07
 * @LastEditTime: 2025-01-23 23:19:19
 * @FilePath: tests/components/BaseCheckbox.test.ts
 * @Description:
 */
import { createLocalVue, mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import BaseCheckbox from "../../src/components/BaseCheckbox/index.vue";
import ElementUI from "element-ui";
// @vitest-environment jsdom
describe("BaseCheckbox", () => {
  it("renders properly", () => {
    const localVue = createLocalVue();
    localVue.use(ElementUI);
    const wrapper = mount(BaseCheckbox, {
      localVue,
    });
    // expect(wrapper.attributes("src")).toContain("logo.svg");
  });
});
