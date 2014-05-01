package com.kahkong.wikicontacts.dao;

import java.util.List;

import com.kahkong.wikicontacts.model.CountryCode;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface CountryCodeDao {
	public List<CountryCode> listCountryCodes();
	
	public List<CountryCode> getCountryCodes(String country);
}
