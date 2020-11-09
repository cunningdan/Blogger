<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <form action="form-group" @submit.prevent="createBlog">
      <input type="text" class="form-control" v-model="state.newBlog.title" placeholder="Title" />
      <input type="text" class="form-control" v-model="state.newBlog.body" placeholder="Text" />
      <button type="submit" class="btn btn-primary">
        Make Blog
      </button>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      createBlog() {
        blogService.createBlog(state.newBlog)
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
