package com.github.toblerones.web.app.context;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

import com.github.toblerones.web.app.base.interceptor.configuration.InterceptorConfigurationHelper;

public class WorkContext{
	
	public static final String JSON_REQUEST_OBJECT = "json_request_object";
	public static final String JSON_RESPONSE_OBJECT = "json_response_object";
	public static final String JSON_RESPONSE_STRING = "json_response_string";
	public static final String HTTP_SERVLET_REQUEST = "http_servlet_request";
	public static final String INTERCEPTOR_CONFIGURATION_OBJECT_KEY = "interceptor_configuration_object";
	
	private ApplicationContext applicationContext;
	
	private Map<String, Object> userContext;
	private Map<String, Object> requestContext;

	public void setUserContext(Map<String, Object> userContext) {
		this.userContext = userContext;
	}
	public void resetRequestContext() {
		this.requestContext = new HashMap<String, Object>();
	}

	public WorkContext(){
		if(userContext==null){
			userContext = new HashMap<String, Object>();
		}
		if(requestContext==null){
			requestContext = new HashMap<String, Object>();
		}
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getUserData(String key) {
		return (T) userContext.get(key);
	}

	@SuppressWarnings("unchecked")
	public <T> T getRequestData(String key) {
		return (T) requestContext.get(key);
	}
	
	public Object getApplicationData(String key) {
		WebApplicationContext webContext = (WebApplicationContext) applicationContext;
		return webContext.getServletContext().getAttribute(key);
	}
	
	public <T> void putUserData(String key, T data) {
		userContext.put(key, data);
	}
	
	public <T> void putRequestData(String key, T data) {
		requestContext.put(key, data);
	}

	public <T> void putApplicationData(String key, T data) {
		WebApplicationContext webContext = (WebApplicationContext) applicationContext;
		webContext.getServletContext().setAttribute(key, data);
	}
	
	public ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public void setApplicationContext(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}
	
	public <T> T getJsonRequestObjectFromContext(){
		return getRequestData(JSON_REQUEST_OBJECT);
	}
	public <T> T getJsonResponseObjectFromContext(){
		return getRequestData(JSON_RESPONSE_OBJECT);
	}
	public <T> T getJsonResponseStringFromContext(){
		return getRequestData(JSON_RESPONSE_STRING);
	}
	public <T> void putJsonRequestObjectToContext(T jsonRequest){
		putRequestData(JSON_REQUEST_OBJECT, jsonRequest);
	}
	public <T> void putJsonResponseObjectToContext(T jsonResponse){
		putRequestData(JSON_RESPONSE_OBJECT, jsonResponse);
	}
	
	public <T> void putInterceptorConfigurationObjectToContext(T value){
		putApplicationData(INTERCEPTOR_CONFIGURATION_OBJECT_KEY, value);
	}
	
	public InterceptorConfigurationHelper getInterceptorConfigurationObjectFromContext(){
		try{
			return (InterceptorConfigurationHelper) getApplicationData(INTERCEPTOR_CONFIGURATION_OBJECT_KEY);
		}catch(Exception e){
			return null;
		}
		
//		return (T) getApplicationData(INTERCEPTOR_CONFIGURATION_OBJECT_KEY);
	}
}
