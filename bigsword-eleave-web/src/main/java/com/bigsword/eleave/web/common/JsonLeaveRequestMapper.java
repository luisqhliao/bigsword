package com.bigsword.eleave.web.common;

import com.base.utils.DataConvertor;
import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.web.json.object.JsonObjLeave;

public class JsonLeaveRequestMapper {
	public static LeaveRequest populateLeaveRequest(JsonObjLeave jsonObjLeave){
		LeaveRequest leave = null;
		if (jsonObjLeave!=null){
			leave=new LeaveRequest();
			leave.setRequestId(jsonObjLeave.getLeaveId());
			leave.setStatus(jsonObjLeave.getStatus());
			leave.setLeaveType(jsonObjLeave.getLeaveType());
			leave.setFromDate(DataConvertor.convertCNStringToDate(jsonObjLeave.getStartDate()));
			leave.setToDate(DataConvertor.convertCNStringToDate(jsonObjLeave.getEndDate()));
			leave.setTaskId(jsonObjLeave.getTaskId());
			leave.setUserId(jsonObjLeave.getStaffId());
			leave.setLeave_days(1);
		}
		return leave;
	}
	
	public static JsonObjLeave populateJsonObjLeave(LeaveRequest leaveRequest){
		JsonObjLeave jsonObjLeave = null;
		if (leaveRequest!=null){
			jsonObjLeave=new JsonObjLeave();
			jsonObjLeave.setLeaveId(leaveRequest.getRequestId());
			jsonObjLeave.setStatus(leaveRequest.getStatus());
			jsonObjLeave.setLeaveType(leaveRequest.getLeaveType());
			jsonObjLeave.setStartDate(DataConvertor.convertDateToCNString(leaveRequest.getFromDate()));
			jsonObjLeave.setEndDate(DataConvertor.convertDateToCNString(leaveRequest.getToDate()));
			jsonObjLeave.setTaskId(leaveRequest.getTaskId());
			jsonObjLeave.setStaffId(leaveRequest.getUserId());
		}
		return jsonObjLeave;
	}
	
}
