package test.web.app.activiti;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.task.Task;
import org.activiti.engine.test.ActivitiRule;
import org.activiti.engine.test.Deployment;
import org.apache.ibatis.exceptions.PersistenceException;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnualLeaveActiviti{
	
	ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext(
			"activiti/activiti-configuration.xml");
//	@Rule
//	public ActivitiRule activitiRule = new ActivitiRule();
	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private TaskService taskService;

	@Autowired
	@Rule
	public ActivitiRule activitiSpringRule;

	  @Test
	  @Deployment
	public void ruleAnnualLeaveExample() {
		  
		  
		RepositoryService repositoryService =
				  (RepositoryService) applicationContext.getBean("repositoryService");
//		String deploymentId = repositoryService
//				  .createDeployment()
//				  .addClasspathResource("activiti/AnnualLeave.bpmn20.xml.bpmn")
//				  .deploy()
//				  .getId();
		ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
		RuntimeService runtimeService = processEngine.getRuntimeService();
		TaskService taskService = processEngine.getTaskService();
//		runtimeService.startProcessInstanceByKey("AnnualLeave");
//		repositoryService.createDeploymentQuery().list();
//		List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery().list();
		List<ProcessDefinition> processDefinitions = repositoryService
				.createProcessDefinitionQuery().processDefinitionKey("AnnualLeave").list();
		System.out.println("size:"+processDefinitions.size());
		
		for(int i=0;i<processDefinitions.size();i++){
			System.out.println("deployment"+processDefinitions.get(i).getId());
//			repositoryService.suspendProcessDefinitionById(processDefinitions.get(i).getId());
//			repositoryService.activateProcessDefinitionById(processDefinitions.get(i).getId());
			try{
//				repositoryService.deleteDeployment(processDefinitions.get(i).getDeploymentId(),true);
			}catch(PersistenceException e){
				e.printStackTrace();
			}
//			repositoryService.suspendProcessDefinitionByKey(process.getKey());
			}
		
		List<Task> taskList = taskService.createTaskQuery().list();
		System.out.println("taskList"+taskList.size());
		
		HashMap<String, Object> variableMap = new HashMap<String, Object>();
        variableMap.put("vacationApproved", true);
        
        HashMap<String, Object> submitMap = new HashMap<String, Object>();
        submitMap.put("emp", "2");
        List<Task> tasks = taskService.createTaskQuery().taskAssignee("2").list();
        tasks =taskService.createTaskQuery().list();
        
//        if(tasks!=null && tasks.size()>0) System.out.println("user2 task: "+tasks.get(0).getId());
        
        List<Task> tasks2 = taskService.createTaskQuery().list();
        for(Task task: tasks2){
//        	System.out.println("user"+task.getAssignee()+": " +task.getId());
//        	System.out.println("owner"+task.getOwner()+": " +task.getId());
        	
        }
        
        if(tasks!=null && tasks.size()>0){
        	 for(Task task: tasks){
             	System.out.println("user"+task.getAssignee()+": " +task.getId());
             	System.out.println("owner"+task.getOwner()+": " +task.getId());
             	
             }
//        	taskService.delegateTask(tasks.get(0).getId(), "1");
        }else{
        	System.out.println("no task");
        }
        
		for(Task task:taskList){
			System.out.println(task.getId());
			System.out.println(task.getName());
//			System.out.println(task.getTaskDefinitionKey());
//			runtimeService.deleteProcessInstance(task.getProcessInstanceId(), "test"); 
//			taskService.complete(task.getId());
			 if("manageHandleAnnualLeaveTask".equals(task.getTaskDefinitionKey())){
				 
				 //taskService.complete(task.getId(),variableMap);
		     }else{
//		    	 taskService.complete(task.getId(),submitMap);
		    	 
		     }
		}
		
		
		
//		System.out.println(taskService.createTaskQuery().count());
	}
	
}
