package com.github.toblerones.web.app.base.interceptor.configuration;

public class MessageHandlerMap {
	private String requestObjectClass;
	private String requestProcessorClass;
	private String responseObjectClass;
	
	public String getRequestObjectClass() {
		return requestObjectClass;
	}
	public void setRequestObjectClass(String requestObjectClass) {
		this.requestObjectClass = requestObjectClass;
	}
	public String getRequestProcessorClass() {
		return requestProcessorClass;
	}
	public void setRequestProcessorClass(String requestProcessorClass) {
		this.requestProcessorClass = requestProcessorClass;
	}
	public String getResponseObjectClass() {
		return responseObjectClass;
	}
	public void setResponseObjectClass(String responseObjectClass) {
		this.responseObjectClass = responseObjectClass;
	}
	
	
}
