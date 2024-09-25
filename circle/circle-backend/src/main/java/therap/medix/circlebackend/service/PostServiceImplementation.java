package therap.medix.circlebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.repository.PostRepository;
import therap.medix.circlebackend.request.PostReplyReques;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post req, User user) throws UserException {

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(false);
        post.setPost(true);
        post.setVideo(req.getVideo());

        return postRepository.save(post);
    }

    @Override
    public List<Post> findAllPost() {

        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public Post repost(Long postId, User user) throws UserException, PostException {

        Post post = findById(postId);
        if(post.getRepostUser().contains(user)){
            post.getRepostUser().remove(user);
        } else {
            post.getRepostUser().add(user);
        }

        return postRepository.save(post);
    }

    @Override
    public Post findById(Long postId) throws PostException {

        Post post = postRepository.findById(postId).orElseThrow(()->new PostException("Post not found with id " + postId));

        return post;
    }

    @Override
    public void deletePostById(Long postId, Long userId) throws PostException, UserException {

        Post post = findById(postId);

        if(!userId.equals(post.getUser().getId())) {
            throw new UserException("User not authorized to delete this post");
        }

        postRepository.deleteById(postId);

    }

    @Override
    public Post removeFromRepost(Long postId, User user) throws UserException, PostException {
        return null;
    }

    @Override
    public Post createdReply(PostReplyReques req, User user) throws PostException {

        Post replyFor = findById(req.getPostId());

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(true);
        post.setPost(false);
        post.setReplyFor(replyFor);


        Post savedReply = postRepository.save(post);

//        post.getReplyPosts().add(savedReply);
        replyFor.getReplyPosts().add(savedReply);
        postRepository.save(replyFor);


        return replyFor;
    }

    @Override
    public List<Post> getUserPost(User user) {

        return postRepository.findByRepostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Post> findByLikesContainsUser(User user) {

        return postRepository.findByLikesUser_id(user.getId());
    }
}
