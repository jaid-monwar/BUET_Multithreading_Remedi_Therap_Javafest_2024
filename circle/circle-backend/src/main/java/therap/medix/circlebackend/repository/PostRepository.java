package therap.medix.circlebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import therap.medix.circlebackend.model.Post;
import therap.medix.circlebackend.model.User;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

    List<Post> findByRepostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Post t JOIN t.likes l WHERE l.user.id=:userId")
    List<Post> findByLikesUser_id(Long userId);
}
