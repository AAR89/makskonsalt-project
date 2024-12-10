<template>
  <v-container>
    <v-file-input v-model="file" label="Choose a file" @change="onFileChange" />
    <div class="bottons-block">
      <v-btn :disabled="!file" @click="sendFile">Send</v-btn>
      <v-btn :disabled="!fileSent" @click="downloadFile">Download</v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      fileSent: false,
      downloadUrl: null,
    };
  },
  methods: {
    onFileChange(file) {
      this.file = file;
    },
    async sendFile() {
      try {
        const formData = new FormData();
        formData.append("file", this.file);
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.downloadUrl = response.data.url;
        this.fileSent = true;
        this.$toast.success("File sent successfully");
      } catch (error) {
        this.$toast.error("Failed to send file");
      }
    },
    downloadFile() {
      const link = document.createElement("a");
      link.href = this.downloadUrl;
      link.download = "file";
      link.click();
    },
  },
};
</script>

<style scope lang="scss">
.bottons-block {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
