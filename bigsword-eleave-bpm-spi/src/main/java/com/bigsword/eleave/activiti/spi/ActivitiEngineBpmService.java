package com.bigsword.eleave.activiti.spi;

import java.util.List;

public interface ActivitiEngineBpmService {
	public String[] getRunningSystemsList();
	
	public Boolean deployWorkflowSystem(String bpmnFile);
	
	public List<String> getRunningSystemId();
	
	public Boolean shutDownWorkFlowSystem(String systemKey);
	public Boolean startUpWorkFlowSystem(String systemKey);
	
}
