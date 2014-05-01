package com.kahkong.wikicontacts.dao;

import java.util.List;

import com.kahkong.wikicontacts.model.Contact;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface ContactDao {
	public List<Contact> getContacts(String query);
	
	public List<Contact> getContactsByNumber(String number);
	
	public Contact getContactById(int id);

	public int addContact(Contact contact);
	
	public boolean updateContact(Contact contact);
	
	public boolean removeContact(int id);
}
