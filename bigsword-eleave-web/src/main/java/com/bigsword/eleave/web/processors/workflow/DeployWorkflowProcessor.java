package com.bigsword.eleave.web.processors.workflow;

import org.activiti.engine.RepositoryService;
import org.apache.log4j.Logger;

import com.github.toblerones.web.app.base.processor.RequestProcessor;
import com.github.toblerones.web.app.context.WorkContext;

public class DeployWorkflowProcessor implements RequestProcessor{
	private RepositoryService repositoryService;
	
	final static Logger logger = Logger.getLogger(DeployWorkflowProcessor.class);
	
	@Override
	public String process(WorkContext workContext) {
		
		if(logger.isDebugEnabled()){
		    logger.debug("json cmd [DeployProcess]");
		}
		
		// Create Activiti process engine
		String deploymentId = repositoryService
				  .createDeployment()
				  .addClasspathResource("activiti\\AnnualLeave.bpmn20.xml.bpmn")
				  .deploy()
				  .getId();
		System.out.println(deploymentId);
		
		return "DONE";
	}

	public void setRepositoryService(RepositoryService repositoryService) {
		this.repositoryService = repositoryService;
	}
	
	
}
