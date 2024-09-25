package therap.medix.circlebackend.service;

import therap.medix.circlebackend.exception.UserException;
import therap.medix.circlebackend.model.User;

import java.util.List;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public User updateUser(Long userId, User user) throws UserException;

    public User followUser(Long userId, User user) throws UserException;

    public List<User> searchUser(String query);

}
