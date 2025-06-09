<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!content && !isPreviewing">404 - Content not found</div>
    <Content
      v-else
      :model="model"
      :content="content"
      :api-key="apiKey"
      :custom-components="customComponents"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-vue";
import { CUSTOM_COMPONENTS } from "./builder-registry";

export default defineComponent({
  name: "FigmaImports",
  components: {
    Content,
  },
  setup() {
    const model = "figma-imports";
    const apiKey = import.meta.env.VITE_BUILDER_API_KEY;
    const content = ref(null);
    const loading = ref(true);
    const customComponents = CUSTOM_COMPONENTS;

    onMounted(async () => {
      try {
        const builderContent = await fetchOneEntry({
          model,
          apiKey,
          userAttributes: {
            urlPath: window.location.pathname,
          },
        });

        content.value = builderContent;
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        loading.value = false;
      }
    });

    return {
      model,
      apiKey,
      content,
      loading,
      customComponents,
      isPreviewing: isPreviewing(),
    };
  },
});
</script>
