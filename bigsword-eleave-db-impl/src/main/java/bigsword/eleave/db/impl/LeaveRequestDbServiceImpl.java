package bigsword.eleave.db.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import bigsword.eleave.db.object.model.BsLeaveRequest;
import bigsword.eleave.db.object.model.BsLeaveRequestExample;
import bigsword.eleave.db.persistence.BsLeaveRequestMapper;
import bigsword.eleave.db.util.BuildLeaveRequestCriteria;

import com.bigsword.eleave.db.dto.LeaveRequestDto;
import com.bigsword.eleave.db.spi.LeaveRequestDbService;
import com.bigsword.eleave.db.util.LeaveRequestMapper;
import com.bigsword.eleave.domain.LeaveRequest;

public class LeaveRequestDbServiceImpl implements LeaveRequestDbService {

	private static Logger log = LogManager.getLogger(LeaveRequestDbServiceImpl.class);
	BsLeaveRequestMapper mapper;
	private BsLeaveRequestExample example;

	@Override
	public List<LeaveRequest> getLeaveRequest(LeaveRequestDto leaveRequestDto) {

		List<LeaveRequest> lst = null;
		try {
			BsLeaveRequestExample example = BuildLeaveRequestCriteria.buildCriteria(leaveRequestDto);
			List<BsLeaveRequest> listBsLeaveRequest = mapper.selectByExample(example);
			if (listBsLeaveRequest.size() > 0) {
				lst=new ArrayList<LeaveRequest>();
				for (BsLeaveRequest bsLeaveRequest : listBsLeaveRequest) {
					LeaveRequest leaveRequest =LeaveRequestMapper.populateLeaveRequest(bsLeaveRequest);
					lst.add(leaveRequest);
				}
			}

		} catch (Exception e) {
			log.error(e);
		} finally {
//			ss.close();
		}
		return lst;
	}

	@Override
	public void addLeaveRequest(LeaveRequest leaveRequest) {
		try {
			BsLeaveRequest record = new BsLeaveRequest(); 
			LeaveRequestMapper.populateTbLeaveRequest(leaveRequest,record);
			mapper.insertSelective(record);
		} catch (Exception e) {
			log.error(e);
		} finally {
//			ss.commit();
//			ss.close();
		}
	}

	@Override
	public void updateLeaveRequest(LeaveRequest leaveRequest) {
//		SqlSession ss = SessionFactory.openSession();
		try {
			BsLeaveRequestExample example = new BsLeaveRequestExample();
			BsLeaveRequestExample.Criteria criteria = example.createCriteria();
			criteria.andRequestIdEqualTo(leaveRequest.getRequestId());
			List<BsLeaveRequest> listBsLeaveRequest = mapper.selectByExample(example);
			if(listBsLeaveRequest!=null && listBsLeaveRequest.size()>0){
				BsLeaveRequest record =listBsLeaveRequest.get(0); 
				LeaveRequestMapper.populateTbLeaveRequest(leaveRequest,record);
				mapper.updateByExampleSelective(record, example);
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
	public void deleteLeaveRequest(String Id) {
//		SqlSession ss = SessionFactory.openSession();
		try {
//			ss.getMapper(BsLeaveRequestMapper.class).deleteByPrimaryKey(Id);
			mapper.deleteByPrimaryKey(Id);
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
		LeaveRequestDbServiceImpl.log = log;
	}

	public BsLeaveRequestMapper getMapper() {
		return mapper;
	}

	public void setMapper(BsLeaveRequestMapper mapper) {
		this.mapper = mapper;
	}

	public BsLeaveRequestExample getExample() {
		return example;
	}

	public void setExample(BsLeaveRequestExample example) {
		this.example = example;
	}

}
