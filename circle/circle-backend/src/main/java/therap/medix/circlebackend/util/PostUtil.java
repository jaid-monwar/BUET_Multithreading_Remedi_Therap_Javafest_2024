package therap.medix.circlebackend.util;

import therap.medix.circlebackend.model.Like;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;

public class PostUtil {
    public final static boolean isLikedByReqUser(User reqUser, Post post){

        for(Like like: post.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRepostedByReqUser(User reqUser, Post post){
        for(User user:post.getRepostUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
