package com.mkm.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mkm.dao.UserRepository;
import com.mkm.dto.ContactDto;
import com.mkm.dto.UserDto;
import com.mkm.models.Contact;
import com.mkm.models.User;
import com.mkm.services.FileUploadUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private final UserRepository userRepository;
	
	@Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
	@PreAuthorize("hasRole('USER')")
    @PutMapping("/data/{userId}")
	public ResponseEntity<User> UpdateUser(@RequestPart(value="Image", required=false) MultipartFile image, @RequestPart("data") UserDto userDto, @PathVariable("userId") Integer userId) throws IOException {
		Optional<User> user = userRepository.findById(userId);
		System.out.println(userId);
		System.out.println(userDto);
		
//		user.get().setEmail(userDto.email);
//		user.get().setUsername(userDto.username);
		if(image != null) {
			String imageName = StringUtils.cleanPath(image.getOriginalFilename());
			String filePath = imageName;
			
			System.out.println("Image null");
        
			FileUploadUtil.saveFile(imageName, image);
			user.get().setImagePath(filePath);
		}
//		System.out.println(user.get());
        userRepository.save(user.get());

        return ResponseEntity.ok(user.get());
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/data")
	public List<User> Users() {
		List<User> list = this.userRepository.findAll();
		return list;
	}
	
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/data/{userId}")
	public void DeleteUser(@PathVariable("userId") Integer userId) throws IOException {
		Optional<User> data = this.userRepository.findById(userId);
		
		FileUploadUtil.deleteFile(data.get().getImagePath());
		userRepository.deleteById(userId);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/data/{userId}")
	public User Users(@PathVariable("userId") Integer userId) {
		Optional<User> data = this.userRepository.findById(userId);
		data.get().setPassword("");
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Optional <User> user = userRepository.findByUsername(auth.getName());
		
		if(user.get().getId() != userId)
			return null;
		return data.isPresent() ? data.get() : null;
	}
}
