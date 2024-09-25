package therap.medix.circlebackend.dto.mapper;

import therap.medix.circlebackend.dto.PostDto;
import therap.medix.circlebackend.dto.UserDto;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.util.PostUtil;

import java.util.ArrayList;
import java.util.List;

public class PostDtoMapper {

    public static PostDto toPostDto(Post post, User reqUser) {

        UserDto user = UserDtoMapper.toUserDto(post.getUser());

        boolean isLiked = PostUtil.isLikedByReqUser(reqUser, post);
        boolean isReposted = PostUtil.isRepostedByReqUser(reqUser, post);

        List<Long> repostUserId = new ArrayList<>();

        for(User user1:post.getRepostUser()){
            repostUserId.add(user1.getId());
        }

        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size());
        postDto.setTotalReposts(post.getRepostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRepost(isReposted);
        postDto.setRepostUsersId(repostUserId);
        postDto.setReplyPosts(toPostDtos(post.getReplyPosts(), reqUser));
        postDto.setVideo(post.getVideo());

        return postDto;
    }

    public static List<PostDto> toPostDtos(List<Post> posts, User reqUser){
        List<PostDto> postDtos = new ArrayList<>();

        for(Post post:posts){
            PostDto postDto = toReplyPostDto(post, reqUser);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    private static PostDto toReplyPostDto(Post post, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(post.getUser());

        boolean isLiked = PostUtil.isLikedByReqUser(reqUser, post);
        boolean isReposted = PostUtil.isRepostedByReqUser(reqUser, post);

        List<Long> repostUserId = new ArrayList<>();

        for(User user1:post.getRepostUser()){
            repostUserId.add(user1.getId());
        }

        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size());
        postDto.setTotalReposts(post.getRepostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRepost(isReposted);
        postDto.setRepostUsersId(repostUserId);
        postDto.setVideo(post.getVideo());

        return postDto;
    }

}
