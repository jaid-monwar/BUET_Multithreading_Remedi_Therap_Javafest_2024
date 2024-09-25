package therap.medix.circlebackend.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostReplyReques {

    private String content;
    private Long postId;
    private LocalDateTime createdAt;
    private String image;
}
