<template>
  <v-container>
    <v-btn @click="openCreatePostDialog">Add Post</v-btn>
    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="id"
      :pagination.sync="pagination"
      @click:row="openPostDetails"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-btn @click="editPost(item)">Edit</v-btn>
        <v-btn @click="deletePost(item)">Delete</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="createDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ isEditMode ? "Edit Post" : "Add Post" }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.title" label="Title" />
          <v-textarea v-model="form.body" label="Body" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="savePost">Save</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      pagination: { page: 1, itemsPerPage: 5 },
      createDialog: false,
      isEditMode: true,
      form: { id: null, title: "", body: "" },
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response.data;
      } catch (error) {
        this.$toast.error("Failed to fetch posts");
      }
    },
    openCreatePostDialog() {
      this.form = { title: "", body: "" };
      this.isEditMode = false;
      this.createDialog = true;
    },
    async savePost() {
      if (this.isEditMode) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${this.form.id}`,
          this.form
        );
      } else {
        await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          this.form
        );
      }
      this.createDialog = false;
      this.fetchPosts();
    },
    async editPost(post) {
      this.form = { ...post };
      this.isEditMode = true;
      this.createDialog = true;
    },
    async deletePost(post) {
      const confirmation = confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmation) {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`
        );
        this.fetchPosts();
      }
    },
    openPostDetails(post) {
      console.log(post);
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scope lang="scss">
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0px;
  width: 100px;
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
