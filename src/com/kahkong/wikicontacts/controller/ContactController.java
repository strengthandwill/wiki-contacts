package com.kahkong.wikicontacts.controller;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;

import com.kahkong.wikicontacts.model.Contact;
import com.kahkong.wikicontacts.model.ContactAndImage;
import com.kahkong.wikicontacts.service.ContactService;
import com.kahkong.wikicontacts.service.ImageService;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Controller
public class ContactController {
	@Autowired
	private ContactService contactService;

	@Autowired
	private ImageService imageService;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(byte[].class, new ByteArrayMultipartFileEditor());
		binder.registerCustomEditor(Contact.class, new ContactMultipartFileEditor());
	}

	@RequestMapping("/contacts")
	public String index() {
		return "main";
	}

	@RequestMapping(value="/getcontacts/{query}", method=RequestMethod.GET)
	public @ResponseBody List<Contact> getContacts(@PathVariable String query) {
		return contactService.getContacts(query);
	}

	@RequestMapping(value="/getcontact/{number}", method=RequestMethod.GET)
	public @ResponseBody Contact getContact(@PathVariable String number) {
		return contactService.getContactByNumber(number);
	}

	@RequestMapping(value="/addcontact", method=RequestMethod.POST)
	public @ResponseBody String addContact(@RequestBody Contact contact) {
		return contactService.addContact(contact)>0? ResponseMessage.SUCCESS:ResponseMessage.ERROR;
	}

	@RequestMapping(value="/updatecontact", method=RequestMethod.POST)
	public @ResponseBody String updateContact(@RequestBody Contact contact) {
		return contactService.updateContact(contact)? ResponseMessage.SUCCESS:ResponseMessage.ERROR;
	}	

	@RequestMapping(value = "/addcontactandimage", method = RequestMethod.POST)    
	public @ResponseBody String addContactAndImage(ContactAndImage contactAndImage, BindingResult result) {            
		if (result.hasErrors()) {        
			return ResponseMessage.ERROR;
		}
		return contactService.addContactAndImage(contactAndImage.getContact(), contactAndImage.getImage())? ResponseMessage.SUCCESS:ResponseMessage.ERROR;
	}

	@RequestMapping(value = "/updatecontactandimage", method = RequestMethod.POST)    
	public @ResponseBody String updateContactAndImage(ContactAndImage contactAndImage, BindingResult result) {            
		if (result.hasErrors()) {        
			return ResponseMessage.ERROR;
		}
		return contactService.updateContactAndImage(contactAndImage.getContact(), contactAndImage.getImage())? ResponseMessage.SUCCESS:ResponseMessage.ERROR;
	}	

	@RequestMapping(value="/removecontact/{id}", method=RequestMethod.GET)
	public @ResponseBody String removeContact(@PathVariable int id) {
		return contactService.removeContact(id) ? ResponseMessage.SUCCESS:ResponseMessage.ERROR;
	}

	@RequestMapping("/test")
	public String test() {
		return "test";
	}

	private static final class ContactMultipartFileEditor extends PropertyEditorSupport {
		@Override
		public String getAsText() {
			Contact contact = (Contact) getValue();
			ObjectMapper objectMapper = new ObjectMapper();		
			try {
				return objectMapper.writeValueAsString(contact);
			} catch (JsonGenerationException e) {
				e.printStackTrace();
				return null;
			} catch (JsonMappingException e) {
				e.printStackTrace();
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		}

		@Override
		public void setAsText(String text) throws IllegalArgumentException {
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				setValue(objectMapper.readValue(text, Contact.class));
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	
	}
}
