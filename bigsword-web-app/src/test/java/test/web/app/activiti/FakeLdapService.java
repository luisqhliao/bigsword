package test.web.app.activiti;


public class FakeLdapService {
	public String findManagerForEmployee(String employee) {
		 if(employee.equals("1")){
			 return "1";
		 }
		    return "2";
	}
}
