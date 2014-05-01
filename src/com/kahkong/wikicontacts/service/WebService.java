package com.kahkong.wikicontacts.service;

/**
 * 
 * @author Poh Kah Kong
 *
 */
public interface WebService {	
	public String getSiteUrl();
	
	public boolean isFromSite(String url);
	
	public String getISOCountryCode(String ipAddress);

}
