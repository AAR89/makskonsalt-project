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
      <div class="add-button-section">
        <v-btn @click="openCreatePostDialog">Добавить пост</v-btn>
      </div>

      <v-data-table
        :headers="headers"
        :items="posts"
        item-key="id"
        :options.sync="options"
        @click:row="openPostDetails"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-btn @click.stop="editPost(item)">Редактировать</v-btn>
          <v-btn @click.stop="deletePost(item)">Удалить</v-btn>
        </template>
      </v-data-table>
      <template>
        <v-dialog v-model="createDialog" max-width="500px" attach="#app">
          <v-card>
            <v-card-title>{{
              isEditMode ? "Edit Post" : "Add Post"
            }}</v-card-title>
            <v-card-text>
              <v-text-field v-model="form.title" label="Title" />
              <v-textarea v-model="form.body" label="Body" />
            </v-card-text>
            <v-card-actions class="posts-bottons-section">
              <v-btn color="black" @click="savePost">Сохранитьь</v-btn>
              <v-btn color="black" @click="closeDialog">Отмена</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "Body", value: "body" },
        { text: "Actions", value: "actions" },
      ],
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
      },
      createDialog: false,
      isEditMode: false,
      form: { id: null, title: "", body: "" },
      isLoading: false,
    };
  },
  methods: {
    async fetchPosts() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://2264c69973bfa56d.mokky.dev/posts"
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        this.isLoading = false;
      }
    },
    openCreatePostDialog() {
      this.form = { title: "", body: "" };
      this.isEditMode = false;
      this.createDialog = true;
    },
    async savePost() {
      try {
        if (this.isEditMode) {
          const response = await axios.patch(
            `https://2264c69973bfa56d.mokky.dev/posts/${this.form.id}`,
            this.form
          );
          console.log("Пост отредактирован.", response.data);
          alert("Пост отредактирован.");
        } else {
          const response = await axios.post(
            "https://2264c69973bfa56d.mokky.dev/posts",
            this.form
          );
          console.log("Пост создан", response.data);
          alert("Пост отредактирован.");
        }
        this.createDialog = false;
        this.fetchPosts();
      } catch (error) {
        console.error("Error saving post:", error);
        alert("Ошибка при сохранении поста.");
      }
    },
    async editPost(post) {
      this.form = { ...post };
      this.isEditMode = true;
      this.createDialog = true;
    },
    async deletePost(post) {
      const confirmation = confirm("Вы уверенны что хотите удалить этот пост?");
      if (confirmation) {
        await axios.delete(
          `https://2264c69973bfa56d.mokky.dev/posts/${post.id}`
        );
        this.fetchPosts();
      }
    },
    openPostDetails(post) {
      this.editPost(post);
      console.log(post);
    },
    closeDialog() {
      this.createDialog = false;
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scope lang="scss">
.container {
  padding: 0px 12px 12px 12px;
}

.text-center {
  margin-top: 10px;
}

.v-btn:not(.v-btn--round).v-size--default {
  padding: 0px;
  width: 140px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 0.775rem;
}

tr {
  cursor: pointer;
}

.posts-bottons-section {
  display: flex;
  justify-content: left;
  gap: 10px;
}

.v-data-table__mobile-row__cell {
  display: flex;
  gap: 0.625rem;
}

@media (max-width: 410px) {
  .v-data-table__mobile-row__cell {
    flex-direction: column;
  }
}
</style>
