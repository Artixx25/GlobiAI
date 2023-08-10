import Post from "../mongodb/models/Post.js"

class postController {
    async getUserPosts(req, res) {
        try {
            const {postUserId} = req.params;
            const post = await Post.find({postUserId});

            res.status(200).json(post);
        } catch (e) {
            res.status(409).json({ error: e.message })
        }
    }

    async editUserPosts(req, res) {
        try {
            const {userId} = req.params;
            const {username, postUserId, userImage} = req.body;
            const posts = await Post.find()
            const userPosts = posts.filter(post => post.postUserId == userId)
            let formatUpdatedPosts;
            Promise.all(
                userPosts.map(post => Post.findByIdAndUpdate(post._id, {username, postUserId, userImage}))
            ).then(function(data) {
                formatUpdatedPosts = data;
                res.status(200).json(formatUpdatedPosts);
            })
        } catch (e) {
            res.status(409).json({ error: e.message })
        }
    }

    async getUserLikes(req, res) {
        try {
            const {userId} = req.params;
            const post = await Post.find()
            let formattedLikedPost;
            Promise.all(
                post.filter(item => item.likes.has(userId))
            ).then(function(data) {
                formattedLikedPost = data
                res.status(200).json(formattedLikedPost)
            })
        } catch (e) {
            res.status(409).json({ error: e.message })
        }
    }

    async likePost(req, res) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const post = await Post.findById(id)
            const isLiked = post.likes.get(userId)
    
            if(isLiked) post.likes.delete(userId);
            else post.likes.set(userId, true);
    
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { likes: post.likes },
                {new: true}
            );
    
            res.status(200).json(updatedPost);
        } catch (e) {
            res.status(409).json({ error: e.message })
        }
    }
}

export default new postController();