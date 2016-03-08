package dummy.com.bigsword.eleave.user.impl;

import java.util.Date;
import java.util.List;

import com.bigsword.eleave.domain.Authentication;
import com.bigsword.eleave.domain.LeaveProfile;
import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.User;
import com.bigsword.eleave.user.spi.UserBpmService;

public class UserBpmServiceImpl implements UserBpmService{

	@Override
	public LeaveProfile retrieveLeaveProfile(String staffId, Date year,
			String leaveType) {
		// TODO Auto-generated method stub
		return null;
	}

	public User login(Authentication authentication) {
		User user = new User();
		user.setFirstName(authentication.getUserName());
		user.setLastName(authentication.getPassword());
		user.setStaffId("99998888");
		user.setEmail("dummy@dummy.com");
		return user;
	}

	public LeaveProfile retrieveLeaveProfile(String staffId, Date year) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<LeaveRequest> retrieveLeaveFromMe(String staffId, Date year) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<LeaveRequest> retrieveLeavesOnMe(String staffId, Date year) {
		// TODO Auto-generated method stub
		return null;
	}

	public User retrieveUserDetail(String staffId) {
		// TODO Auto-generated method stub
		return null;
	}

}
