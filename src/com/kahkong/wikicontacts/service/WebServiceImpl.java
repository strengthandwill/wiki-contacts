package com.kahkong.wikicontacts.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Service
public class WebServiceImpl implements WebService {
	// getters and setters
	private String liveUrl;
	private String localhostUrl;
	private boolean live;
	private String ipLocatorUrl;
	private String ipLocatorPattern;
	
	public boolean isFromSite(String url) {		
		try {
			if ((new URL(url).getHost().equals((new URL(getSiteUrl())).getHost()))) {
				return true;
			} else {
				return false;
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public String getISOCountryCode(String ipAddress) {		
		HttpURLConnection connection = null;
		BufferedReader reader = null;
		try {
			URL url = new URL(ipLocatorUrl + "?ip=" + ipAddress);
			connection = (HttpURLConnection) url.openConnection();
			connection.connect();
			InputStream is = connection.getInputStream();
			if (connection.getResponseCode() == 200) {				
				reader = new BufferedReader(new InputStreamReader(is));	
				Pattern pattern = Pattern.compile(ipLocatorPattern);
				Matcher matcher = pattern.matcher(reader.readLine());
				matcher.find();
				String match = matcher.group(1);
				if (match==null || match.equals("XX")) {
					return null;
				} else {
					return match;
				}					
			} else {
				return null;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				reader.close();
				connection.disconnect();
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		}
	}
	
	public String getSiteUrl() {
		if (live) {
			return liveUrl;
		} else {
			return localhostUrl;
		}
	}

	// getters and setters
	public String getIpLocatorUrl() {
		return ipLocatorUrl;
	}
	
	public String getLocalhostUrl() {
		return localhostUrl;
	}

	public void setLocalhostUrl(String localhostUrl) {
		this.localhostUrl = localhostUrl;
	}

	public String getLiveUrl() {
		return liveUrl;
	}

	public void setLiveUrl(String liveUrl) {
		this.liveUrl = liveUrl;
	}

	public boolean isLive() {
		return live;
	}

	public void setLive(boolean live) {
		this.live = live;
	}		

	public void setIpLocatorUrl(String ipLocatorUrl) {
		this.ipLocatorUrl = ipLocatorUrl;
	}

	public String getIpLocatorPattern() {
		return ipLocatorPattern;
	}

	public void setIpLocatorPattern(String ipLocatorPattern) {
		this.ipLocatorPattern = ipLocatorPattern;
	}
}
