<template>
  <div class="commentComponent">
    <router-link :to="{name: 'ActiveComment', params: {commentId: commentProp._id}}">
      <li>{{ commentProp.body }}</li>
    </router-link>
  </div>
  <button @click="deleteComment()" class="btn btn-warning">
    Comment Regret Button
  </button>
</template>

<script>
import router from '../router'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: ['commentProp'],
  setup(props) {
    return {
      deleteComment() {
        commentService.deleteComment()
      },
      setActiveComment() {
        router.push({ name: 'ActiveComment', params: { commentId: props.commentProp._id } })
        commentService.setActiveComment(props.commentProp)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
