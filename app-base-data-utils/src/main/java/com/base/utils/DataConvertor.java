package com.base.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DataConvertor {
	private static String CN_DATE_FORMATER="yyyy-MM-dd";
	
	public static Date convertCNStringToDate(String strDate){
		SimpleDateFormat sdf=new SimpleDateFormat(CN_DATE_FORMATER);
		Date date=null;
		try{
			date=sdf.parse(strDate);
		}catch(Exception e){
			e.printStackTrace();
		}
		return date;
	}
	
	public static String convertDateToCNString(Date date){
		SimpleDateFormat sdf=new SimpleDateFormat(CN_DATE_FORMATER);
		return sdf.format(date);
	}
}
