package com.kahkong.wikicontacts.service;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface ImageService {
	public String processImage(byte[] bytes);
	
	public String processImage(byte[] bytes, int id);
	
	public boolean removeImage(String imageUrl);
}
