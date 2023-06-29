package com.mkm.dao;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkm.models.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer>{
	public List <Contact> findByUser_id(Integer Id);
	Optional<Contact> findByName(String name);
}