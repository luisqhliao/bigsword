package bigsword.eleave.db.impl.testcase;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.bigsword.eleave.domain.LeaveRequest;

import bigsword.eleave.db.impl.LeaveRequestDbServiceImpl;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext_Test.xml"})
public class TestLeaveRequest {
	@Autowired
	private LeaveRequestDbServiceImpl leaveRequestDbServiceImpl;
	
	@Test
	public void testAddLeaveRequest() {
		LeaveRequest leaveRequest = new LeaveRequest();
		leaveRequest.setTaskId("005");
		leaveRequest.setRequestorId("43263684");
		leaveRequest.setCoreLeave(false);
		leaveRequest.setLeaveType("AN");
		leaveRequest.setStatus("PD");
		leaveRequest.setFromDate(new Date(System.currentTimeMillis() + 168 * 60 * 60 * 1000));
		leaveRequest.setToDate(new Date(System.currentTimeMillis() + 336 * 60 * 60 * 1000));
		leaveRequestDbServiceImpl.addLeaveRequest(leaveRequest);
		System.out.print("Add Leave Request complete.");
	}
	
	@Test
	public void testGetLeaveRequest1() {
		String userId = "43263684";
		leaveRequestDbServiceImpl.getLeaveRequest(userId);
		System.out.print("Get Leave Request 1 complete.");
	}
	
	@Test
	public void testGetLeaveRequest2() {
		String userId = "43263684";
		String leaveType = "AN";
		leaveRequestDbServiceImpl.getLeaveRequest(userId, leaveType);
		System.out.print("Get Leave Request 2 complete.");
	}
	
	@Test
	public void testGetLeaveRequest3() {
		String userId = "43263684";
		Date beginDate = new Date(System.currentTimeMillis());
		Date endDate = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000);
		leaveRequestDbServiceImpl.getLeaveRequest(userId, beginDate, endDate);
		System.out.print("Get Leave Request 3 complete.");
	}
	
	@Test
	public void testGetLeaveRequestById() {
		String taskId = "001";
		leaveRequestDbServiceImpl.getLeaveRequestById(taskId);
		System.out.print("Get Leave Request By ID complete.");
	}
	
	@Test
	public void testUpdateLeaveRequest() {
		LeaveRequest leaveRequest = new LeaveRequest();
		leaveRequest.setTaskId("002");
		leaveRequest.setRequestorId("43263684");
		leaveRequest.setCoreLeave(false);
		leaveRequest.setLeaveType("AN");
		leaveRequest.setStatus("CL");
		leaveRequest.setFromDate(new Date(System.currentTimeMillis()));
		leaveRequest.setToDate(new Date(System.currentTimeMillis() + 48 * 60 * 60 * 1000));
		leaveRequestDbServiceImpl.updateLeaveRequest(leaveRequest);
		System.out.print("Update Leave Request complete.");
	}
	
	@Test
	public void testDeleteLeaveRequest() {
		String taskId = "001";
		leaveRequestDbServiceImpl.deleteLeaveRequest(taskId);
		System.out.print("Delete Leave Request By ID complete.");
	}
	
}
