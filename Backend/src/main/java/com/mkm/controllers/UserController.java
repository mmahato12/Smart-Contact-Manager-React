package com.mkm.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.mkm.dao.ContactRepository;
import com.mkm.dao.UserRepository;
import com.mkm.dto.ContactDto;
import com.mkm.models.Contact;
import com.mkm.models.User;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	ContactRepository contactRepository;
	@Autowired
	UserRepository userRepository;

	@PostMapping("/contacts")
	public void Addcontact(@RequestBody ContactDto contactDto) {
		System.out.println("Hello" + contactDto);
		Contact contact = new Contact(contactDto);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Optional <User> user = userRepository.findByUsername(auth.getName());
		contact.setUser(user.get());
		contactRepository.save(contact);
	}

	@PutMapping("/contacts/{contactId}")
	public void Updatecontact(@RequestBody ContactDto contactDto, @PathVariable("contactId") Integer contactId) {
		Optional<Contact> contact = contactRepository.findById(contactId);
		System.out.println(contactId);
		
		contact.get().setName(contactDto.getName());
		contact.get().setPhone(contactDto.getPhone());
		contact.get().setDescription(contactDto.getDescription());
		contactRepository.save(contact.get());
	}

	@GetMapping("/contacts")
	public List<Contact> contacts() {
		List <Contact> list = this.contactRepository.findAll();
		return list;
	}

	@DeleteMapping("/contacts/{contactId}")
	public void Deletecontact(@PathVariable("contactId") Integer contactId) {
		contactRepository.deleteById(contactId);
	}

	@GetMapping("/contacts/{contactId}")
	public Contact contacts(@PathVariable("contactId") Integer contactId) {
		Optional<Contact> data = this.contactRepository.findById(contactId);
		return data.isPresent() ? data.get() : null;
	}
}
