package com.mkm.dto;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

public class ContactDto {
	Integer cId;
	String name;
	String phone;
	String description;
	
	public ContactDto(String name, String phone, String description) {
		super();
		this.name = name;
		this.phone = phone;
		this.description = description;
	}
	
	public Integer getcId() {
		return cId;
	}
	public void setcId(Integer cId) {
		this.cId = cId;
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
	
	@Override
	public String toString() {
		return "ContactDto [cId=" + cId + ", name=" + name + ", phone=" + phone + ", description=" + description + "]";
	}
}
