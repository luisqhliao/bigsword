package com.bigsword.eleave.web.processors.leave;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import com.base.utils.DataConvertor;
import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.User;
import com.bigsword.eleave.user.spi.UserBpmService;
import com.bigsword.eleave.web.common.ContextUtil;
import com.bigsword.eleave.web.common.JsonLeaveRequestMapper;
import com.bigsword.eleave.web.json.object.JsonObjLeave;
import com.bigsword.eleave.web.json.object.JsonObjLeaveList;
import com.bigsword.eleave.web.json.request.JsonLeaveListRequest;
import com.bigsword.eleave.web.json.response.JsonLeaveListResponse;
import com.bigsword.eleave.web.processors.authentication.LoginProcessor;
import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;
import com.google.gson.Gson;

public class LeaveListProcessor implements RequestProcessor{

	final static Logger logger = Logger.getLogger(LoginProcessor.class);
	private UserBpmService userBpmService;
	@Override
	public String process(WorkContext workContext) {
		User user=ContextUtil.getUsertoUserDataScope(workContext);
		JsonLeaveListRequest json = (JsonLeaveListRequest)workContext.getJsonRequestObjectFromContext();
		Date year=DataConvertor.convertCNStringToDate(json.getYear());	
		String userId=user.getStaffId();
		List<LeaveRequest> leaveRequests=userBpmService.retrieveLeaveFromMe(userId,year);
		JsonObjLeaveList jsonObjLeaveList=null;
		List<JsonObjLeave> leaves=null;
		if(leaveRequests!=null){
			leaves=new ArrayList<JsonObjLeave>();
			for(LeaveRequest leaveRequest:leaveRequests){
				JsonObjLeave leave=JsonLeaveRequestMapper.populateJsonObjLeave(leaveRequest);
				leaves.add(leave);
			}
			jsonObjLeaveList=new JsonObjLeaveList();
			jsonObjLeaveList.setLeaves(leaves);
			
		}
		JsonLeaveListResponse response=new JsonLeaveListResponse();
		response.setData(jsonObjLeaveList);
		workContext.putJsonResponseObjectToContext(response);
		Gson gson=new Gson();
		System.out.println(gson.toJson(response));
		return "DONE";
	}
	public void setUserBpmService(UserBpmService userBpmService) {
		this.userBpmService = userBpmService;
	}
	

}
