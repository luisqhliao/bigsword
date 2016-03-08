package com.bigsword.eleave.web.processors.authentication;

import org.apache.log4j.Logger;

import com.bigsword.eleave.domain.Authentication;
import com.bigsword.eleave.domain.User;
import com.bigsword.eleave.domain.constraints.ChannelCode;
import com.bigsword.eleave.user.spi.UserBpmService;
import com.bigsword.eleave.web.common.ContextUtil;
import com.bigsword.eleave.web.json.request.JsonLoginRequest;
import com.bigsword.eleave.web.json.response.JsonLoginResponse;
import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;

public class LoginProcessor implements RequestProcessor{

	private UserBpmService userBpmService;
	public void setUserBpmService(UserBpmService userBpmService) {
		this.userBpmService = userBpmService;
	}
	
	final static Logger logger = Logger.getLogger(LoginProcessor.class);
	
	@Override
	public String process(WorkContext workContext) {
		JsonLoginRequest json = (JsonLoginRequest)workContext.getJsonRequestObjectFromContext();
		
		if(logger.isDebugEnabled()){
		    logger.debug("json cmd" + json.getCmd());
		    logger.debug("json StaffId" + json.getUsername());
		    logger.debug("json Password" + json.getPassword());
		}
		
		String username = json.getUsername();
		String password = json.getPassword();
		
		Authentication authentication = new Authentication(username, password, ChannelCode.NET_NON_SSO);
		
		User user = userBpmService.login(authentication);
		
		if(user!=null){
			ContextUtil.putUsertoUserDataScope(workContext, user);
			JsonLoginResponse response = new JsonLoginResponse();
			response.setResponseStatus("success");
			workContext.putJsonResponseObjectToContext(response);
			return "DONE";
		}else{
			JsonLoginResponse response = new JsonLoginResponse();
			response.setResponseStatus("failure");
			workContext.putJsonResponseObjectToContext(response);
		}
		
		return "DONE";
	}
}
