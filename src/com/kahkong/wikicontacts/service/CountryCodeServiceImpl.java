package com.kahkong.wikicontacts.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahkong.wikicontacts.dao.CountryCodeDao;
import com.kahkong.wikicontacts.model.CountryCode;
import com.kahkong.wikicontacts.model.CountryCodesWithSelect;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Service
public class CountryCodeServiceImpl implements CountryCodeService {	
	@Autowired
	private WebService webService;
	
	@Autowired
	private CountryCodeDao countryCodeDao;

	@Override
	public List<CountryCode> listCountryCodes() {
		return countryCodeDao.listCountryCodes();
	}
	
	@Override
	public CountryCode getCountryCode(String ipAddress) {	
		String isoCountryCode = webService.getISOCountryCode(ipAddress);
		if (isoCountryCode==null) {
			return null;
		}
		List<CountryCode> countryCodes = countryCodeDao.getCountryCodes(isoCountryCode);
		if (countryCodes==null || countryCodes.isEmpty()) {
			return null;
		}
		return countryCodes.get(0);
	}
	
	@Override
	public CountryCodesWithSelect listAndSelectCountryCodes(String ipAddress) {
		List<CountryCode> countryCodes = countryCodeDao.listCountryCodes();
		String isoCountryCode = webService.getISOCountryCode(ipAddress);
		CountryCode select = null;
		if (isoCountryCode!=null) {			
			Iterator<CountryCode> iterator = countryCodes.iterator();
			while (iterator.hasNext()) {
				CountryCode countryCode = iterator.next();
				if (countryCode.getIsoCountryCode().equals(isoCountryCode)) {
					select = countryCode;
					break;
				}
			}		
		}
		CountryCodesWithSelect countryCodesWithSelect = new CountryCodesWithSelect();
		countryCodesWithSelect.setCountryCodes(countryCodes);
		countryCodesWithSelect.setSelect(select);
		return countryCodesWithSelect;
	}	
}
