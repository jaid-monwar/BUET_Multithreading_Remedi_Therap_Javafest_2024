package therap.medix.circlebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import therap.medix.circlebackend.dto.LikeDto;
import therap.medix.circlebackend.dto.mapper.LikeDtoMapper;
import therap.medix.circlebackend.exception.PostException;
import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.Like;
import therap.medix.circlebackend.model.User;
import therap.medix.circlebackend.service.LikeService;
import therap.medix.circlebackend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<LikeDto> likePost(@PathVariable Long postId, @RequestHeader ("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likePost(postId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId, @RequestHeader ("Authorization")String jwt) throws UserException, PostException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(postId);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }

}
