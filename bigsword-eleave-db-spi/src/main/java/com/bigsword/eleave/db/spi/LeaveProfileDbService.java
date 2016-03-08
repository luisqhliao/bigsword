package com.bigsword.eleave.db.spi;

import com.bigsword.eleave.domain.LeaveProfile;

public interface LeaveProfileDbService {
	public LeaveProfile getLeaveProfile(String userId, String leaveType, String year);
	public void updateLeaveProfile(LeaveProfile leaveprofile);
	public void addLeaveProfile(LeaveProfile leaveProfile);
	public void deleteLeaveProfile(String userId, String year);
}
