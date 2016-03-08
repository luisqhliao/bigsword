package test.bigsword.eleave.domain;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.constraints.LeaveType;

public class LeaveRequestTest {

	@BeforeClass
	 public void setUp() {
	   
	 }
	 
	 @Test(groups = { "richDomain" })
	 public void isAnnualLeaveTest() {
	   LeaveRequest leaveRequest = new LeaveRequest();
	   assert leaveRequest.isAnnualLeave() == false;

	   leaveRequest.setLeaveType(null);
	   assert leaveRequest.isAnnualLeave() == false;
	   
	   leaveRequest.setLeaveType(LeaveType.MATERNITY_LEAVE);
	   assert leaveRequest.isAnnualLeave() == false;
	   
	   leaveRequest.setLeaveType(LeaveType.ANNUAL_LEAVE);
	   assert leaveRequest.isAnnualLeave() == true;
	   
	 }

}
