package com.bigsword.eleave.web.processors.general;

import org.apache.log4j.Logger;

import com.bigsword.eleave.web.processors.authentication.LoginProcessor;
import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;

public class RefreshProcessor implements RequestProcessor{

	final static Logger logger = Logger.getLogger(LoginProcessor.class);
	
	@Override
	public String process(WorkContext workContext) {
		System.out.println("in RefreshProcessor");
		return "DONE";
	}

}
