package com.mkm.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mkm.dto.ContactDto;


@Entity
@Table
public class Contact {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Integer id;
	String name;
	String phone;
	String description;
	
	@JsonIgnore
	@ManyToOne
	private User user;
	
	public Contact() {
		
	}
	
	public Contact(ContactDto contactDto) {
		this.name = contactDto.getName();
		this.phone = contactDto.getPhone();
		this.description = contactDto.getDescription();
	}

	public Integer getId() {
		return id;
	}

	public void setcId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public boolean equals(Object obj) {
		return this.id == ((Contact)obj).getId();
	}

	@Override
	public String toString() {
		return "Contact [id=" + id + ", name=" + name + ", phone=" + phone + ", description=" + description + ", user="
				+ user + "]";
	}
	
	
}
