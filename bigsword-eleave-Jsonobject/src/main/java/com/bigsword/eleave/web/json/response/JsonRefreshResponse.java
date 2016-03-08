package com.bigsword.eleave.web.json.response;

import com.bigsword.eleave.web.json.object.ResponseBase;

public class JsonRefreshResponse extends ResponseBase{

	private int currentUserId;
	private String currentUserName;
	private String system;
	public int getCurrentUserId() {
		return currentUserId;
	}
	public void setCurrentUserId(int currentUserId) {
		this.currentUserId = currentUserId;
	}
	public String getCurrentUserName() {
		return currentUserName;
	}
	public void setCurrentUserName(String currentUserName) {
		this.currentUserName = currentUserName;
	}
	public String getSystem() {
		return system;
	}
	public void setSystem(String system) {
		this.system = system;
	}
	
	
}
