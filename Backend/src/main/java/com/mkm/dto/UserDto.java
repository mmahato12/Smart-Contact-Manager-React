package com.mkm.dto;

public class UserDto {
	public String username;
	
	public String email;
	
	public String password;

	public UserDto(String name, String email, String password) {
		super();
		this.username = name;
		this.email = email;
		this.password = password;
	}

	public String getName() {
		return username;
	}

	public void setName(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "UserDto [name=" + username + ", email=" + email + ", password=" + password + "]";
	}
}
