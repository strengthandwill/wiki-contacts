package com.kahkong.wikicontacts.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.kahkong.wikicontacts.model.Contact;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Repository
public class ContactDaoImpl extends JdbcDaoSupport implements ContactDao {
	// default value when empty
	// string: null
	// string[]: ""
	// int: -1
	// boolean: false
	
	// sample value when not empty
	// string: "abc"
	// string[]: {"abc", "efg"}
	// int: 1
	// boolean: true
	
	@Override
	public List<Contact> getContacts(String query) {
		String[] queryWords = query.split("\\s+");
		if (queryWords.length>0) {
			StringBuffer sql = new StringBuffer();
			sql.append("SELECT * FROM contacts WHERE");
			List<Object> args = new ArrayList<Object>();
			for (int i=0; i<queryWords.length; i++) {
				sql.append(" (");
				if (queryWords[i].charAt(0)=='+') { // number with country code
					sql.append(" REPLACE(CONCAT(' ', number), ' ', CONCAT(' ', MID(countryCode, 3))) LIKE ?");					
					args.add("% " + queryWords[i].substring(1) + "%");
				} else {
					sql.append(" CONCAT(' ', number) LIKE ?"); // number without country code
					args.add("% " + queryWords[i] + "%");
					sql.append(" OR LOWER(CONCAT(CONCAT(' ', name), CONCAT(' ', tags))) LIKE LOWER(?)"); // name and tags
					args.add("% " + queryWords[i] + "%");					
					sql.append(" OR CONCAT(' ', email) LIKE LOWER(?)"); // email
					args.add("% " + queryWords[i] + "%");
				}			
				if (i<queryWords.length-1) {
					sql.append(") AND");
				} else {
					sql.append(")");
				}
			}
			sql.append(" LIMIT 20");
			return getJdbcTemplate().query(sql.toString(), new ContactMapper(), args.toArray());
		} else {
			return null;
		}
	}
	
	@Override
	public List<Contact> getContactsByNumber(String number) {
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT * FROM contacts WHERE");
		List<Object> args = new ArrayList<Object>();
		if (number.charAt(0)=='+') { // number with country code
			sql.append(" CONCAT(REPLACE(CONCAT(' ', number), ' ', CONCAT(' ', MID(countryCode, 3))), ' ') LIKE ?");					
			args.add("% " + number.substring(1) + " %");
		} else {
			sql.append(" CONCAT(CONCAT(' ', number), ' ') LIKE ?"); // number without country code
			args.add("% " + number + " %");
		}
		return getJdbcTemplate().query(sql.toString(), new ContactMapper(), args.toArray());
	}
	
	@Override
	public Contact getContactById(int id) {
		String sql = "SELECT * FROM contacts WHERE id=?";
		return getJdbcTemplate().queryForObject(sql, new ContactMapper(), new Object[] {id});
	}

	@Override
	public int addContact(final Contact contact) {
		final String sql = "INSERT INTO contacts (name, tags, countryCode, number, spam, description, email, address, website, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		KeyHolder keyHolder = new GeneratedKeyHolder();		
		getJdbcTemplate().update(
				new PreparedStatementCreator() {
					public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});
						ps.setString(1, contact.getName());
						ps.setString(2, arrayToString(contact.getTags()));
						ps.setString(3, contact.getCountryCode());
						ps.setString(4, arrayToString(contact.getNumber()));
						ps.setBoolean(5, contact.isSpam());
						ps.setString(6, contact.getDescription());
						ps.setString(7, arrayToString(contact.getEmail()));
						ps.setString(8, contact.getAddress());
						ps.setString(9, contact.getWebsite());
						ps.setString(10, contact.getImageUrl());
						return ps;
					}
				},
				keyHolder);
		return keyHolder.getKey().intValue();
	}
	
	@Override
	public boolean updateContact(Contact contact) {
		String sql = "UPDATE contacts SET name=?, tags=?, countryCode=?, number=?, spam=?, description=?, email=?, address=?, website=?, imageUrl=? WHERE id=?";
		int rowsAffected = this.getJdbcTemplate().update(	sql, new Object[]{contact.getName(), arrayToString(contact.getTags()),
															contact.getCountryCode(), arrayToString(contact.getNumber()), 
															contact.isSpam(), contact.getDescription(), 
															arrayToString(contact.getEmail()), contact.getAddress(), 
															contact.getWebsite(), contact.getImageUrl(), contact.getId()});
		return rowsAffected>0 ? true:false;
	}

	@Override
	public boolean removeContact(int id) {
		String sql = "DELETE FROM contacts WHERE id=?";
		int rowsAffected = getJdbcTemplate().update(sql, new Object[] {id});
		return rowsAffected>0 ? true:false;
	}

	private static final class ContactMapper implements RowMapper<Contact> {
		@Override
		public Contact mapRow(ResultSet resultSet, int rowNumber) throws SQLException {
			Contact contact = new Contact();
			contact.setId(resultSet.getInt("id"));
			contact.setName(resultSet.getString("name"));
			contact.setTags(stringToArray(resultSet.getString("tags")));
			contact.setCountryCode(resultSet.getString("countryCode"));
			contact.setNumber(stringToArray(resultSet.getString("number")));
			contact.setSpam(resultSet.getBoolean("spam"));
			contact.setDescription(resultSet.getString("description"));
			contact.setEmail(stringToArray(resultSet.getString("email")));
			contact.setAddress(resultSet.getString("address"));
			contact.setWebsite(resultSet.getString("website"));
			contact.setImageUrl(resultSet.getString("imageUrl"));
			return contact;
		}
	}
	
	private static String arrayToString(String[] array) {
		if (array!=null && array.length>0) {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(array[0]);
			for (int i=1; i<array.length; i++) {
				strBuf.append(" " + array[i]);
			}
			return strBuf.toString();
		} else {
			return "";
		}
	}
	
	private static String[] stringToArray(String str) {
		if (str!=null && !str.equals("")) {
			return str.split("\\s+");
		} else {
			return null;
		}
	}
	
//	@Override
//	public Contact getContact(int id) {
//		String sql = "SELECT * FROM contacts WHERE id = ?";		
//		return getJdbcTemplate().queryForObject(sql, new ContactMapper(), new Object[] {id});
//	}
	
//	@Override
//	public List<Contact> listContacts() {
//		String sql = "SELECT * FROM contacts LIMIT 10";
//		return getJdbcTemplate().query(sql, new ContactMapper());
//	}
}
