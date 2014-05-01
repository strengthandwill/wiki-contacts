package com.kahkong.wikicontacts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahkong.wikicontacts.dao.ContactDao;
import com.kahkong.wikicontacts.model.Contact;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Service
public class ContactServiceImpl implements ContactService {
	@Autowired
	private ImageService imageService;
	
	@Autowired
	private WebService webService;
	
	@Autowired
	private ContactDao contactDao;
	
	@Override
	public List<Contact> getContacts(String query) {
		return contactDao.getContacts(query);
	}
	
	@Override
	public Contact getContactByNumber(String number) {
		List<Contact> contacts = contactDao.getContactsByNumber(number);
		if (contacts!=null && contacts.size()>0) {
			return contacts.get(0);
		} else {
			return null;
		}
	}
	
	@Override
	public Contact getContactById(int id) {
		return contactDao.getContactById(id);
	}

	@Override
	public int addContact(Contact contact) {
		return contactDao.addContact(contact);
	}
	
	@Override
	public boolean updateContact(Contact contact) {
		return contactDao.updateContact(contact);
	}
	
	@Override
	public boolean addContactAndImage(Contact contact, byte[] image) {
		if (image!=null) {
			String imageUrl = imageService.processImage(image);
			if (imageUrl==null) {
				return false;
			}
			contact.setImageUrl(imageUrl);
		}
		return addContact(contact)>0? true:false;
	}
	
	@Override
	public boolean updateContactAndImage(Contact contact, byte[] image) {
		if (image!=null) {
			String imageUrl = contact.getImageUrl();
			if (imageUrl!=null) {
				imageService.removeImage(imageUrl);
			}			
			imageUrl = imageService.processImage(image);
			if (imageUrl==null) {
				return false;
			}
			contact.setImageUrl(imageUrl);
		}
		return updateContact(contact);
	}

	@Override
	public boolean removeContact(int id) {
		Contact contact = getContactById(id);	
		if (!contactDao.removeContact(id)) {
			return false;
		}
		String imageUrl = contact.getImageUrl();
		if (imageUrl==null || !webService.isFromSite(imageUrl)) {
			return true;
		}
		return imageService.removeImage(imageUrl);
	}
}
