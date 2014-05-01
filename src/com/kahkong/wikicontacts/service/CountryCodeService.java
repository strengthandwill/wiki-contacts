package com.kahkong.wikicontacts.service;

import java.util.List;

import com.kahkong.wikicontacts.model.CountryCode;
import com.kahkong.wikicontacts.model.CountryCodesWithSelect;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface CountryCodeService {
	public List<CountryCode> listCountryCodes();
	
	public CountryCode getCountryCode(String isoCountryCode);
	
	public CountryCodesWithSelect listAndSelectCountryCodes(String ipAddress);
}
