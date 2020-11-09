import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BlogService {
  async getAllBlogs() {
    try {
      const res = await api.get('/blogs')
      AppState.blogs = res.data
      console.log(AppState.blogs)
    } catch (err) {
      console.log(err)
    }
  }

  async createBlog(blogData) {
    try {
      const res = await api.post('/blogs', blogData)
      AppState.blogs.push(res)
    } catch (err) {
      console.error(err)
    }
  }

  async deleteBlog(blogId) {
    try {
      if (window.confirm('Are you sure you want to delete this?')) {
        await api.delete('/blogs/' + blogId)
        router.push({ name: 'Home' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  setActiveBlog(blogData) {
    try {
      AppState.activeBlog = blogData
    } catch (err) {
      console.error(err)
    }
  }

  async getActiveBlog(blogId) {
    try {
      const res = await api.get('/blogs/' + blogId)
      AppState.activeBlog = res.data
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  async editActiveBlog(blogId, blogData) {
    try {
      const res = await api.put('/blogs/' + blogId, blogData)
      AppState.activeBlog = res.data
      router.push({ name: 'ActiveBlog', params: { blogId } })
    } catch (err) {
      console.error(err)
    }
  }
}

export const blogService = new BlogService()
