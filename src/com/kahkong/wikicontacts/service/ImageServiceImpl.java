package com.kahkong.wikicontacts.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahkong.wikicontacts.model.Contact;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Service
public class ImageServiceImpl implements ImageService {
	@Autowired
	private ContactService contactService;

	@Autowired
	private WebService webService;

	private int imageSize;
	private String outputPath;
	private String outputFormat;
	
	public String processImage(byte[] image) {
		return processImage(image, -1);
	}

	public String processImage(byte[] image, int id) {
		String fileName = getFileName();
		if (!writeImage(image, fileName)) {
			return null;
		}
		if (id!=-1) {
			removeImage(id);
		}
		return webService.getSiteUrl() + "/contacts/img/" + fileName;		
	}

	private boolean writeImage(byte[] image, String fileName) {
		try {
			File output = new File(outputPath);	
			output.mkdirs();				
			File file = new File(output, fileName);
			FileUtils.writeByteArrayToFile(file, image);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}				
	}

	private boolean removeImage(int id) {
		Contact contact = contactService.getContactById(id);
		String imageUrl = contact.getImageUrl();
		if (imageUrl==null || imageUrl.equals("")) {
			return false;
		}
		return removeImage(imageUrl);
	}
	
	public boolean removeImage(String imageUrl) {
		String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1, imageUrl.length());
		File file = new File(outputPath, fileName);
		if (!file.exists()) {
			return true;
		}
		return file.delete();		
	}

	private String getFileName() {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(outputFormat);
		return simpleDateFormat.format(new Date()) + ".png";
	}

	// getters and setters
	public int getImageSize() {
		return imageSize;
	}

	public void setImageSize(int imageSize) {
		this.imageSize = imageSize;
	}

	public String getOutputPath() {
		return outputPath;
	}

	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}

	public String getOutputFormat() {
		return outputFormat;
	}

	public void setOutputFormat(String outputFormat) {
		this.outputFormat = outputFormat;
	}

	//	private BufferedImage cropCenterImage(BufferedImage image) {
	//		int width = image.getWidth();
	//		int height = image.getHeight();
	//		int size, x, y;
	//		if (width>height) {
	//			size = height;
	//			x = (width-height)/2;
	//			y = 0;
	//		} else {
	//			size = width;
	//			x = 0;
	//			y = (height-width)/2;
	//		}
	//		return image.getSubimage(x, y, size, size);
	//	}
	//
	//	private BufferedImage resizeImage(BufferedImage image, int width, int height){
	//		BufferedImage resultImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
	//		Graphics2D g = resultImg.createGraphics();
	//		g.drawImage(image, 0, 0, width, height, null);
	//		g.dispose();
	//		return resultImg;
	//	}	
}
