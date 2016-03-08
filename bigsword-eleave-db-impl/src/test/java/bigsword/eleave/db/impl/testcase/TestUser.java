package bigsword.eleave.db.impl.testcase;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.bigsword.eleave.domain.User;

import bigsword.eleave.db.impl.UserDbServicesImpl;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext_Test.xml"})

public class TestUser {
	private static Logger log = LogManager.getLogger(TestUser.class);
	@Autowired
	private UserDbServicesImpl userDbServicesImpl;
	@Test
	public void testAddUser() {
		// TODO Auto-generated method stub
		
		User user = new User();
		user.setStaffId("43263684");
		user.setEmail("Hunter W T HU/HSDC/HSBC");
		user.setFirstName("Hunter");
		user.setLastName("HU");
		user.setStatus("A");
		userDbServicesImpl.addUser(user);
		log.info("Add User complete.");
		System.out.print("Add User complete.");
	}
	
	@Test
	public void testUpdateUser() {
		// TODO Auto-generated method stub
		User user = new User();
		user.setStaffId("43263684");
		user.setEmail("F");
		user.setFirstName("Hunter");
		user.setLastName("HU");
		user.setStatus("A");
		userDbServicesImpl.updateUser(user);
		log.info("Update User complete.");
		System.out.print("Update User complete.");
	}
	
	@Test
	public void testGetUser() {
		// TODO Auto-generated method stub
		String userId = "43263684";
		userDbServicesImpl.getUser(userId);
		log.info("Get User complete.");
		System.out.print("Get User complete.");
	}
	
	@Test
	public void testDeleteUser() {
		// TODO Auto-generated method stub
		String userId = "43263684";
		userDbServicesImpl.deleteUser(userId);
		log.info("Delete User complete.");
		System.out.print("Delete User complete.");
	}
	
}
