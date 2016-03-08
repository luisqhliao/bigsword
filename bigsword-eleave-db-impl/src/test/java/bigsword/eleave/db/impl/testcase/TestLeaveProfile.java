package bigsword.eleave.db.impl.testcase;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.bigsword.eleave.domain.LeaveProfile;

import bigsword.eleave.db.impl.LeaveProfileDbServiceImpl;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext_Test.xml"})
public class TestLeaveProfile {
	@Autowired
	private LeaveProfileDbServiceImpl leaveProfileDbServiceImpl;
	
	@Test
	public void testAddLeaveProfile() {
		LeaveProfile leaveProfile = new LeaveProfile();
		leaveProfile.setStaffId("43263684");
		leaveProfile.setYearOfOperation("2016");
		Map<String, BigDecimal> map1 = new HashMap<String, BigDecimal>();
		map1.put("AN", new BigDecimal(1));
		map1.put("SI", new BigDecimal(366));
		leaveProfile.setOrignalLeaves(map1);
		Map<String, BigDecimal> map2 = new HashMap<String, BigDecimal>();
		map2.put("AN", new BigDecimal(0));
		map2.put("SI", new BigDecimal(365));
		leaveProfile.setOutstandingLeaves(map2);
		leaveProfileDbServiceImpl.addLeaveProfile(leaveProfile);
		System.out.print("Add Leave Profile complete.");
	}
	
	@Test
	public void testUpdateLeaveProfile() {
		LeaveProfile leaveProfile = new LeaveProfile();
		leaveProfile.setStaffId("43263684");
		leaveProfile.setYearOfOperation("2016");
		Map<String, BigDecimal> map1 = new HashMap<String, BigDecimal>();
		map1.put("AN", new BigDecimal(200));
		map1.put("SI", new BigDecimal(666));
		leaveProfile.setOrignalLeaves(map1);
		Map<String, BigDecimal> map2 = new HashMap<String, BigDecimal>();
		map2.put("AN", new BigDecimal(100));
		map2.put("SI", new BigDecimal(665));
		leaveProfile.setOutstandingLeaves(map2);
		leaveProfileDbServiceImpl.updateLeaveProfile(leaveProfile);
		System.out.print("Update Leave Profile complete.");
	}
	
	@Test
	public void testGetLeaveProfile() {
		String userId = "43263684";
		String year = "2016";
		String leaveType = "AN";
		LeaveProfile testLeaveProfile = new LeaveProfile();
		
		testLeaveProfile = leaveProfileDbServiceImpl.getLeaveProfile(userId, leaveType, year);
		
		System.out.println(testLeaveProfile.getStaffId() + " - "
				+ testLeaveProfile.getYearOfOperation() + " - "
				+ testLeaveProfile.getOrignalLeaves().get(leaveType) + " - "
				+ testLeaveProfile.getOutstandingLeaves().get(leaveType));
		
		System.out.print("Get Leave Profile complete.");
	}
	
	@Test
	public void testDeleteLeaveProfile() {
		String userId = "43263684";
		String year = "2016";
		leaveProfileDbServiceImpl.deleteLeaveProfile(userId, year);
		System.out.print("Delete Leave Profile complete.");
	}
	
}
