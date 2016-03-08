package bigsword.eleave.db.impl;

import java.util.Date;
import java.util.List;

import com.bigsword.eleave.db.spi.HolidayDbService;
import com.bigsword.eleave.domain.Holiday;

public class HolidayDbServiceImpl implements HolidayDbService {

	@Override
	public List<Holiday> getHolidayList(int year) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Holiday> getHolidayList(Date fromDate, Date toDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Holiday getHoliday(Date date) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateHoliday(Holiday holiday) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addHoliday(Holiday holiday) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addHoliday(List<Holiday> holidays) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteHoliday(Holiday holiday) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteHoliday(int year) {
		// TODO Auto-generated method stub

	}

}
