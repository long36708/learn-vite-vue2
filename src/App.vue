<script setup lang="ts">
import { useRoute, useRouter } from "vue-router/composables";
import { onMounted, watch } from "vue";
import { useAssetsImageURL } from "@/composables/url-composable";

const liuyifeiURL = useAssetsImageURL("liuyifei", { extension: ".jpg" });
onMounted(() => {
  /** Route */
  const route = useRoute();
  const router = useRouter();
  // Watch
  watch(
    () => route?.name,
    (name) => console.log("route is changed:", name, route, router),
    {
      immediate: true,
    }
  );
});
</script>

<template>
  <div id="app">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        :src="liuyifeiURL"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <SvgIcon name="colorfull/neon-cat" />
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </header>

    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
