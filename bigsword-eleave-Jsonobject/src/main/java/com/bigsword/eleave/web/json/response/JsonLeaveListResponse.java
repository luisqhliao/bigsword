package com.bigsword.eleave.web.json.response;

import com.bigsword.eleave.web.json.object.JsonObjLeaveList;
import com.bigsword.eleave.web.json.object.ResponseBase;

public class JsonLeaveListResponse extends ResponseBase{
	private JsonObjLeaveList data;

	public JsonObjLeaveList getData() {
		return data;
	}

	public void setData(JsonObjLeaveList data) {
		this.data = data;
	}
	
	
}
