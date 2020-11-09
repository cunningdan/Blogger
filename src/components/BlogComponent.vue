<template>
  <div class="blogComponent col-3">
    <router-link :to="{name: 'ActiveBlog', params: {blogId: blogProp._id}}">
      <h3>{{ blogProp.title }}</h3>
    </router-link>
    <p>{{ blogProp.body }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import router from '../router'
export default {
  name: 'BlogComponent',
  props: ['blogProp'],
  setup(props) {
    return {
      users: computed(() => AppState.user),
      setActiveBlog() {
        router.push({ name: 'ActiveBlog', params: { blogId: props.blogProp._id } })
        blogService.setActiveBlog(props.blogProp)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
