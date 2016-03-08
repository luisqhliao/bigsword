package com.bigsword.eleave.leave.impl;

import java.util.HashMap;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;

import com.bigsword.eleave.db.spi.LeaveRequestDbService;
import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.constraints.LeaveStatus;
import com.bigsword.eleave.leave.spi.LeaveBpmService;

public class LeaveBpmServiceImpl implements LeaveBpmService {
	private RuntimeService runtimeService;
	private TaskService taskService;
	private LeaveRequestDbService leaveRequestDbService;
	private static String LEAVE_PROCESS_ID="AnnualLeave";
	
	@Override
	public Boolean draftLeave(LeaveRequest leaveRequest) {
		leaveRequest.setStatus(LeaveStatus.DRAFT);
		leaveRequestDbService.addLeaveRequest(leaveRequest);
		return true;
	}

	@Override
	public Boolean submitLeave(LeaveRequest leaveRequest) {
		ProcessInstance leave=runtimeService.startProcessInstanceByKey(LEAVE_PROCESS_ID);
		boolean result=false;
		if(leave!=null){
			Task task=taskService.createTaskQuery().processInstanceId(leave.getId()).singleResult();
			leaveRequest.setTaskId(leave.getId());
			leaveRequest.setStatus(LeaveStatus.SUBMIT);
//			if(StringUtils.isEmpty(leaveRequest.getRequestId())){
				leaveRequestDbService.addLeaveRequest(leaveRequest);
//			}else{
//				leaveRequestDbService.updateLeaveRequest(leaveRequest);
//			}
			
			HashMap<String, Object> submitMap = new HashMap<String, Object>();
		    submitMap.put("emp",leaveRequest.getUserId());
			taskService.complete(task.getId(),submitMap);
			result=true;
		}
		
		return result;
	}

	@Override
	public Boolean cancelLeave(LeaveRequest leaveRequest,String userId) {
		boolean result=false;
		Task leave=taskService.createTaskQuery().processInstanceId(leaveRequest.getTaskId()).singleResult();
		if(leave!=null && leaveRequest.getUserId().equals(userId)){
			//Todo. need to study 
			HashMap<String, Object> calcelMap = new HashMap<String, Object>();
			calcelMap.put("cancelLeave", true);
	        taskService.complete(leave.getId(),calcelMap);
	        
			leaveRequest.setStatus(LeaveStatus.CANCEL);
			leaveRequestDbService.updateLeaveRequest(leaveRequest);
			completeLeave(leaveRequest);
			result=true;
			
		}
		return result;
	}

	@Override
	public Boolean approveLeave(LeaveRequest leaveRequest,String userId) {
		boolean result=false;
		Task leave=taskService.createTaskQuery().processInstanceId(leaveRequest.getTaskId()).singleResult();
		if(leave!=null && (leave.getAssignee().equals(userId)||leave.getOwner().equals(userId))){
			HashMap<String, Object> approveMap = new HashMap<String, Object>();
			approveMap.put("vacationApproved", true);
	        taskService.complete(leave.getId(),approveMap);
	        leaveRequest.setStatus(LeaveStatus.APPROVE);
	        leaveRequestDbService.updateLeaveRequest(leaveRequest);
	        completeLeave(leaveRequest);
	        result=true;
		}
		return result;
	}
	public Boolean completeLeave(LeaveRequest leaveRequest){
		boolean result=false;
		Task leave=taskService.createTaskQuery().processInstanceId(leaveRequest.getTaskId()).singleResult();
		if(leave!=null){
	        taskService.complete(leave.getId());
	        result=true;
		}
		return result;
	}
	@Override
	public Boolean declineLeave(LeaveRequest leaveRequest,String userId) {
		boolean result=false;
		Task leave=taskService.createTaskQuery().processInstanceId(leaveRequest.getTaskId()).singleResult();
		if(leave!=null && (leave.getAssignee().equals(userId)||leave.getOwner().equals(userId))){
			HashMap<String, Object> rejectMap = new HashMap<String, Object>();
			rejectMap.put("vacationApproved", false);
			rejectMap.put("emp", leaveRequest.getUserId());
	        taskService.complete(leave.getId(),rejectMap);
	        leaveRequest.setStatus(LeaveStatus.REJECT);
	        leaveRequestDbService.updateLeaveRequest(leaveRequest);
	        result=true;
		}
		return result;
	}

	public void setRuntimeService(RuntimeService runtimeService) {
		this.runtimeService = runtimeService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public void setLeaveRequestDbService(LeaveRequestDbService leaveRequestDbService) {
		this.leaveRequestDbService = leaveRequestDbService;
	}


	
}
