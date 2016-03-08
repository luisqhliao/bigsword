package com.bigsword.eleave.web.json.request;

import com.bigsword.eleave.web.json.object.RequestBase;

public class JsonLeaveListRequest extends RequestBase{
	private String year;

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
	
}
