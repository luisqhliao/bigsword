package com.github.toblerones.web.app.base.object;

import com.github.toblerones.annotation.WebAppRequestAnnotation;

@WebAppRequestAnnotation(cmd = "cmd", remarks = "testRemark")
public class JsonMessageReqBase {
	
	private String cmd = null;

	public String getCmd() {
		return cmd;
	}

	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
}
