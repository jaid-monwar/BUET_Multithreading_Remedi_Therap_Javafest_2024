package therap.medix.circlebackend.service;

import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Like;
import therap.medix.circlebackend.model.User;

import java.util.List;

public interface LikeService {

    public Like likePost(Long postId, User user) throws UserException, PostException;

    public List<Like> getAllLikes(Long postId) throws PostException;



}
