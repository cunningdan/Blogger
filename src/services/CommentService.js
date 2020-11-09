import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'
class CommentService {
  async getComments(blogId) {
    try {
      const res = await api.get('/blogs/' + blogId + '/comments')
      AppState.comments = res.data
      console.log(AppState.comments)
    } catch (err) {
      console.error(err)
    }
  }

  async createComment(commentData) {
    try {
      // @ts-ignore
      const newComment = { body: commentData, blog: AppState.activeBlog.id }
      const res = await api.post('comments', newComment)
      AppState.comments.push(res.data)
      console.log(AppState.comments)
    } catch (err) {
      console.error(err)
    }
  }

  async deleteComment(commentId) {
    try {
      if (window.confirm('Did you regret your comment?')) {
        await api.delete('/comments/' + commentId)
        router.push({ name: 'ActiveBlog' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async setActiveComment(commentData) {
    try {
      AppState.activeComment = commentData
    } catch (err) {
      console.error(err)
    }
  }

  async getActiveComment(commentId) {
    try {
      const res = await api.get('/comments/' + commentId)
      AppState.activeComment = res.data
    } catch (err) {
      console.log(err)
    }
  }

  async editActiveBlog(commentId, commentData) {
    try {
      const res = await api.put('/comments/' + commentId, commentData)
      AppState.activeComment = res.data
      router.push({ name: 'ActiveComment', params: { commentId } })
    } catch (err) {
      console.error(err)
    }
  }
}

export const commentService = new CommentService()
