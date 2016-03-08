package com.bigsword.eleave.domain;

import java.util.Date;

public class User {
	
	private String staffId;
	private String status;
	
	private String gender;
	private String firstName;
	private String middleName;
	private String lastName;	
	
	private String email;
	private String level;
	
	private Date dateOfEffective;
	private Date dateOfJoined;
	private Date dateOfProbationEnding;
	private Date dateOfLastWorking;
	
	private String officePhoneNumber;

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Date getDateOfEffective() {
		return dateOfEffective;
	}

	public void setDateOfEffective(Date dateOfEffective) {
		this.dateOfEffective = dateOfEffective;
	}

	public Date getDateOfJoined() {
		return dateOfJoined;
	}

	public void setDateOfJoined(Date dateOfJoined) {
		this.dateOfJoined = dateOfJoined;
	}

	public Date getDateOfProbationEnding() {
		return dateOfProbationEnding;
	}

	public void setDateOfProbationEnding(Date dateOfProbationEnding) {
		this.dateOfProbationEnding = dateOfProbationEnding;
	}

	public Date getDateOfLastWorking() {
		return dateOfLastWorking;
	}

	public void setDateOfLastWorking(Date dateOfLastWorking) {
		this.dateOfLastWorking = dateOfLastWorking;
	}

	public String getOfficePhoneNumber() {
		return officePhoneNumber;
	}

	public void setOfficePhoneNumber(String officePhoneNumber) {
		this.officePhoneNumber = officePhoneNumber;
	}
	
	
}
