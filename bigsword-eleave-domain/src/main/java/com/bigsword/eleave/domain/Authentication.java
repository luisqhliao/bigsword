package com.bigsword.eleave.domain;

public class Authentication {
	private String userName;
	private String password;
	private String channel;
	
	public Authentication(String userName, String password, String channel){
		this.userName = userName;
		this.password = password;
		this.channel = channel;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	
	
}
