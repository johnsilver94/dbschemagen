<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloI18n />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloI18n from "@/components/HelloI18n.vue";

@Component({
  components: {
    HelloI18n
  }
})
export default class About extends Vue {}
</script>
