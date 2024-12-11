<template>
  <section>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="#42b983"
      size="32"
      class="text-center"
    ></v-progress-circular>

    <v-container v-if="!isLoading">
      <v-file-input
        v-model="file"
        label="Выберите файл"
        @change="onFileChange"
      />
      <section class="bottons-section">
        <v-btn :disabled="!file" @click="sendFile">Отправить</v-btn>
        <v-btn :disabled="!fileSent" @click="downloadFile">Скачать</v-btn>
      </section>

      <v-list v-if="reversedFiles.length !== 0">
        <v-list-item
          v-for="file in reversedFiles"
          :key="file.id"
          class="file-item"
        >
          <v-list-item-content>
            <v-list-item-title>{{ file.fileName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="bottons-section">
            <v-btn icon @click="downloadFileFromList(file.url, file.fileName)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteFile(file.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item-content>
          <v-list-item-title class="no-files-title"
            >Нет файлов</v-list-item-title
          >
        </v-list-item-content>
      </v-list>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      file: null,
      fileSent: false,
      downloadUrl: null,
      fileName: null,
      files: [],
      isLoading: false,
    };
  },
  computed: {
    reversedFiles() {
      return [...this.files].reverse();
    },
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
          "https://2264c69973bfa56d.mokky.dev/uploads",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.downloadUrl = response.data.url;
        this.fileName = response.data.fileName;
        this.fileSent = true;
        this.fetchFiles();
        alert("Файл успешно отправлен");
      } catch (error) {
        console.error("Ошибка при отправке файла", error);
      }
    },

    downloadFile() {
      if (this.downloadUrl) {
        saveAs(this.downloadUrl, this.fileName);
        this.fileName = null;
      }
    },

    downloadFileFromList(url, fileName) {
      saveAs(url, fileName);
    },

    async deleteFile(fileId) {
      try {
        await axios.delete(
          `https://2264c69973bfa56d.mokky.dev/uploads/${fileId}`
        );
        this.files = this.files.filter((file) => file.id !== fileId);
        alert("Файл успешно удалён");
      } catch (error) {
        console.error("Ошибка при удалении файла", error);
      }
    },

    async fetchFiles() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://2264c69973bfa56d.mokky.dev/uploads"
        );
        this.files = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке списка файлов", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchFiles();
  },
};
</script>

<style scoped lang="scss">
.bottons-section {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.v-list-item__action {
  flex-direction: row;
}
.file-item {
  border-top: thin solid rgba(0, 0, 0, 0.12);
  margin: 0px;
  display: flex;
}
.file-item:last-child {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  margin: 0px;
}
.no-files-title {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  border-top: thin solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.38);
  height: 3.938rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
