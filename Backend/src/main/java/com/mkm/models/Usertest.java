package com.mkm.models;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.mkm.dto.UsertestDto;

@Entity
@Table
public class Usertest {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Integer Id;
	
	public String username;
	
	public String email;
	
	public String password;
	
	public String imagePath;
	
	public Usertest() {
		
	}
	
	public Usertest(UsertestDto usertestDto) {
		this.username = usertestDto.username;
		this.email = usertestDto.email;
		this.password = usertestDto.password;
	}

	public Usertest(Integer id, String username, String email, String password) {
		Id = id;
		this.username = username;
		this.email = email;
		this.password = password;
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

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return "Usertest [Id=" + Id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", imagePath=" + imagePath + "]";
	}
	
}
