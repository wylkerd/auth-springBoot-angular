package com.api.auth.domain.user;

public record RegisterDTO(String login, String password, UserRole role) {
}
