package com.bigsword.eleave.db.spi;

import java.util.Date;
import java.util.List;

import com.bigsword.eleave.db.dto.LeaveRequestDto;
import com.bigsword.eleave.domain.LeaveRequest;

public interface LeaveRequestDbService {
	public List<LeaveRequest> getLeaveRequest(LeaveRequestDto leaveRequestDto);
	public void addLeaveRequest(LeaveRequest leaveRequest);
	public void updateLeaveRequest(LeaveRequest leaveRequest);
	public void deleteLeaveRequest(String Id);
}
