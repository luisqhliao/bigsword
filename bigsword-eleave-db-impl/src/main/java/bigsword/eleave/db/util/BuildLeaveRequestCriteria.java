package bigsword.eleave.db.util;

import org.apache.commons.lang.StringUtils;

import bigsword.eleave.db.object.model.BsLeaveRequestExample;

import com.bigsword.eleave.db.dto.LeaveRequestDto;

public class BuildLeaveRequestCriteria {
	public static BsLeaveRequestExample buildCriteria(LeaveRequestDto leaveRequestDto){
		if(leaveRequestDto==null) return null;
		BsLeaveRequestExample example = new BsLeaveRequestExample();
		BsLeaveRequestExample.Criteria criteria = example.createCriteria();
		if(StringUtils.isNotEmpty(leaveRequestDto.getRequestorId())){
			criteria.andUserIdEqualTo(leaveRequestDto.getRequestorId());
		}
		if(StringUtils.isNotEmpty(leaveRequestDto.getLeaveType())){
			criteria.andLeaveTypeEqualTo(leaveRequestDto.getLeaveType());
		}
		if(leaveRequestDto.getFromDate()!=null){
			criteria.andStartDateGreaterThanOrEqualTo(leaveRequestDto.getFromDate());
		}
		if(leaveRequestDto.getToDate()!=null){
			criteria.andToDateLessThanOrEqualTo(leaveRequestDto.getToDate());
		}
		if(leaveRequestDto.getTaskId()!=null){
			criteria.andTaskIdEqualTo(leaveRequestDto.getTaskId());
		}
		return example;
	}
}
