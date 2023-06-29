package com.mkm.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
	public static void saveFile(String fileName, MultipartFile multipartFile) throws IOException {
//		Path uploadPath = Path.of(uploadDir);
		Path workingDirectory = Paths.get("");
        String absolutePath = workingDirectory.toAbsolutePath().toString();
        System.out.println("Present Working Directory: " + absolutePath);
        Path targetPath = Paths.get(absolutePath).getParent();
        System.out.println("Present Working Directory: " + targetPath);
        System.out.println("Present Working Directory: " + targetPath.getParent());
        Path uploadPath = Path.of(targetPath + "/frontend/public");
        
        System.out.println(Files.exists((uploadPath)));
        if(!Files.exists(uploadPath))
        	Files.createDirectories(uploadPath);
        
		if(!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}
		
		try {
			Path filePath = uploadPath.resolve(fileName);
			System.out.println(filePath);
			Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new IOException("Could not save file: " + fileName, e);
		}
	}
	
	public static void deleteFile(String filePath) throws IOException {
		Path path = Path.of(filePath);
		System.out.println(filePath);
		if(Files.exists(path)) {
			Files.delete(path);
		}
	}
}
