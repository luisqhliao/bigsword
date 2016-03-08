package dummy.com.bigsword.eleave.db.impl;

import com.bigsword.eleave.db.spi.UserDbService;
import com.bigsword.eleave.domain.User;

public class UserDbServiceImpl implements UserDbService{

	public User getUser(String userId) {
		User user = new User();
		if(userId.equals("11111111")){
			user.setStaffId("11111111");
			user.setStatus("activiti");
			user.setFirstName("dummy");
			user.setLastName("one");
		}else if(userId.equals("22222222")){
			user.setStaffId("22222222");
			user.setStatus("activiti");
			user.setFirstName("dummy");
			user.setLastName("two");
		}else {
			return null;
		}
		return user;
	}

	public void updateUser(User user) {
		// TODO Auto-generated method stub
		
	}

	public void addUser(User user) {
		// TODO Auto-generated method stub
		
	}

	public void deleteUser(String userId) {
		// TODO Auto-generated method stub
		
	}

}
