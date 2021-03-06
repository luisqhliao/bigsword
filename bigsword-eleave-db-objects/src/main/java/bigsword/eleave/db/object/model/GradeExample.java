package bigsword.eleave.db.object.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

public class GradeExample {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	protected String orderByClause;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	protected boolean distinct;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	protected List<Criteria> oredCriteria;

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public GradeExample() {
		oredCriteria = new ArrayList<Criteria>();
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public boolean isDistinct() {
		return distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public List<Criteria> getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public Criteria or() {
		Criteria criteria = createCriteriaInternal();
		oredCriteria.add(criteria);
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public void clear() {
		oredCriteria.clear();
		orderByClause = null;
		distinct = false;
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	protected abstract static class GeneratedCriteria {
		protected List<Criterion> criteria;

		protected GeneratedCriteria() {
			super();
			criteria = new ArrayList<Criterion>();
		}

		public boolean isValid() {
			return criteria.size() > 0;
		}

		public List<Criterion> getAllCriteria() {
			return criteria;
		}

		public List<Criterion> getCriteria() {
			return criteria;
		}

		protected void addCriterion(String condition) {
			if (condition == null) {
				throw new RuntimeException("Value for condition cannot be null");
			}
			criteria.add(new Criterion(condition));
		}

		protected void addCriterion(String condition, Object value, String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property + " cannot be null");
			}
			criteria.add(new Criterion(condition, value));
		}

		protected void addCriterion(String condition, Object value1, Object value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property + " cannot be null");
			}
			criteria.add(new Criterion(condition, value1, value2));
		}

		public Criteria andIdIsNull() {
			addCriterion("ID is null");
			return (Criteria) this;
		}

		public Criteria andIdIsNotNull() {
			addCriterion("ID is not null");
			return (Criteria) this;
		}

		public Criteria andIdEqualTo(String value) {
			addCriterion("ID =", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotEqualTo(String value) {
			addCriterion("ID <>", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdGreaterThan(String value) {
			addCriterion("ID >", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdGreaterThanOrEqualTo(String value) {
			addCriterion("ID >=", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdLessThan(String value) {
			addCriterion("ID <", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdLessThanOrEqualTo(String value) {
			addCriterion("ID <=", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdLike(String value) {
			addCriterion("ID like", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotLike(String value) {
			addCriterion("ID not like", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdIn(List<String> values) {
			addCriterion("ID in", values, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotIn(List<String> values) {
			addCriterion("ID not in", values, "id");
			return (Criteria) this;
		}

		public Criteria andIdBetween(String value1, String value2) {
			addCriterion("ID between", value1, value2, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotBetween(String value1, String value2) {
			addCriterion("ID not between", value1, value2, "id");
			return (Criteria) this;
		}

		public Criteria andGradeIdIsNull() {
			addCriterion("GRADE_ID is null");
			return (Criteria) this;
		}

		public Criteria andGradeIdIsNotNull() {
			addCriterion("GRADE_ID is not null");
			return (Criteria) this;
		}

		public Criteria andGradeIdEqualTo(String value) {
			addCriterion("GRADE_ID =", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdNotEqualTo(String value) {
			addCriterion("GRADE_ID <>", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdGreaterThan(String value) {
			addCriterion("GRADE_ID >", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdGreaterThanOrEqualTo(String value) {
			addCriterion("GRADE_ID >=", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdLessThan(String value) {
			addCriterion("GRADE_ID <", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdLessThanOrEqualTo(String value) {
			addCriterion("GRADE_ID <=", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdLike(String value) {
			addCriterion("GRADE_ID like", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdNotLike(String value) {
			addCriterion("GRADE_ID not like", value, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdIn(List<String> values) {
			addCriterion("GRADE_ID in", values, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdNotIn(List<String> values) {
			addCriterion("GRADE_ID not in", values, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdBetween(String value1, String value2) {
			addCriterion("GRADE_ID between", value1, value2, "gradeId");
			return (Criteria) this;
		}

		public Criteria andGradeIdNotBetween(String value1, String value2) {
			addCriterion("GRADE_ID not between", value1, value2, "gradeId");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsIsNull() {
			addCriterion("WORKING_YEARS is null");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsIsNotNull() {
			addCriterion("WORKING_YEARS is not null");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsEqualTo(Integer value) {
			addCriterion("WORKING_YEARS =", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsNotEqualTo(Integer value) {
			addCriterion("WORKING_YEARS <>", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsGreaterThan(Integer value) {
			addCriterion("WORKING_YEARS >", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsGreaterThanOrEqualTo(Integer value) {
			addCriterion("WORKING_YEARS >=", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsLessThan(Integer value) {
			addCriterion("WORKING_YEARS <", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsLessThanOrEqualTo(Integer value) {
			addCriterion("WORKING_YEARS <=", value, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsIn(List<Integer> values) {
			addCriterion("WORKING_YEARS in", values, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsNotIn(List<Integer> values) {
			addCriterion("WORKING_YEARS not in", values, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsBetween(Integer value1, Integer value2) {
			addCriterion("WORKING_YEARS between", value1, value2, "workingYears");
			return (Criteria) this;
		}

		public Criteria andWorkingYearsNotBetween(Integer value1, Integer value2) {
			addCriterion("WORKING_YEARS not between", value1, value2, "workingYears");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveIsNull() {
			addCriterion("ANNUAL_LEAVE is null");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveIsNotNull() {
			addCriterion("ANNUAL_LEAVE is not null");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveEqualTo(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE =", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveNotEqualTo(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE <>", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveGreaterThan(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE >", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveGreaterThanOrEqualTo(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE >=", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveLessThan(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE <", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveLessThanOrEqualTo(BigDecimal value) {
			addCriterion("ANNUAL_LEAVE <=", value, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveIn(List<BigDecimal> values) {
			addCriterion("ANNUAL_LEAVE in", values, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveNotIn(List<BigDecimal> values) {
			addCriterion("ANNUAL_LEAVE not in", values, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveBetween(BigDecimal value1, BigDecimal value2) {
			addCriterion("ANNUAL_LEAVE between", value1, value2, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andAnnualLeaveNotBetween(BigDecimal value1, BigDecimal value2) {
			addCriterion("ANNUAL_LEAVE not between", value1, value2, "annualLeave");
			return (Criteria) this;
		}

		public Criteria andCreateDateIsNull() {
			addCriterion("CREATE_DATE is null");
			return (Criteria) this;
		}

		public Criteria andCreateDateIsNotNull() {
			addCriterion("CREATE_DATE is not null");
			return (Criteria) this;
		}

		public Criteria andCreateDateEqualTo(Date value) {
			addCriterion("CREATE_DATE =", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateNotEqualTo(Date value) {
			addCriterion("CREATE_DATE <>", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateGreaterThan(Date value) {
			addCriterion("CREATE_DATE >", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
			addCriterion("CREATE_DATE >=", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateLessThan(Date value) {
			addCriterion("CREATE_DATE <", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateLessThanOrEqualTo(Date value) {
			addCriterion("CREATE_DATE <=", value, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateIn(List<Date> values) {
			addCriterion("CREATE_DATE in", values, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateNotIn(List<Date> values) {
			addCriterion("CREATE_DATE not in", values, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateBetween(Date value1, Date value2) {
			addCriterion("CREATE_DATE between", value1, value2, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateDateNotBetween(Date value1, Date value2) {
			addCriterion("CREATE_DATE not between", value1, value2, "createDate");
			return (Criteria) this;
		}

		public Criteria andCreateByIsNull() {
			addCriterion("CREATE_BY is null");
			return (Criteria) this;
		}

		public Criteria andCreateByIsNotNull() {
			addCriterion("CREATE_BY is not null");
			return (Criteria) this;
		}

		public Criteria andCreateByEqualTo(String value) {
			addCriterion("CREATE_BY =", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByNotEqualTo(String value) {
			addCriterion("CREATE_BY <>", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByGreaterThan(String value) {
			addCriterion("CREATE_BY >", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByGreaterThanOrEqualTo(String value) {
			addCriterion("CREATE_BY >=", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByLessThan(String value) {
			addCriterion("CREATE_BY <", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByLessThanOrEqualTo(String value) {
			addCriterion("CREATE_BY <=", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByLike(String value) {
			addCriterion("CREATE_BY like", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByNotLike(String value) {
			addCriterion("CREATE_BY not like", value, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByIn(List<String> values) {
			addCriterion("CREATE_BY in", values, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByNotIn(List<String> values) {
			addCriterion("CREATE_BY not in", values, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByBetween(String value1, String value2) {
			addCriterion("CREATE_BY between", value1, value2, "createBy");
			return (Criteria) this;
		}

		public Criteria andCreateByNotBetween(String value1, String value2) {
			addCriterion("CREATE_BY not between", value1, value2, "createBy");
			return (Criteria) this;
		}

		public Criteria andUpdateDateIsNull() {
			addCriterion("UPDATE_DATE is null");
			return (Criteria) this;
		}

		public Criteria andUpdateDateIsNotNull() {
			addCriterion("UPDATE_DATE is not null");
			return (Criteria) this;
		}

		public Criteria andUpdateDateEqualTo(Date value) {
			addCriterion("UPDATE_DATE =", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateNotEqualTo(Date value) {
			addCriterion("UPDATE_DATE <>", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateGreaterThan(Date value) {
			addCriterion("UPDATE_DATE >", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateGreaterThanOrEqualTo(Date value) {
			addCriterion("UPDATE_DATE >=", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateLessThan(Date value) {
			addCriterion("UPDATE_DATE <", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateLessThanOrEqualTo(Date value) {
			addCriterion("UPDATE_DATE <=", value, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateIn(List<Date> values) {
			addCriterion("UPDATE_DATE in", values, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateNotIn(List<Date> values) {
			addCriterion("UPDATE_DATE not in", values, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateBetween(Date value1, Date value2) {
			addCriterion("UPDATE_DATE between", value1, value2, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateDateNotBetween(Date value1, Date value2) {
			addCriterion("UPDATE_DATE not between", value1, value2, "updateDate");
			return (Criteria) this;
		}

		public Criteria andUpdateByIsNull() {
			addCriterion("UPDATE_BY is null");
			return (Criteria) this;
		}

		public Criteria andUpdateByIsNotNull() {
			addCriterion("UPDATE_BY is not null");
			return (Criteria) this;
		}

		public Criteria andUpdateByEqualTo(String value) {
			addCriterion("UPDATE_BY =", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByNotEqualTo(String value) {
			addCriterion("UPDATE_BY <>", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByGreaterThan(String value) {
			addCriterion("UPDATE_BY >", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByGreaterThanOrEqualTo(String value) {
			addCriterion("UPDATE_BY >=", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByLessThan(String value) {
			addCriterion("UPDATE_BY <", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByLessThanOrEqualTo(String value) {
			addCriterion("UPDATE_BY <=", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByLike(String value) {
			addCriterion("UPDATE_BY like", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByNotLike(String value) {
			addCriterion("UPDATE_BY not like", value, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByIn(List<String> values) {
			addCriterion("UPDATE_BY in", values, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByNotIn(List<String> values) {
			addCriterion("UPDATE_BY not in", values, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByBetween(String value1, String value2) {
			addCriterion("UPDATE_BY between", value1, value2, "updateBy");
			return (Criteria) this;
		}

		public Criteria andUpdateByNotBetween(String value1, String value2) {
			addCriterion("UPDATE_BY not between", value1, value2, "updateBy");
			return (Criteria) this;
		}
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table grade
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	public static class Criterion {
		private String condition;
		private Object value;
		private Object secondValue;
		private boolean noValue;
		private boolean singleValue;
		private boolean betweenValue;
		private boolean listValue;
		private String typeHandler;

		public String getCondition() {
			return condition;
		}

		public Object getValue() {
			return value;
		}

		public Object getSecondValue() {
			return secondValue;
		}

		public boolean isNoValue() {
			return noValue;
		}

		public boolean isSingleValue() {
			return singleValue;
		}

		public boolean isBetweenValue() {
			return betweenValue;
		}

		public boolean isListValue() {
			return listValue;
		}

		public String getTypeHandler() {
			return typeHandler;
		}

		protected Criterion(String condition) {
			super();
			this.condition = condition;
			this.typeHandler = null;
			this.noValue = true;
		}

		protected Criterion(String condition, Object value, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.typeHandler = typeHandler;
			if (value instanceof List<?>) {
				this.listValue = true;
			} else {
				this.singleValue = true;
			}
		}

		protected Criterion(String condition, Object value) {
			this(condition, value, null);
		}

		protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.secondValue = secondValue;
			this.typeHandler = typeHandler;
			this.betweenValue = true;
		}

		protected Criterion(String condition, Object value, Object secondValue) {
			this(condition, value, secondValue, null);
		}
	}

	/**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table grade
     *
     * @mbggenerated do_not_delete_during_merge Wed Feb 24 00:32:03 CST 2016
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }
}