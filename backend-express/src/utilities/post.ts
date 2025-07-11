import Like from '../models/Like'

export async function countLikesByPost(postId: number): Promise<number> {
  const count = await Like.count({
    where: { post_id: postId }
  })
  return count
}