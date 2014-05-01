package com.kahkong.wikicontacts.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kahkong.wikicontacts.model.CountryCode;
import com.kahkong.wikicontacts.model.CountryCodesWithSelect;
import com.kahkong.wikicontacts.service.CountryCodeService;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Controller
public class CountryCodeController {
	//	private static Logger log = Logger.getLogger(CountryCodeController.class.getName());

	@Autowired
	private CountryCodeService countryCodeService;

	@RequestMapping(value="/listcountrycodes", method=RequestMethod.GET)
	public @ResponseBody List<CountryCode> listCountryCodes() {
		return countryCodeService.listCountryCodes();
	}

	@RequestMapping(value="/listandselectcountrycodes", method=RequestMethod.GET)
	public @ResponseBody CountryCodesWithSelect listCountryCodesAndSelect(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-FORWARDED-FOR");  
		if (ipAddress==null) {
			ipAddress = request.getRemoteAddr();
		}
		return countryCodeService.listAndSelectCountryCodes(ipAddress);
	}	
}
