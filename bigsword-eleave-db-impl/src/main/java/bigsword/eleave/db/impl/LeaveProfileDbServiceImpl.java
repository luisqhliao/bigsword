package bigsword.eleave.db.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import bigsword.eleave.db.object.model.BsLeaveManagement;
import bigsword.eleave.db.object.model.BsLeaveManagementExample;
import bigsword.eleave.db.persistence.BsLeaveManagementMapper;

import com.bigsword.eleave.db.spi.LeaveProfileDbService;
import com.bigsword.eleave.domain.LeaveProfile;

public class LeaveProfileDbServiceImpl implements LeaveProfileDbService {

	private static Logger log = LogManager.getLogger(LeaveProfileDbServiceImpl.class);
	private Date date = new Date();
	
	BsLeaveManagementMapper mapper;
	private BsLeaveManagementExample example;

	@Override
	public LeaveProfile getLeaveProfile(String userId, String leaveType, String year) {
		LeaveProfile leaveProfile = null;
//		SqlSession ss = SessionFactory.openSession();

		try {
			BsLeaveManagementExample example = new BsLeaveManagementExample();
			BsLeaveManagementExample.Criteria criteria = example.createCriteria();
			criteria.andUserIdEqualTo(userId).andLeaveTypeEqualTo(leaveType).andYearOfEqualTo(year);
//			criteria.andUserIdEqualTo(userId).andLeaveTypeEqualTo(leaveType).andYearOfEqualTo(yearFmt.format(date));
//			List<BsLeaveManagement> lst = ss.getMapper(BsLeaveManagementMapper.class).selectByExample(example);
//			String aa=null;
			List<BsLeaveManagement> lst = mapper.selectByExample(example);
			if (lst.size() > 0) {
				leaveProfile = new LeaveProfile();
				leaveProfile.setStaffId(userId);
				leaveProfile.setYearOfOperation(lst.get(0).getYearOf());
				Map<String, BigDecimal> map = new HashMap<String, BigDecimal>();
				map.put(leaveType, lst.get(0).getLeaveE());
				leaveProfile.setOrignalLeaves(map);
				map = new HashMap<String, BigDecimal>();
				map.put(leaveType, lst.get(0).getLeaveO());
				leaveProfile.setOutstandingLeaves(map);
			}
		} catch (Exception e) {		
			log.error(e);
		} finally {
//			ss.close();
		}
		// TODO Auto-generated method stub
		return leaveProfile;
	}

	@Override
	public void updateLeaveProfile(LeaveProfile leaveProfile) {
		// TODO Auto-generated method stub
//		SqlSession ss = SessionFactory.openSession();
		try {
			
			for (String leaveType : leaveProfile.getOrignalLeaves().keySet()) {
				BsLeaveManagementExample example = new BsLeaveManagementExample();
				BsLeaveManagementExample.Criteria criteria = example.createCriteria();
				criteria.andUserIdEqualTo(leaveProfile.getStaffId()).andYearOfEqualTo(leaveProfile.getYearOfOperation()).andLeaveTypeEqualTo(leaveType);
				
				BsLeaveManagement record = new BsLeaveManagement();
				record.setLeaveE(leaveProfile.getOrignalLeaves().get(leaveType));
				record.setLeaveO(leaveProfile.getOutstandingLeaves().get(leaveType));
				record.setUpdateDate(date);
				record.setUpdateBy(null);
				mapper.updateByExampleSelective(record, example);
			}
			
//			BsLeaveManagement record = new BsLeaveManagement();
//			record.setLeaveO(Double.valueOf(String.valueOf(days)));
//			record.setUpdateDate(date);
////			ss.getMapper(BsLeaveManagementMapper.class).updateByExampleSelective(record, example);
//			mapper.updateByExampleSelective(record, example);
		} catch (Exception e) {
//			ss.rollback();
			log.error(e);
		} finally {
//			ss.commit();
//			ss.close();
		}
	}

	@Override
	public void addLeaveProfile(LeaveProfile leaveProfile) {
		// TODO Auto-generated method stub
//		SqlSession ss = SessionFactory.openSession();
		try {
			for (String leaveType : leaveProfile.getOrignalLeaves().keySet()) {
				BsLeaveManagement record = new BsLeaveManagement();
				record.setUserId(leaveProfile.getStaffId());
				record.setYearOf(leaveProfile.getYearOfOperation());
				record.setLeaveType(leaveType);
				record.setLeaveE(leaveProfile.getOrignalLeaves().get(leaveType));
				record.setLeaveO(leaveProfile.getOutstandingLeaves().get(leaveType));
				record.setUpdateDate(date);
				record.setCreateBy(null);
				record.setCreateDate(date);
				record.setUpdateBy(null);
//				ss.getMapper(BsLeaveManagementMapper.class).insertSelective(record);
				mapper.insertSelective(record);
			}
		} catch (Exception e) {
//			ss.rollback();
			log.error(e);
		} finally {
//			ss.commit();
//			ss.close();
		}

	}

	@Override
	public void deleteLeaveProfile(String userId, String year) {
		// TODO Auto-generated method stub
//		SqlSession ss = SessionFactory.openSession();
		try {
			BsLeaveManagementExample example = new BsLeaveManagementExample();
			BsLeaveManagementExample.Criteria criteria = example.createCriteria();
			criteria.andUserIdEqualTo(userId).andYearOfEqualTo(year);
//			ss.getMapper(BsLeaveManagementMapper.class).deleteByExample(example);
			mapper.deleteByExample(example);
		} catch (Exception e) {
//			ss.rollback();
			log.error(e);
		} finally {
//			ss.commit();
//			ss.close();
		}
	}

	public static Logger getLog() {
		return log;
	}

	public static void setLog(Logger log) {
		LeaveProfileDbServiceImpl.log = log;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public BsLeaveManagementMapper getMapper() {
		return mapper;
	}

	public void setMapper(BsLeaveManagementMapper mapper) {
		this.mapper = mapper;
	}

	public BsLeaveManagementExample getExample() {
		return example;
	}

	public void setExample(BsLeaveManagementExample example) {
		this.example = example;
	}


}
