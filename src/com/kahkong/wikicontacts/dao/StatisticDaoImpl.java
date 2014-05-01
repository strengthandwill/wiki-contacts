package com.kahkong.wikicontacts.dao;

import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.kahkong.wikicontacts.model.Statistic;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Repository
public class StatisticDaoImpl extends JdbcDaoSupport implements StatisticDao {
	@Override
	public Statistic getStatistic() {
		Statistic statistic = new Statistic();
		String sql = "SELECT COUNT(*) FROM contacts";		 
		statistic.setUsersCount(getJdbcTemplate().queryForObject(sql, Integer.class));
		sql = "SELECT COUNT(*) FROM (SELECT DISTINCT(countryCode) from contacts) AS countries";	 
		statistic.setCountriesCount(getJdbcTemplate().queryForObject(sql, Integer.class));
		return statistic;
	}
}
