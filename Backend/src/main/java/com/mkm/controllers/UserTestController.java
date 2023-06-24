package com.mkm.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import com.mkm.dao.UsertestRepository;
import com.mkm.dto.ContactDto;
import com.mkm.dto.UsertestDto;
import com.mkm.models.Contact;
import com.mkm.models.Usertest;
import com.mkm.services.FileUploadUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/usertest")
public class UserTestController {
	
	private final UsertestRepository usertestRepository;
	
	@Autowired
    public UserTestController(UsertestRepository usertestRepository) {
        this.usertestRepository = usertestRepository;
    }

    @PostMapping(value="/data", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Usertest> registerUser(@RequestPart("Image") MultipartFile image, @RequestPart("data") UsertestDto usertestDto) throws IOException {
    	System.out.println("Hello");
        Usertest usertest = new Usertest(usertestDto);

        String imageName = StringUtils.cleanPath(image.getOriginalFilename());
        String uploadDir = "uploadFiles/" + usertest.getUsername();
        String filePath = uploadDir + "/" + imageName;
        
        FileUploadUtil.saveFile(uploadDir, imageName, image);
        
        usertest.setImagePath(filePath);
        usertestRepository.save(usertest);

        return ResponseEntity.ok(usertest);
    }
    
    @PutMapping("/data")
	public ResponseEntity<Usertest> Updatecontact(@RequestPart("Image") MultipartFile image, @RequestPart("data") UsertestDto usertestDto) throws IOException {
		Usertest usertest = new Usertest(usertestDto);

        String imageName = StringUtils.cleanPath(image.getOriginalFilename());
        String uploadDir = "uploadFiles/" + usertest.getUsername();
        String filePath = uploadDir + "/" + imageName;
        
        FileUploadUtil.saveFile(uploadDir, imageName, image);
        
        usertest.setImagePath(filePath);
        usertestRepository.save(usertest);

        return ResponseEntity.ok(usertest);
	}

	@GetMapping("/data")
	public List<Usertest> contacts() {
		List<Usertest> list = this.usertestRepository.findAll();
		return list;
	}

	@DeleteMapping("/data/{userId}")
	public void Deletecontact(@PathVariable("userId") Integer userId) throws IOException {
		Optional<Usertest> data = this.usertestRepository.findById(userId);
		
		FileUploadUtil.deleteFile(data.get().getImagePath());
		usertestRepository.deleteById(userId);
	}

	@GetMapping("/data/{userId}")
	public Usertest contacts(@PathVariable("userId") Integer userId) {
		Optional<Usertest> data = this.usertestRepository.findById(userId);
		return data.isPresent() ? data.get() : null;
	}
}
