<template>
  <div class="home container-fluid">
    <h1>Welcome</h1>
    <div class="row">
      <blog-component v-for="blog in blogs" :key="blog" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(() => blogService.getAllBlogs()
    )
    return {
      users: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs)
    }
  },
  components: { BlogComponent }
}
</script>
