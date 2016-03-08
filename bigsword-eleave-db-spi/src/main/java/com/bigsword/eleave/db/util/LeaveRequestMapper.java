package com.bigsword.eleave.db.util;

import java.math.BigDecimal;
import java.util.Date;

import bigsword.eleave.db.object.model.BsLeaveRequest;

import com.bigsword.eleave.domain.LeaveRequest;
import com.mysql.jdbc.StringUtils;

public class LeaveRequestMapper {
	public static LeaveRequest populateLeaveRequest(BsLeaveRequest tbLeaveRequest){
		LeaveRequest leaveRequest=null;
		if(tbLeaveRequest!=null){
			leaveRequest = new LeaveRequest();
			leaveRequest.setCoreLeave(false);
			leaveRequest.setRequestId(tbLeaveRequest.getRequestId());
			leaveRequest.setFromDate(tbLeaveRequest.getStartDate());
			leaveRequest.setLeaveType(tbLeaveRequest.getLeaveType());
			leaveRequest.setUserId(tbLeaveRequest.getUserId());
			leaveRequest.setStatus(tbLeaveRequest.getRequestStatus().toString());
			leaveRequest.setToDate(tbLeaveRequest.getToDate());
			leaveRequest.setTaskId(tbLeaveRequest.getRequestId());
			leaveRequest.setLeave_days(tbLeaveRequest.getLeaveDays().doubleValue());
		}
		return leaveRequest;
	}
	public static BsLeaveRequest populateTbLeaveRequest(LeaveRequest leaveRequest,BsLeaveRequest tbLeaveRequest){
		if(leaveRequest!=null){
			if(StringUtils.isEmptyOrWhitespaceOnly(tbLeaveRequest.getRequestId())){
				tbLeaveRequest.setRequestId(leaveRequest.getRequestId());
			}
			tbLeaveRequest.setComment(null);
			tbLeaveRequest.setCreateBy(null);
			tbLeaveRequest.setCreateDate(new Date());
			tbLeaveRequest.setReason(null);
			tbLeaveRequest.setRequestStatus(leaveRequest.getStatus());
			tbLeaveRequest.setStartDate(leaveRequest.getFromDate());
			tbLeaveRequest.setToDate(leaveRequest.getToDate());
			tbLeaveRequest.setUpdateBy(leaveRequest.getUpdateBy());
			tbLeaveRequest.setUserId(leaveRequest.getUserId());
			tbLeaveRequest.setLeaveType(leaveRequest.getLeaveType());
			tbLeaveRequest.setTaskId(leaveRequest.getTaskId());
			BigDecimal a = new BigDecimal(leaveRequest.getLeave_days());
			tbLeaveRequest.setLeaveDays(a);
		}
		return tbLeaveRequest;
	}
}
