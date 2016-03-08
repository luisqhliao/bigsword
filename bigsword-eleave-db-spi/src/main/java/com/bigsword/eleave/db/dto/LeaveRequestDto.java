package com.bigsword.eleave.db.dto;

import java.util.Date;

public class LeaveRequestDto {
	private String requestorId;
	private Date fromDate;
	private Date ToDate;
	private String leaveType;
	private boolean isCoreLeave;
	private String status;
	private String taskId;
	public String getRequestorId() {
		return requestorId;
	}
	public void setRequestorId(String requestorId) {
		this.requestorId = requestorId;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return ToDate;
	}
	public void setToDate(Date toDate) {
		ToDate = toDate;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
	public boolean isCoreLeave() {
		return isCoreLeave;
	}
	public void setCoreLeave(boolean isCoreLeave) {
		this.isCoreLeave = isCoreLeave;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	
}
