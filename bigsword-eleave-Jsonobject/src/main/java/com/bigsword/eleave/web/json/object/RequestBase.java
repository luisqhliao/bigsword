package com.bigsword.eleave.web.json.object;

import com.github.toblerones.annotation.WebAppRequestAnnotation;

@WebAppRequestAnnotation(cmd = "cmd", remarks = "")
public class RequestBase {
	private String cmd;
	private String token;
	
	public String getCmd() {
		return cmd;
	}
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
}
