package com.kahkong.wikicontacts.model;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public class ContactAndImage {
	private Contact contact;
	private byte[] image;
	
	public Contact getContact() {
		return contact;
	}
	
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	
	public byte[] getImage() {
		return image;
	}
	
	public void setImage(byte[] image) {
		this.image = image;
	}		
}