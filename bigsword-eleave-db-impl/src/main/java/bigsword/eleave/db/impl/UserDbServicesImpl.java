package bigsword.eleave.db.impl;

import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bigsword.eleave.db.spi.UserDbService;
import com.bigsword.eleave.domain.User;

import bigsword.eleave.db.object.model.BsUser;
import bigsword.eleave.db.object.model.BsUserExample;
import bigsword.eleave.db.persistence.BsUserMapper;

public class UserDbServicesImpl implements UserDbService {

	private static Logger log = LogManager.getLogger(UserDbServicesImpl.class);
//	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	
	BsUserMapper mapper;
	private BsUserExample example;
	
	@Override
	public User getUser(String userId) {
		// TODO Auto-generated method stub
		User user = new User();
		BsUserExample example = new BsUserExample();
		BsUserExample.Criteria cr = example.createCriteria();
		cr.andUserIdEqualTo(userId);
		List<BsUser> lst = mapper.selectByExample(example);
		if (lst != null && lst.size() > 0) {
			
			user.setStaffId(lst.get(0).getUserId());
			user.setStatus(lst.get(0).getStatus());
			user.setGender(lst.get(0).getGender());
			user.setFirstName("");
			user.setMiddleName("");
			user.setLastName("");
			user.setEmail(lst.get(0).getEmail());
			user.setLevel("");
			user.setDateOfEffective(null);
			user.setDateOfJoined(null);
			user.setDateOfProbationEnding(null);
			user.setDateOfLastWorking(null);
			
			return user;
		}
		return null;
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		String tempStaffId = "";
		if (user.getStaffId() != null) {
			tempStaffId = user.getStaffId();
		}
		BsUserExample example = new BsUserExample();
		BsUserExample.Criteria cr = example.createCriteria();
		cr.andUserIdEqualTo(tempStaffId);
		BsUser record = new BsUser();
		record.setGender(user.getGender());
		record.setEmail(user.getEmail());
		record.setStatus(user.getStatus());
		record.setUpdateDate(new Date());
		record.setUpdateBy("Hunter W T HU");
		mapper.updateByExampleSelective(record, example);
	}

	@Override
	public void addUser(User user) {
		// TODO Auto-generated method stub
		BsUser record = new BsUser();
		record.setUserId(user.getStaffId());
		record.setName(user.getFirstName());
		record.setGender(user.getGender());
		record.setEmail(user.getEmail());
		record.setUserType("");
		record.setStatus(user.getStatus());
		record.setJoinDate(null);
		record.setResignDate(null);
		record.setManagerId(null);
		record.setCreateDate(new Date());
		record.setCreateBy("Hunter W T HU");
		record.setUpdateDate(new Date());
		record.setUpdateBy("Hunter W T HU");
		mapper.insert(record);
	}

	@Override
	public void deleteUser(String userId) {
		// TODO Auto-generated method stub
		BsUserExample example = new BsUserExample();
		BsUserExample.Criteria cr = example.createCriteria();
		cr.andUserIdEqualTo(userId);
		mapper.deleteByExample(example);
	}

	public static Logger getLog() {
		return log;
	}

	public static void setLog(Logger log) {
		UserDbServicesImpl.log = log;
	}

	public BsUserMapper getMapper() {
		return mapper;
	}

	public void setMapper(BsUserMapper mapper) {
		this.mapper = mapper;
	}

	public BsUserExample getExample() {
		return example;
	}

	public void setExample(BsUserExample example) {
		this.example = example;
	}

}
