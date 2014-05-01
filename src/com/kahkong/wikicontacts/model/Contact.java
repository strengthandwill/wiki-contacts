package com.kahkong.wikicontacts.model;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public class Contact {
	// default value when empty
	// string: null
	// string[]: null
	// int: -1
	// boolean: false
	
	// sample value when not empty
	// string: "abc"
	// string[]: {"abc", "efg"}
	// int: 1
	// boolean: true
	
	private int id = -1;
	private String name = null;
	private String[] tags = null;
	private String countryCode = null;
	private String[] number = null;
	private boolean spam = false;
	private String description = null;
	private String[] email = null;
	private String address= null;
	private String website = null;
	private String imageUrl = null;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public String getCountryCode() {
		return countryCode;
	}
	
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public String[] getNumber() {
		return number;
	}
	
	public void setNumber(String[] number) {
		this.number = number;
	}
	
	public boolean isSpam() {
		return spam;
	}

	public void setSpam(boolean spam) {
		this.spam = spam;
	}

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String[] getEmail() {
		return email;
	}
	
	public void setEmail(String[] email) {
		this.email = email;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getWebsite() {
		return website;
	}
	
	public void setWebsite(String website) {
		this.website = website;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
