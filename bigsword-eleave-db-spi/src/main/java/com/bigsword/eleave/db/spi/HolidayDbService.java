package com.bigsword.eleave.db.spi;

import java.util.Date;
import java.util.List;

import com.bigsword.eleave.domain.Holiday;

public interface HolidayDbService {
	public List<Holiday> getHolidayList(int year);
	public List<Holiday> getHolidayList(Date fromDate, Date toDate);
	public Holiday getHoliday(Date date);
	public void updateHoliday(Holiday holiday);
	public void addHoliday(Holiday holiday);
	public void addHoliday(List<Holiday> holidays);
	public void deleteHoliday(Holiday holiday);
	public void deleteHoliday(int year);
}
