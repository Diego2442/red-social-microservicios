import { createRequest, createResponse } from 'node-mocks-http'
import { PostController } from '../../../controllers/PostController'
import Post from '../../../models/Post'
import Like from '../../../models/Like'

// Mocks de modelos
jest.mock('../../../models/Post', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn()
  }
}))

jest.mock('../../../models/Like', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}))

describe('PostController', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('create', () => {
    it('should create a post and return 201', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/api/posts',
        body: {
          content: 'Un post nuevo'
        }
      })

      req.user = { id: 1 } as any // ✅ Corregido

      const mockPost = {
        ...req.body,
        user_id: null,
        save: jest.fn()
      }

      ;(Post.create as jest.Mock).mockResolvedValue(mockPost)

      const res = createResponse()

      await PostController.create(req, res)

      expect(Post.create).toHaveBeenCalledWith(req.body)
      expect(mockPost.save).toHaveBeenCalled()
      expect(mockPost.user_id).toBe(1)

      const data = res._getJSONData()
      expect(res.statusCode).toBe(201)
      expect(data).toEqual({ message: 'Post creado' })
    })
  })

  describe('getAll', () => {
    it('should return paginated posts', async () => {
      const req = createRequest({
        method: 'GET',
        url: '/api/posts?page=2&limit=5',
        query: {
          page: '2',
          limit: '5'
        }
      })

      const res = createResponse()

      const mockPosts = {
        count: 13,
        rows: [{ id: 1, content: 'Post 1' }, { id: 2, content: 'Post 2' }]
      }

      ;(Post.findAndCountAll as jest.Mock).mockResolvedValue(mockPosts)

      await PostController.getAll(req, res)

      const data = res._getJSONData()
      expect(res.statusCode).toBe(200)
      expect(data).toEqual({
        totalItems: 13,
        totalPages: Math.ceil(13 / 5),
        currentPage: 2,
        posts: mockPosts.rows
      })
    })
  })

  describe('giveLike', () => {
    it('should return 404 if post does not exist', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/api/posts/like',
        body: { post_id: 999 }
      })

      req.user = { id: 1 } as any // ✅ Corregido

      ;(Post.findByPk as jest.Mock).mockResolvedValue(null)

      const res = createResponse()

      await PostController.giveLike(req, res)

      const data = res._getJSONData()
      expect(res.statusCode).toBe(404)
      expect(data).toEqual({ error: 'No se encontró el post' })
    })

    it('should create a like if not exists', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/api/posts/like',
        body: { post_id: 10 }
      })

      req.user = { id: 2 } as any // ✅ Corregido

      ;(Post.findByPk as jest.Mock).mockResolvedValue({ id: 10 })
      ;(Like.findOne as jest.Mock).mockResolvedValue(null)
      ;(Like.create as jest.Mock).mockResolvedValue({})

      const res = createResponse()

      await PostController.giveLike(req, res)

      const data = res._getJSONData()
      expect(res.statusCode).toBe(201)
      expect(data).toEqual({ message: 'Like exitoso' })
    })

    it('should remove like if it already exists', async () => {
      const req = createRequest({
        method: 'POST',
        url: '/api/posts/like',
        body: { post_id: 10 }
      })

      req.user = { id: 2 } as any // ✅ Corregido

      const mockLike = { destroy: jest.fn() }

      ;(Post.findByPk as jest.Mock).mockResolvedValue({ id: 10 })
      ;(Like.findOne as jest.Mock).mockResolvedValue(mockLike)

      const res = createResponse()

      await PostController.giveLike(req, res)

      const data = res._getJSONData()
      expect(mockLike.destroy).toHaveBeenCalled()
      expect(res.statusCode).toBe(200)
      expect(data).toEqual({ message: 'Unlike exitoso' })
    })
  })
})
