package com.github.toblerones.web.app.base.interceptor;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;

import com.github.toblerones.annotation.WebAppRequestAnnotation;
import com.github.toblerones.base.gson.JsonObjectUtil;
import com.github.toblerones.web.app.base.interceptor.configuration.InterceptorConfigurationHelper;
import com.github.toblerones.web.app.base.object.JsonMessageReqBase;
import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;

/**
 * 
 * @author Luo
 *
 * @param <T>
 * @param <E>
 */
@Controller("jsonMsgController")
public class JsonMsgController<T, E>{
	
	@Autowired
	private ApplicationContext context;
	private WebApplicationContext webContext;
	
	@Autowired(required = false)
	@Qualifier("customizedRequestBase")
	private T customizedRequestBase;
	
	@Autowired(required = false)
	@Qualifier("customizedResponseBase")
	private E customizedResponseBase;
	
	private final String defaultErrorResponse = "{\"responseStatus\":\"error\"}";
	
	private final static String KEY_CONFIGURATION_HELPER = "INTERCEPTOR_CONFIG";
	private final static String KEY_WORKCONTEXT = "WORK_CONTEXT";
	
	/**
	 * The @RequestMapping annotation ensures that HTTP requests to /msgchannel are mapped to the jsonInterceptor() method.
	 * Accepts all kinds of http operation.
	 * 
	 * @param requestStr
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(headers = "Accept=application/json", method=RequestMethod.POST)
	public void msgInterceptor(@RequestBody String message, 
			HttpServletRequest request, HttpServletResponse response) {
		
		try{
	    	String responseStr = defaultErrorResponse;

		    String cmd = null; 
		    T jsonReq = null;
		    
		    // Uses annotation to get the CMD and determines the processor to be called
		    // Use default class if not provided.
		    if(customizedRequestBase == null){
		    	customizedRequestBase = (T) new JsonMessageReqBase();
		    }
		    
	    	jsonReq = (T)JsonObjectUtil.convertStringToObject(message, customizedRequestBase.getClass());
	    	
	    	// Get the CMD according to the annotation of request class
	    	Class<? extends Object> aClass = customizedRequestBase.getClass();
	    	Annotation annotation = aClass.getAnnotation(WebAppRequestAnnotation.class);

	    	if(annotation instanceof WebAppRequestAnnotation){
	    		WebAppRequestAnnotation myAnnotation = (WebAppRequestAnnotation) annotation;
	    	    Field field = aClass.getDeclaredField(myAnnotation.cmd());
	    	    field.setAccessible(true);
	    	    cmd = (String) field.get(jsonReq);
	    	}
			    	
	    	InterceptorConfigurationHelper interceptorConfigurationHelper = 
	    			getDataFromApplicationDataScope(KEY_CONFIGURATION_HELPER, InterceptorConfigurationHelper.class);
	    	
	    	String sessionId = request.getSession().getId();
	    	WorkContext workContext = getDataFromApplicationDataScope(KEY_WORKCONTEXT + sessionId, WorkContext.class);
	    	
	    	// Retrieve request mapping from intercepter configuration
	    	String requestObjName = interceptorConfigurationHelper.getRequestObjectClassByCmd(cmd);
	    	String requestProcessorName = interceptorConfigurationHelper.getRequestProcessorClassByCmd(cmd);
	    	
	    	// Call the processor to handle the request.
	 		try {
	 			jsonReq= (T) JsonObjectUtil.convertStringToObject(message, requestObjName);
	 			workContext.putJsonRequestObjectToContext(jsonReq);

	 			RequestProcessor processor = (RequestProcessor) context.getBean(requestProcessorName);
	 			
	 			//TODO check result?
	 			processor.process(workContext);
	
			    E customizedResponseBase = (E)workContext.getJsonResponseObjectFromContext();
			    responseStr = JsonObjectUtil.convertObjectToString(customizedResponseBase);
			} catch (Exception e){
				// TODO SafeNet - customized.
//				jsonResp.setErrorCode("GE0001");
//				jsonResp.setResponseStatus("error");
//				jsonResp.setCmd(cmd);
//		    	responseStr = JsonObjectUtil.convertObjectToString(jsonResp);
				e.printStackTrace();			
			}

	 		// Always be a string as JSON Response
	 		response.setContentType("application/json; charset=utf-8");
	 		response.setCharacterEncoding("UTF-8");
	 		response.getOutputStream().write(responseStr.getBytes("UTF-8"));
	        response.getOutputStream().flush();
			
		}catch(Exception e){
			// TODO SafeNet - customized.
			e.printStackTrace();
			try {
				response.getOutputStream().print("error");
				response.getOutputStream().flush();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}		
		}
	}
	
	@SuppressWarnings({ "unchecked", "hiding" })
	private <T> T getDataFromApplicationDataScope(String key, Class<T> cls){
		this.webContext = (WebApplicationContext) this.context;
		Object obj = webContext.getServletContext().getAttribute(key);
		if(obj==null){
			try {
				obj = cls.newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
			System.out.println("generic new obj " + key);
			webContext.getServletContext().setAttribute(key, obj);
			if(obj instanceof WorkContext){
				((WorkContext) obj).resetRequestContext();
				((WorkContext) obj).setUserContext(getDataFromApplicationDataScope(key+"USER_CONTEXT", HashMap.class));
			}
			return (T) obj;
		}else{
			if(obj instanceof WorkContext){
				((WorkContext) obj).resetRequestContext();
				((WorkContext) obj).setUserContext(getDataFromApplicationDataScope(key+"USER_CONTEXT", HashMap.class));
			}
			return (T) webContext.getServletContext().getAttribute(key);
		}
	}
}
