package com.bigsword.eleave.leave.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.repository.ProcessDefinition;
import org.apache.ibatis.exceptions.PersistenceException;

import com.bigsword.eleave.activiti.spi.ActivitiEngineBpmService;

public class ActivitiEngineBpmServiceImpl implements ActivitiEngineBpmService {

	private RepositoryService repositoryService;
	private RuntimeService runtimeService;
	@Override
	public String[] getRunningSystemsList() {
		List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery().list();
		Set<String> systemNameList = null;
		if(processDefinitions!=null){
			systemNameList=new HashSet<String>();
			for(ProcessDefinition processDefinition:processDefinitions){
				systemNameList.add(processDefinition.getName());
			}
			return (String[]) systemNameList.toArray();
		}
		return null;
	}

	@Override
	public Boolean deployWorkflowSystem(String systemKey) {

		// Create Activiti process engine
		String deploymentId = repositoryService
				  .createDeployment()
				  .addClasspathResource("activiti/"+systemKey+".bpmn20.xml.bpmn")
				  .deploy()
				  .getId();
		return true;
	}

	@Override
	public List<String> getRunningSystemId() {
		List<ProcessDefinition> processDefinitions = repositoryService
				.createProcessDefinitionQuery().list();
		List<String> systemNameId = null;
		if(processDefinitions!=null){
			systemNameId=new ArrayList<String>();
			for(ProcessDefinition processDefinition:processDefinitions){
				systemNameId.add(processDefinition.getId());
			}
		}
		return systemNameId;
	}

	@Override
	public Boolean shutDownWorkFlowSystem(String systemKey) {
		
		List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery().processDefinitionKey(systemKey).list();
		//the worlflow has been deployed.
		if(processDefinitions!=null && processDefinitions.size()>0){
			for(ProcessDefinition processDefinition:processDefinitions){
				repositoryService.suspendProcessDefinitionById(processDefinition.getId());
			}
		}
		return true;
	}

	@Override
	public Boolean startUpWorkFlowSystem(String systemKey) {
		List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery().processDefinitionKey(systemKey).list();
		//the worlflow has been deployed.
		if(processDefinitions!=null && processDefinitions.size()>0){
			for(ProcessDefinition processDefinition:processDefinitions){
				repositoryService.activateProcessDefinitionById(processDefinition.getId());
			}
		}
		return true;
	}

}
