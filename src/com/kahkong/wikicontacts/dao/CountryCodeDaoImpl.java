package com.kahkong.wikicontacts.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.kahkong.wikicontacts.model.CountryCode;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Repository
public class CountryCodeDaoImpl extends JdbcDaoSupport implements CountryCodeDao {
	@Override
	public List<CountryCode> listCountryCodes() {
		String sql = "SELECT * FROM countrycodes";
		return getJdbcTemplate().query(sql, new CountryCodeMapper());
	}
	
	@Override
	public List<CountryCode> getCountryCodes(String isoCountryCode) {
		String sql = "SELECT * FROM countrycodes WHERE isoCountryCode=?";
		return getJdbcTemplate().query(sql, new CountryCodeMapper(), new Object[] {isoCountryCode});
	}
	
	private static final class CountryCodeMapper implements RowMapper<CountryCode> {
		@Override
		public CountryCode mapRow(ResultSet resultSet, int rowNumber) throws SQLException {
			CountryCode countryCode = new CountryCode();
			countryCode.setId(resultSet.getInt("id"));
			countryCode.setCountry(resultSet.getString("country"));
			countryCode.setCountryCode(resultSet.getString("countryCode"));
			countryCode.setIsoCountryCode(resultSet.getString("isoCountryCode"));
			return countryCode;
		}

	}
}
