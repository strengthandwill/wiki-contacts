package com.kahkong.wikicontacts.controller;

import java.io.IOException;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.kahkong.wikicontacts.service.ImageService;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Controller
public class ImageController {
	@Autowired
	private ImageService imageService;
	
	@RequestMapping(value="uploadimage", method=RequestMethod.POST)
	public @ResponseBody String uploadImage(MultipartHttpServletRequest request) {
		Iterator<String> fileNames = request.getFileNames();
		MultipartFile multipartFile = request.getFile(fileNames.next());
		try {
			String fileName = imageService.processImage(multipartFile.getBytes());
			return fileName!=null ? fileName:ResponseMessage.ERROR;
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseMessage.ERROR;
		}
	}   
}
