package com.mkm.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mkm.dao.ContactRepository;
import com.mkm.dao.UserRepository;
import com.mkm.dto.ContactDto;
import com.mkm.models.Contact;
import com.mkm.models.User;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class HomeController {
	@Autowired
	ContactRepository contactRepository;
	@Autowired
	UserRepository userRepository;
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/contacts")
	public void Addcontact(@RequestBody ContactDto contactDto) {
		System.out.println("Hello" + contactDto);
		Contact contact = new Contact(contactDto);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Optional <User> user = userRepository.findByUsername(auth.getName());
		contact.setUser(user.get());
		contactRepository.save(contact);
	}

	@PreAuthorize("hasRole('USER')")
	@PutMapping("/contacts/{contactId}")
	public void Updatecontact(@RequestBody ContactDto contactDto, @PathVariable("contactId") Integer contactId) {
		Optional<Contact> contact = contactRepository.findById(contactId);
		System.out.println(contactId);
		
		contact.get().setName(contactDto.getName());
		contact.get().setPhone(contactDto.getPhone());
		contact.get().setDescription(contactDto.getDescription());
		contactRepository.save(contact.get());
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/contacts")
	public List<Contact> contacts(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            					  @RequestParam(value = "pageSize", defaultValue = "3", required = false) int pageSize,
            					  @RequestParam(value = "sortBy", defaultValue = "name", required = false) String sortBy,
            			          @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            			          @RequestParam(value = "query", defaultValue = "", required = false) String query) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Optional <User> user = userRepository.findByUsername(auth.getName());
		
		System.out.println(pageNo + " " + pageSize + " " + sortBy + " " + sortDir);
		
		List <Contact> list = this.contactRepository.findByUser_id(user.get().getId());
		
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
//		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.unsorted());
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		
//		Page <Contact> contacts = contactRepository.findAll(pageable);
//		List <Contact> contacts = contactRepository.findByUser_id(user.get().getId(), pageable);
		List <Contact> contacts = contactRepository.findByUser_idAndNameContainingIgnoreCase(user.get().getId(), query, pageable);
		
//		List <Contact> listOfContacts = contacts.getContent();
		
//		return listOfContacts;
		return contacts;
	}
	
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/contacts/{contactId}")
	public void Deletecontact(@PathVariable("contactId") Integer contactId) {
		contactRepository.deleteById(contactId);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/contacts/{contactId}")
	public Contact contacts(@PathVariable("contactId") Integer contactId) {
		Optional<Contact> data = this.contactRepository.findById(contactId);
		return data.isPresent() ? data.get() : null;
	}
}
