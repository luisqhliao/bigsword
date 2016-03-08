package com.github.toblerones.web.app.base.interceptor.configuration;

import java.lang.reflect.Type;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.github.toblerones.base.gson.JsonObjectUtil;
import com.google.gson.reflect.TypeToken;

public class InterceptorConfigurationHelper {
	@Autowired(required = false)
	@Qualifier("messageHandlerMaps")
	private Map<String, MessageHandlerMap> messageHandlerMaps;
	
	@Autowired(required = false)
	@Qualifier("messageHanlderFile")
	private String messageHanlderFile;
	
	private static final String DEFAULT_MESSAGE_HANLDER_FILE = "json_message_hanlder.json";
	
	public InterceptorConfigurationHelper(){
		
		if(this.messageHandlerMaps == null || messageHandlerMaps.isEmpty()){
			String filePath = this.messageHanlderFile;
			if(StringUtils.isEmpty(filePath)){
				filePath = InterceptorConfigurationHelper.DEFAULT_MESSAGE_HANLDER_FILE;
			}
			
			Type collectionType = new TypeToken<Map<String, MessageHandlerMap>>() {}.getType();
			this.messageHandlerMaps = JsonObjectUtil.loadObjectFromClassPathJsonFileWithGenericType(filePath, collectionType);
		}
	}
	
	public String getRequestObjectClassByCmd(String cmd) {
		return messageHandlerMaps.get(cmd).getRequestObjectClass();
	}

	public String getRequestProcessorClassByCmd(String cmd) {
		return cmd + "Processor";
	}
	
	public String getResponseObjectClassByCmd(String cmd) {
		return messageHandlerMaps.get(cmd).getResponseObjectClass();
	}
}
