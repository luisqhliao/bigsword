package com.bigsword.eleave.web.common;

import com.bigsword.eleave.domain.User;
import com.github.toblerones.web.app.context.WorkContext;

public class ContextUtil {
	public static final String LOGON_USER_DATA_OBJECT_KEY="LOGON_USER_DATA_OBJECT_KEY";
	public static void putUsertoUserDataScope(WorkContext workContext,User user){
		workContext.putUserData(LOGON_USER_DATA_OBJECT_KEY, user);
	}
	public static User getUsertoUserDataScope(WorkContext workContext){
		User user=workContext.getUserData(LOGON_USER_DATA_OBJECT_KEY);
		return user;
	}
}
