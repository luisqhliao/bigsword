package com.bigsword.eleave.domain;

import java.util.Date;

import com.bigsword.eleave.domain.constraints.LeaveType;

public class LeaveRequest {
	
	private String requestId;
	private String userId;
	private Date fromDate;
	private Date ToDate;
	private String leaveType;
	private boolean isCoreLeave;
	private double leave_days;
	private String status;
	private String taskId;
	private String leaveReason;
	private String comment;
	private String createBy;
	private String updateBy;
	
	public boolean isAnnualLeave(){
			return LeaveType.ANNUAL_LEAVE.equals(this.leaveType);
	}

	public String getRequestId() {
		return requestId;
	}


	public void setRequestId(String requestId) {
		this.requestId = requestId;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getLeaveReason() {
		return leaveReason;
	}

	public void setLeaveReason(String leaveReason) {
		this.leaveReason = leaveReason;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public double getLeave_days() {
		return leave_days;
	}

	public void setLeave_days(double leave_days) {
		this.leave_days = leave_days;
	}
	
}
