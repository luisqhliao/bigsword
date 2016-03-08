package com.bigsword.eleave.domain;

import java.math.BigDecimal;
import java.util.Map;

public class LeaveProfile {
	private String staffId;
	private String yearOfOperation;
	
	private Map<String, BigDecimal> orignalLeaves;
	private Map<String, BigDecimal> outstandingLeaves;
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getYearOfOperation() {
		return yearOfOperation;
	}
	public void setYearOfOperation(String yearOfOperation) {
		this.yearOfOperation = yearOfOperation;
	}
	public Map<String, BigDecimal> getOrignalLeaves() {
		return orignalLeaves;
	}
	public void setOrignalLeaves(Map<String, BigDecimal> orignalLeaves) {
		this.orignalLeaves = orignalLeaves;
	}
	public Map<String, BigDecimal> getOutstandingLeaves() {
		return outstandingLeaves;
	}
	public void setOutstandingLeaves(Map<String, BigDecimal> outstandingLeaves) {
		this.outstandingLeaves = outstandingLeaves;
	}
	
	
}
