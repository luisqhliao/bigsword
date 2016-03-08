package com.bigsword.eleave.leave.spi;

import com.bigsword.eleave.domain.LeaveRequest;

public interface LeaveBpmService {
	
	// Action on Leave
	public Boolean draftLeave(LeaveRequest leaveRequest);
	public Boolean submitLeave(LeaveRequest leaveRequest);
	public Boolean cancelLeave(LeaveRequest leaveRequest, String userId);
	public Boolean approveLeave(LeaveRequest leaveRequest,String userId);
	public Boolean declineLeave(LeaveRequest leaveRequest,String userId);
}
