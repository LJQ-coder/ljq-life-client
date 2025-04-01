import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
  const uploaderFiles = ref()

  const setSelectedFiles = (files: any) => {
    uploaderFiles.value = [files]
  };

  return {
    uploaderFiles,
    setSelectedFiles
  }
})
