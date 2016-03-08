package com.bigsword.eleave.web.json.request;

import com.bigsword.eleave.web.json.object.RequestBase;

public class JsonLoginRequest extends RequestBase{
	private String username;
	private String password;

	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
