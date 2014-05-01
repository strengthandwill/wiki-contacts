package com.kahkong.wikicontacts.service;

import java.util.List;

import com.kahkong.wikicontacts.model.Contact;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface ContactService {
	public Contact getContactByNumber(String number);
	
	public Contact getContactById(int id);
	
	public List<Contact> getContacts(String query);
	
	public int addContact(Contact contact);
	
	public boolean updateContact(Contact contact);
	
	public boolean addContactAndImage(Contact contact, byte[] image);
	
	public boolean updateContactAndImage(Contact contact, byte[] image);
	
	public boolean removeContact(int id);
}
