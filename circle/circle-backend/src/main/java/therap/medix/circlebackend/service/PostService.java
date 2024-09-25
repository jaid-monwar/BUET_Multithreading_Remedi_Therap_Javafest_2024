package therap.medix.circlebackend.service;

import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.request.PostReplyReques;

import java.util.List;

public interface PostService {

    public Post createPost(Post req, User user) throws UserException;
    public List<Post> findAllPost();
    public Post repost(Long postId, User user) throws UserException, PostException;
    public Post findById(Long postId) throws PostException;

    public void deletePostById(Long postId, Long userId) throws PostException, UserException;

    public Post removeFromRepost(Long postId, User user) throws UserException, PostException;

    public Post createdReply(PostReplyReques req, User user) throws PostException;

    public List<Post> getUserPost(User user);

    public List<Post> findByLikesContainsUser(User user);


}
