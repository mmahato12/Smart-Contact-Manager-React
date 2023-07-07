package com.mkm.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mkm.models.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer>{
	public List <Contact> findByUser_id(Integer Id);
	Optional<Contact> findByName(String name);
	
	public List <Contact> findByUser_id(Integer Id, Pageable pageable);

/*	
	@Query("SELECT p FROM Contact p WHERE " +
            "p.name LIKE CONCAT('%',:query, '%')" +
            "And user_id=:Id")
*/
//	List<Contact> searchProducts(String query, Integer Id);
	List<Contact> findByUser_idAndNameContainingIgnoreCase(Integer Id, String name, Pageable pageable);
}