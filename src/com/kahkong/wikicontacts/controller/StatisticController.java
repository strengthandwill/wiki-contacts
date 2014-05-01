package com.kahkong.wikicontacts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kahkong.wikicontacts.model.Statistic;
import com.kahkong.wikicontacts.service.StatisticService;

/**
 * 
 * @author Poh Kah Kong
 *
 */
@Controller
public class StatisticController {
	@Autowired
	private StatisticService statisticService;
	
	@RequestMapping("/getstatistic")
	public @ResponseBody Statistic getStatistic() {
		return statisticService.getStatistic();
	}
}
