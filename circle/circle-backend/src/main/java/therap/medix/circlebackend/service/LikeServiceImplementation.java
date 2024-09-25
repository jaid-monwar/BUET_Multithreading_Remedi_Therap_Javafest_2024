package therap.medix.circlebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Like;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.repository.LikeRepository;
import therap.medix.circlebackend.repository.PostRepository;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(Long postId, User user) throws UserException, PostException {

        Like isLikeExist = likeRepository.isLikeExist(user.getId(), postId);

        if(isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Post post = postService.findById(postId);

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);

        Like savedLike = likeRepository.save(like);

        post.getLikes().add(savedLike);
        postRepository.save(post);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long postId) throws PostException {

        Post post = postService.findById(postId);

        List<Like> likes = likeRepository.findByPostId(postId);

        return likes;
    }
}
