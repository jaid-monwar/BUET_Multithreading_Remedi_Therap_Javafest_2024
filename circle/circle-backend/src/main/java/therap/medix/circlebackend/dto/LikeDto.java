package therap.medix.circlebackend.dto;

import lombok.Data;

@Data
public class LikeDto {

    private Long id;
    private UserDto user;
    private PostDto post;

}
