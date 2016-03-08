package bigsword.eleave.db.persistence;

import bigsword.eleave.db.object.model.Department;
import bigsword.eleave.db.object.model.DepartmentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DepartmentMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int countByExample(DepartmentExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int deleteByExample(DepartmentExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int deleteByPrimaryKey(String deptId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int insert(Department record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int insertSelective(Department record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	List<Department> selectByExample(DepartmentExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	Department selectByPrimaryKey(String deptId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int updateByExampleSelective(@Param("record") Department record, @Param("example") DepartmentExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int updateByExample(@Param("record") Department record, @Param("example") DepartmentExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int updateByPrimaryKeySelective(Department record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table department
	 * @mbggenerated  Mon Mar 07 21:25:18 CST 2016
	 */
	int updateByPrimaryKey(Department record);
}