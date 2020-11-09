<template>
  <div class="ActiveBlog">
    <h3>{{ activeBlog.title }}</h3>
    <p>{{ activeBlog.body }}</p>
    <button class="btn btn-danger" @click="deleteBlog">
      Delete Blog
    </button>
    <form class="form-group" @submit.prevent="editBlog">
      <input type="text" class="form-control" v-model="state.changedBlog.title" />
      <input type="text" class="form-control" v-model="state.changedBlog.body" />
      <button type="submit" class="btn btn-primary">
        Edit Blog
      </button>
    </form>
    <form class="form-group" @submit.prevent="postComment">
      <input type="text" class="form-control" v-model="state.body">
      <button type="submit" class="btn btn-info">
        Post Comment
      </button>
    </form>
    <comment-component v-for="comment in comments" :key="comment" :comment-prop="comment" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
import CommentComponent from '../components/CommentComponent'
export default {
  name: 'ActiveBlog',
  setup() {
    const state = reactive({
      changedBlog: {},
      body: '',
      newComment: {}
    })
    const route = useRoute()
    onMounted(() => {
      blogService.getActiveBlog(route.params.blogId)
      commentService.getComments(route.params.blogId)
    })
    return {
      state,
      activeBlog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      deleteBlog() {
        blogService.deleteBlog(route.params.blogId)
      },
      editBlog() {
        blogService.editActiveBlog(route.params.blogId, state.changedBlog)
      },
      postComment() {
        commentService.createComment(state.body)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

</style>
