package com.bigsword.eleave.leave.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;

import com.bigsword.eleave.db.dto.LeaveRequestDto;
import com.bigsword.eleave.db.spi.LeaveProfileDbService;
import com.bigsword.eleave.db.spi.LeaveRequestDbService;
import com.bigsword.eleave.db.spi.UserDbService;
import com.bigsword.eleave.domain.Authentication;
import com.bigsword.eleave.domain.LeaveProfile;
import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.User;
import com.bigsword.eleave.user.spi.UserBpmService;

public class UserBpmServiceImpl implements UserBpmService {
	
	private LeaveRequestDbService leaveRequestDbService;
	private UserDbService userDbService;
	private LeaveProfileDbService leaveProfileDbService;
	private TaskService taskService;
	@Override
	public User login(Authentication authentication) {
		String userName = authentication.getUserName();
		String password = authentication.getPassword();
		
		User user = userDbService.getUser(userName);
		
		//TODO password verify in LDAP
		if(user!=null){
			if(password.equals("dummy")){
				//log
			}else{
				throw new RuntimeException("password incorrect");
			}
		} else {
			return null;
		}	
		return user;
	}
	@Override
	public String findManagerForEmployee(String employee){
		return "111111";
	}
	
	@Override
	public LeaveProfile retrieveLeaveProfile(String staffId, Date year, String leaveType) {
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy");
		String strYear=sdf.format(year);
		LeaveProfile leaveProfile=leaveProfileDbService.getLeaveProfile(staffId, leaveType,strYear);
		return leaveProfile;
	}

	@Override
	public List<LeaveRequest> retrieveLeaveFromMe(String staffId, Date year) {
		
		Date begin;
		Date end;
		Calendar cal = Calendar.getInstance();
		cal.setTime(year);
		cal.set(Calendar.MONTH, 0);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		
		begin=cal.getTime();
		
		cal.setTime(year);
		cal.set(Calendar.MONTH, 11);
		cal.set(Calendar.DAY_OF_MONTH, 31);
		end=cal.getTime();
		LeaveRequestDto leaveRequestDto = new LeaveRequestDto();
		leaveRequestDto.setRequestorId(staffId);
		leaveRequestDto.setFromDate(begin);
		leaveRequestDto.setToDate(end);
		List<LeaveRequest> leaveRequests=leaveRequestDbService.getLeaveRequest(leaveRequestDto);
		return leaveRequests;
	}

	@Override
	public List<LeaveRequest> retrieveLeavesOnMe(String staffId, Date year) {
		// TODO Auto-generated method stub
		List<Task> taskAssignedList = taskService.createTaskQuery().taskAssignee(staffId).list();
		List<Task> tasksOwnedList = taskService.createTaskQuery().taskOwner(staffId).list();
		List<LeaveRequest> leaveRequests=null;
		if(taskAssignedList!=null && taskAssignedList.size()>0){
			leaveRequests=new ArrayList<LeaveRequest>();
			for(Task task: taskAssignedList){
				LeaveRequestDto leaveRequestDto = new LeaveRequestDto();
				leaveRequestDto.setTaskId(task.getId());
				List<LeaveRequest> leaveRequestList=leaveRequestDbService.getLeaveRequest(leaveRequestDto);
				if(leaveRequestList!=null){
					leaveRequests.addAll(leaveRequestList);
				}
				
			}
		}
		if(tasksOwnedList!=null && tasksOwnedList.size()>0){
			if(leaveRequests==null){
				leaveRequests=new ArrayList<LeaveRequest>();
			}
			for(Task task: tasksOwnedList){
				LeaveRequestDto leaveRequestDto = new LeaveRequestDto();
				leaveRequestDto.setTaskId(task.getId());
				List<LeaveRequest> leaveRequestList=leaveRequestDbService.getLeaveRequest(leaveRequestDto);
				if(leaveRequestList!=null){
					leaveRequests.addAll(leaveRequestList);
				}
			}
		}		
		return leaveRequests;
	}

	@Override
	public User retrieveUserDetail(String staffId) {
		User user = userDbService.getUser(staffId);
		return user;
	}

	public void setLeaveRequestDbService(LeaveRequestDbService leaveRequestDbService) {
		this.leaveRequestDbService = leaveRequestDbService;
	}

	public void setUserDbService(UserDbService userDbService) {
		this.userDbService = userDbService;
	}

	public void setLeaveProfileDbService(LeaveProfileDbService leaveProfileDbService) {
		this.leaveProfileDbService = leaveProfileDbService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

}
