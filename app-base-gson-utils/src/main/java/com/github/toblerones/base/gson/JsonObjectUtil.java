package com.github.toblerones.base.gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.Properties;
import java.util.StringTokenizer;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;


public class JsonObjectUtil {
	
	public static final String DEFAULT_JSON_OBJECT_CONFIG_FILE="json_object.properties";
	
	public static final String ENV_JSON_OBJECT_PROPERTIES="JSON_OBJECT_PROPERTIES";
	public static final String ENV_JSON_OBJECT_DEFAULT_DATA_DIR="JSON_OBJECT_DEFAULT_DATA_DIR";
	
	public static final String TYPE_ADAPTERS_KEY="type.adapters";
	public static final String DATE_FORMAT_KEY="date.format";
	public static final String DATA_DIR_KEY="data.dir";
	public static final String CLASSPATH_PREFIX_KEY="classpath.prefix";
	public static final String DATA_FILE_SUFFIX_KEY="data.file.surfix";
	public static final String DATA_FILE_PREFIX_KEY="data.file.prefix";
	
	protected static Gson gson=null;
	
	public static String jasonDataFileRoot=".";
	public static String classpathPrefix="json-data";
	public static String dataFileSurfix="json";
	public static String dataFilePrefix="";
	public static String dateFormat="dd/MM/yyyy";
	
	
	static{
		// try to find the configure file on classpath - highest priority
		InputStream configInputStream=JsonObjectUtil.class.getClassLoader().getResourceAsStream(DEFAULT_JSON_OBJECT_CONFIG_FILE);
		if(configInputStream==null){
			String jsonObjectConfigueFilePath=System.getenv(ENV_JSON_OBJECT_PROPERTIES);
			if(jsonObjectConfigueFilePath!=null){
				// try to find the configue file based on ENVIRONMENT setting "JSON_OBJECT_PROPERTIES"
				try {
					configInputStream=new FileInputStream(new File(jsonObjectConfigueFilePath));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
			}
			
			// try to find the json object default data dir from ENVIRONMENT setting "JSON_OBJECT_DEFAULT_DATA_DIR"
			String envDefaultDataDir=System.getenv(ENV_JSON_OBJECT_DEFAULT_DATA_DIR);
			if(StringUtils.isNotBlank(envDefaultDataDir)){
				jasonDataFileRoot=envDefaultDataDir;
			}
			
		}
		
		GsonBuilder gsonBuilder=new GsonBuilder().setPrettyPrinting();
		if(configInputStream!=null){

			Properties properties=new Properties();
			try {
				properties.load(configInputStream);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// handle data directory
			if(properties.getProperty(DATA_DIR_KEY)!=null && properties.getProperty(DATA_DIR_KEY).trim().length()>0){
				jasonDataFileRoot=properties.getProperty(DATA_DIR_KEY).trim();
			} else{
				// try to find the json object default data dir from ENVIRONMENT setting "JSON_OBJECT_DEFAULT_DATA_DIR"
				String envDefaultDataDir=System.getenv(ENV_JSON_OBJECT_DEFAULT_DATA_DIR);
				if(StringUtils.isNotBlank(envDefaultDataDir)){
					jasonDataFileRoot=envDefaultDataDir;
				}
			}
			
			if(properties.getProperty(CLASSPATH_PREFIX_KEY)!=null ){
				classpathPrefix=properties.getProperty(CLASSPATH_PREFIX_KEY).trim();
			}
			
			if(properties.getProperty(DATA_FILE_SUFFIX_KEY)!=null){
				dataFileSurfix=properties.getProperty(DATA_FILE_SUFFIX_KEY).trim();
			}
			
			if(properties.getProperty(DATA_FILE_PREFIX_KEY)!=null){
				dataFilePrefix=properties.getProperty(DATA_FILE_PREFIX_KEY).trim();
			}
			
			System.out.println(DATA_DIR_KEY+"="+jasonDataFileRoot);
			
			
			// handle Type Adapters
			if(properties.getProperty(TYPE_ADAPTERS_KEY)!=null && properties.getProperty(TYPE_ADAPTERS_KEY).trim().length()>0){
				String typeAdaptersString=properties.getProperty(TYPE_ADAPTERS_KEY);
				StringTokenizer tokenizer=new StringTokenizer(typeAdaptersString,";");
				while(tokenizer.hasMoreTokens()){
					String token=tokenizer.nextToken();
					String[] keyValue=token.split(":");
					System.out.println(TYPE_ADAPTERS_KEY+" key="+keyValue[0]);
					System.out.println(TYPE_ADAPTERS_KEY+" value="+keyValue[1]);
					try {
						gsonBuilder.registerTypeAdapter(Class.forName(keyValue[0]), Class.forName(keyValue[1]).newInstance());
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					} catch (InstantiationException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					}

				}
			}
			
			
			// handle date format
			if(properties.getProperty(DATE_FORMAT_KEY)!=null && properties.getProperty(DATE_FORMAT_KEY).trim().length()>0){
				dateFormat=properties.getProperty(DATE_FORMAT_KEY);
				System.out.println(DATE_FORMAT_KEY+"="+dateFormat);	

			}

			
			
		}
		gsonBuilder.setDateFormat(dateFormat);
		gson=gsonBuilder.create();

	}	

	
	public static <T> T loadObjectFromClassPathJsonFileBasedOnCallerClassAndMethod(Class<T> type){
		T result=null;
		try {
			String callerClassAndMethod=null;
			StackTraceElement[] stackTraceElements=Thread.currentThread().getStackTrace();
			StackTraceElement selectedStackTraceElement=null;
			for (int i=0;i<stackTraceElements.length;i++) {
				StackTraceElement stackTraceElement=stackTraceElements[i];
				if(stackTraceElement.getClassName().equals(JsonObjectUtil.class.getName())){
					selectedStackTraceElement=stackTraceElements[i+1];
					break;
				}
			}
			String className=selectedStackTraceElement.getClassName();
			String simepleName=className.substring(className.lastIndexOf(".")+1);
			String methodName=selectedStackTraceElement.getMethodName();
			callerClassAndMethod=simepleName+"."+methodName;
			System.out.println("result="+callerClassAndMethod);	
			
			if(StringUtils.isNotBlank(classpathPrefix)){
				callerClassAndMethod=classpathPrefix+"/"+callerClassAndMethod;
			}
			
			String dataFileName=callerClassAndMethod;
			dataFileName=handleDataFileName(dataFileName);
			InputStream file=JsonObjectUtil.class.getClassLoader().getResourceAsStream(dataFileName);
			if(file==null){
				StringBuffer errorMessage=new StringBuffer().append("cannot find dataFile "+dataFileName+" from classpath. ");
				dataFileName=simepleName;
				dataFileName=handleDataFileName(dataFileName);
				file=JsonObjectUtil.class.getClassLoader().getResourceAsStream(dataFileName);
				if(file==null){
					errorMessage.append("cannot find dataFile "+dataFileName+" from classpath. ");
					throw new RuntimeException(errorMessage.toString());
				}
			}
			
			InputStreamReader inputStreamReader=new InputStreamReader(file);
			
			char[] contents=new char[file.available()];
			inputStreamReader.read(contents);
			inputStreamReader.close();
			file.close();
			String srcJsonString=new String(contents);	
			
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return result;
		
	}
	
	public static <T> T loadObjectFromFileSystemJsonFileBasedOnCallerClassAndMethod(Class<T> type){
		T result=null;
		try {
			String callerClassAndMethod=null;
			StackTraceElement[] stackTraceElements=Thread.currentThread().getStackTrace();
			StackTraceElement selectedStackTraceElement=null;
			for (int i=0;i<stackTraceElements.length;i++) {
				StackTraceElement stackTraceElement=stackTraceElements[i];
				if(stackTraceElement.getClassName().equals(JsonObjectUtil.class.getName())){
					selectedStackTraceElement=stackTraceElements[i+1];
					break;
				}
			}
			String className=selectedStackTraceElement.getClassName();
			String simepleName=className.substring(className.lastIndexOf(".")+1);
			String methodName=selectedStackTraceElement.getMethodName();
			callerClassAndMethod=simepleName+"."+methodName;
			System.out.println("result="+callerClassAndMethod);			
			
			String dataFileName=callerClassAndMethod;
			dataFileName=handleDataFileName(dataFileName);
			
			File dataFile=new File(jasonDataFileRoot+File.separator+dataFileName);
			if(!dataFile.exists()){
				StringBuffer errorMessage=new StringBuffer().append("cannot find dataFile '"+dataFile.getAbsolutePath()+ "'. ");
				dataFileName=simepleName;
				dataFileName=handleDataFileName(dataFileName);
				
				dataFile=new File(jasonDataFileRoot+File.separator+dataFileName);
				if(!dataFile.exists()){
					errorMessage.append("cannot find dataFile '"+dataFile.getAbsolutePath()+ "'");
					throw new RuntimeException(errorMessage.toString());
				}
			}
			InputStream file=new FileInputStream(dataFile);
			InputStreamReader inputStreamReader=new InputStreamReader(file);
			
			char[] contents=new char[file.available()];
			inputStreamReader.read(contents);
			inputStreamReader.close();
			file.close();
			String srcJsonString=new String(contents);	
			System.out.println(srcJsonString);
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return result;
		
	}	
	
	public static <T> T loadObjectFromClassPathJsonFile(String dataFileName,Class<T> type){
		T result=null;
		try {
			
			dataFileName=handleDataFileName(dataFileName);
			
			if(StringUtils.isNotBlank(classpathPrefix)){
				dataFileName=classpathPrefix+"/"+dataFileName;
			}			

			if(JsonObjectUtil.class.getClassLoader().getResource(dataFileName)==null){
				throw new RuntimeException("Cannot find file '"+dataFileName+"' from classpath");
			}
			File file=new File(JsonObjectUtil.class.getClassLoader().getResource(dataFileName).getFile());
			
			String srcJsonString=FileUtils.readFileToString(file);		
			
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return result;
		
	}
	
	public static String loadStringFromClassPathJsonFile(String dataFileName){
		String srcJsonString = "";
		try {
			dataFileName=handleDataFileName(dataFileName);
			if(StringUtils.isNotBlank(classpathPrefix)){
				dataFileName=classpathPrefix+"/"+dataFileName;
			}			

			if(JsonObjectUtil.class.getClassLoader().getResource(dataFileName)==null){
				throw new RuntimeException("Cannot find file '"+dataFileName+"' from classpath");
			}
			File file=new File(JsonObjectUtil.class.getClassLoader().getResource(dataFileName).getFile());
			
			srcJsonString=FileUtils.readFileToString(file);		
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return srcJsonString;
		
	}

	@SuppressWarnings("unchecked")
	public static <T> T loadObjectFromClassPathJsonFileWithGenericType(String dataFileName, Type type){
		T result=null;
		try {
			
			dataFileName=handleDataFileName(dataFileName);
			
			if(StringUtils.isNotBlank(classpathPrefix)){
				dataFileName=classpathPrefix+"/"+dataFileName;
			}			

			if(JsonObjectUtil.class.getClassLoader().getResource(dataFileName)==null){
				throw new RuntimeException("Cannot find file '"+dataFileName+"' from classpath");
			}
			File file=new File(JsonObjectUtil.class.getClassLoader().getResource(dataFileName).getFile());
			
			String srcJsonString=FileUtils.readFileToString(file);		
			
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return result;
		
	}
	
	public static <T> T loadObjectFromFileSystemJsonFileFullPath(String dataFileName,Class<T> type){
		T result=null;
		try {
			File file=new File(dataFileName);
			String srcJsonString=FileUtils.readFileToString(file);		
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return result;
		
	}		
	
	public static String loadStringFromFileSystemJsonFileFullPath(String dataFileName){
		String result=null;
		try {
			File file=new File(dataFileName);
			result=FileUtils.readFileToString(file);		
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return result;
		
	}		

	public static <T> T convertStringToObject(String str, Class<T> type){
		T result=null;
		try {
			result=gson.fromJson(str,type);				
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return result;
	}	
	
	public static <T> T loadObjectFromFileSystemJsonFileRelativePath(String dataFileName,Class<T> type){
		T result=null;
		try {
			dataFileName=handleDataFileName(dataFileName);		
			dataFileName=jasonDataFileRoot+File.separator+dataFileName;
			File file=new File(dataFileName);
			String srcJsonString=FileUtils.readFileToString(file);		
			result=(T)gson.fromJson(srcJsonString, type);
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return result;		
	}		
	
	public static <T> void saveObjectToFileSystemJsonFileBasedOnCallerClassAndMethod(Object object){
		try {
			String callerClassAndMethod=null;
			StackTraceElement[] stackTraceElements=Thread.currentThread().getStackTrace();
			StackTraceElement selectedStackTraceElement=null;
			for (int i=0;i<stackTraceElements.length;i++) {
				StackTraceElement stackTraceElement=stackTraceElements[i];
				if(stackTraceElement.getClassName().equals(JsonObjectUtil.class.getName())){
					selectedStackTraceElement=stackTraceElements[i+1];
					break;
				}
			}
			String className=selectedStackTraceElement.getClassName();
			String simepleName=className.substring(className.lastIndexOf(".")+1);
			String methodName=selectedStackTraceElement.getMethodName();
			callerClassAndMethod=simepleName+"."+methodName;
			System.out.println("result="+callerClassAndMethod);				
			
			String dataFileName=callerClassAndMethod;
			dataFileName=handleDataFileName(dataFileName);
			File dataFile=new File(jasonDataFileRoot+File.separator+dataFileName);

			String jsonString=gson.toJson(object);
			System.out.println("jsonString=\n"+jsonString);			
			FileUtils.writeStringToFile(dataFile, jsonString);
			System.out.println("save json string to file '"+dataFile.getAbsolutePath()+"'");				
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
	}
	
	public static <T> void saveObjectToJsonFile(Object object, String outputFile){
		try {
			File file=new File(outputFile);
			
			String jsonString=gson.toJson(object);
			System.out.println("jsonString=\n"+jsonString);			
			FileUtils.writeStringToFile(file, jsonString);
			System.out.println("save json string to file '"+outputFile+"'");				
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}	
	
	public static String convertObjectToString(Object object){
		String result = "";
		try {
			result=gson.toJson(object);
//			System.out.println("jsonString=\n"+result);					
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		}		
		return result;
	}	
	
	public static Object convertStringToObject(String str, String clazz){
		Object result=null;
		try {
			result=gson.fromJson(str,Class.forName(clazz));				
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return result;
	}	
	
	public static <T> String generateSampleData(Class<T> clazz){
		try {
			Integer i = 10;
			Long l = 100L;
			Double d = 3.0;
			T obj = clazz.newInstance();
			Field[] fields = obj.getClass().getDeclaredFields();
			for(Field field : fields){
				field.setAccessible(true);
				if(field.getType().equals(String.class)){
					field.set(obj, field.getName());
				}
				if(field.getType().equals(Integer.class)){
					field.set(obj, i++);
				}
				if(field.getType().equals(Long.class)){
					field.set(obj, l++);
				}
				if(field.getType().equals(Double.class)){
					field.set(obj, d++);
				}
				if(field.getType().equals(Boolean.class)){
					field.set(obj, false);
				}
			}
			return gson.toJson(obj);
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	private static String handleDataFileName(String dataFileName){
		if(StringUtils.isNotBlank(dataFilePrefix) & !dataFileName.startsWith(dataFilePrefix)){
			dataFileName=dataFilePrefix+dataFileName;
		}
		if(StringUtils.isNotBlank(dataFileSurfix) & !dataFileName.endsWith(dataFileSurfix)){
			dataFileName=dataFileName+"."+dataFileSurfix;
		}
		
		return dataFileName;
	}


}
