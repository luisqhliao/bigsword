package test.web.app.request.obj;

import com.github.toblerones.web.app.base.object.JsonMessageReqBase;

public class CaseARequestObj extends JsonMessageReqBase{
	private String textOne;

	public String getTextOne() {
		return textOne;
	}

	public void setTextOne(String textOne) {
		this.textOne = textOne;
	}
}	
