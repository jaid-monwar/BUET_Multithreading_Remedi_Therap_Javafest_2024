package com.remedi.jwt.backend.mappers;

import com.remedi.jwt.backend.entites.User;
import com.remedi.jwt.backend.dtos.SignUpDto;
import com.remedi.jwt.backend.dtos.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
