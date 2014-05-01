package com.kahkong.wikicontacts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahkong.wikicontacts.dao.StatisticDao;
import com.kahkong.wikicontacts.model.Statistic;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Service
public class StatisticServiceImpl implements StatisticService {
	@Autowired
	private StatisticDao statisticDao;
	
	@Override
	public Statistic getStatistic() {
		return statisticDao.getStatistic();
	}
}
