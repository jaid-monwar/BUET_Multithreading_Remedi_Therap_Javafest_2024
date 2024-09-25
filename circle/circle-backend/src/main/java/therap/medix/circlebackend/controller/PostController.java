package therap.medix.circlebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import therap.medix.circlebackend.dto.PostDto;
import therap.medix.circlebackend.dto.mapper.PostDtoMapper;
import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.request.PostReplyReques;
import therap.medix.circlebackend.response.ApiResponse;
import therap.medix.circlebackend.service.PostService;
import therap.medix.circlebackend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestBody Post req, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.createPost(req, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);

        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<PostDto> replyPost(@RequestBody PostReplyReques req, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.createdReply(req, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);

        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PutMapping("/{postId}/repost")
    public ResponseEntity<PostDto> repost(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.repost(postId, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);

        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> findPostById(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.findById(postId);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);

        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        postService.deletePostById(postId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Post deleted successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getAllPosts(@RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.findAllPost();
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getUsersAllPosts(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.getUserPost(user);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<PostDto>> findPostByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.findByLikesContainsUser(user);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

}
