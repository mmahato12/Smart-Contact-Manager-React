package com.mkm.dto;

import org.springframework.web.multipart.MultipartFile;

public class UsertestDto {
	public Integer Id;
	
	public String username;
	
	public String email;
	
	public String password;
	
	public MultipartFile profilePicture;
	
	

	public UsertestDto(Integer id, String username, String email, String password, MultipartFile profilePicture) {
		super();
		Id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.profilePicture = profilePicture;
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
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

	public MultipartFile getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(MultipartFile profilePicture) {
		this.profilePicture = profilePicture;
	}
}