<template>
  <v-container>
    <v-file-input v-model="file" label="Choose a file" @change="onFileChange" />
    <section class="bottons-section">
      <v-btn :disabled="!file" @click="sendFile">Send</v-btn>
      <v-btn :disabled="!fileSent" @click="downloadFile">Download</v-btn>
    </section>
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
        console.log(response);
        this.downloadUrl = response.data.location;
        this.fileSent = true;
        this.$toast.success("File sent successfully");
        alert("File sent successfully");
      } catch (error) {
        this.$toast.error("Failed to send file");
      }
    },
    downloadFile() {
      if (this.downloadUrl) {
        const link = document.createElement("a");
        link.href = this.downloadUrl;
        link.download = "file"; // Указываем имя файла для скачивания
        link.style.display = "none"; // Делаем ссылку невидимой
        document.body.appendChild(link); // Добавляем ссылку в DOM
        link.click(); // Инициализация скачивания
        document.body.removeChild(link); // Убираем ссылку из DOM после скачивания
      }
    },
  },
};
</script>

<style scope lang="scss">
.bottons-section {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
