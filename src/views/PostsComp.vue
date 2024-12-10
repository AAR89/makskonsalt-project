<template>
  <v-container>
    <v-btn @click="openCreatePostDialog">Add Post</v-btn>
    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="id"
      :options.sync="options"
      @click:row="openPostDetails"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-btn @click.stop="editPost(item)">Edit</v-btn>
        <v-btn @click.stop="deletePost(item)">Delete</v-btn>
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
          <v-card-actions>
            <v-btn color="black" @click="savePost">Save</v-btn>
            <v-btn color="black" @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
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
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
      },
      createDialog: false,
      isEditMode: false,
      form: { id: null, title: "", body: "" },
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://2264c69973bfa56d.mokky.dev/posts"
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
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
          console.log("Post updated:", response.data);
          alert("Post updated");
        } else {
          const response = await axios.post(
            "https://2264c69973bfa56d.mokky.dev/posts",
            this.form
          );
          console.log("Post created:", response.data);
          alert("Post created");
        }
        this.createDialog = false;
        this.fetchPosts();
      } catch (error) {
        console.error("Error saving post:", error);
      }
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
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0px;
  width: 100px;
  margin-bottom: 5px;
  margin-top: 5px;
}

tr {
  cursor: pointer;
}
</style>
