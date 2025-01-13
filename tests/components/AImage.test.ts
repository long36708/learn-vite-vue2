import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AImage from "@/components/AImage/index.vue";

describe("AImage", () => {
  it("renders properly", () => {
    const wrapper = mount(AImage, {
      props: { name: "logo", extension: ".svg" },
    });
    // expect(wrapper.attributes("src")).toContain("logo.svg");
    expect(wrapper.attributes("src")).toContain("composables");
    console.log(wrapper.attributes("src"));
  });
});
