package com.bigsword.eleave.web.json.request;

import com.bigsword.eleave.web.json.object.JsonObjLeave;
import com.bigsword.eleave.web.json.object.RequestBase;

public class JsonApproveLeaveRequest extends RequestBase{
	private JsonObjLeave jsonleave;

	public JsonObjLeave getJsonleave() {
		return jsonleave;
	}

	public void setJsonleave(JsonObjLeave jsonleave) {
		this.jsonleave = jsonleave;
	} 
	
}
