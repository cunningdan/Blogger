<template>
  <div class="activeComment">
    <h3>{{ comment.body }}</h3>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
export default {
  name: 'ActiveComment',
  setup() {
    const state = reactive({
      changedComment: {}
    })
    const route = useRoute()
    onMounted(() => {
      commentService.getActiveComment(route.params.commentId)
    })
    return {
      comment: computed(() => AppState.activeComment),
      deleteComment() {
        commentService.deleteComment(route.params.commentId)
      },
      editComment() {
        commentService.editActiveComment(route.params.commentId, state.changedComment)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
