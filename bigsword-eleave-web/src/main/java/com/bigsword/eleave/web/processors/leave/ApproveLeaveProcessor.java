package com.bigsword.eleave.web.processors.leave;

import org.apache.log4j.Logger;

import com.bigsword.eleave.domain.LeaveRequest;
import com.bigsword.eleave.domain.User;
import com.bigsword.eleave.leave.spi.LeaveBpmService;
import com.bigsword.eleave.web.common.ContextUtil;
import com.bigsword.eleave.web.common.JsonLeaveRequestMapper;
import com.bigsword.eleave.web.json.object.JsonObjLeave;
import com.bigsword.eleave.web.json.request.JsonApproveLeaveRequest;
import com.bigsword.eleave.web.processors.authentication.LoginProcessor;
import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;

public class ApproveLeaveProcessor implements RequestProcessor{
	final static Logger logger = Logger.getLogger(LoginProcessor.class);
	private LeaveBpmService leaveBpmService;
	@Override
	public String process(WorkContext workContext) {
		
		
		User user=ContextUtil.getUsertoUserDataScope(workContext);
		JsonApproveLeaveRequest json = (JsonApproveLeaveRequest)workContext.getJsonRequestObjectFromContext();
		 logger.debug("json cmd" + json.getCmd());
		JsonObjLeave jsonObjLeave=json.getJsonleave();
		LeaveRequest leave=JsonLeaveRequestMapper.populateLeaveRequest(jsonObjLeave);
		String userId=user.getStaffId();
		leaveBpmService.approveLeave(leave, userId);
		return "Done";
	}
	public void setLeaveBpmService(LeaveBpmService leaveBpmService) {
		this.leaveBpmService = leaveBpmService;
	}
}