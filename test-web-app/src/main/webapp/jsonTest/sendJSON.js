function sendJSONandGetResult(reqType,url,callBackFunction)
{
    $("#result").text("");
    var jsonData = $("#dataToSend").val();
    $.ajax({
            type: reqType,
			dataType: "json",
			contentType: "application/json; charset=utf-8", 
            //url:  "/multiapp/multiapp",
			url: url,
            data:jsonData,
			success: callBackFunction,
            error:function(xhr,err)
            {
                 alert('Failed,readyState: '+xhr.readyState+'status: '+xhr.status + 'responseText: '+xhr.responseText);
            }
     });
}

function sendJSONandGetResultForHSBCStaffLogon(reqType,url,callBackFunction)
{
    $("#result").text("");
    var jsonData = JSON.stringify(wfLogonRequestJSON);
    $.ajax({
            type: reqType,
			dataType: "json",
			contentType: "application/json; charset=utf-8", 
            //url:  "/multiapp/multiapp",
			url: url,
            data:jsonData,
			success: callBackFunction,
            error:function(xhr,err)
            {
                 alert('Failed,readyState: '+xhr.readyState+'status: '+xhr.status + 'responseText: '+xhr.responseText);
            }
     });
}

function traverse(o,strTab ) {
    strTab = strTab + "&nbsp;&nbsp;&nbsp;&nbsp;"
    for (i in o) {
    	//alert(i);
        if (typeof(o[i])=="object") {
            $("#result").append("<p>" + strTab + i +"{</p>")
            traverse(o[i], strTab );
            $("#result").append("<p>" + strTab + "}</p>")
        }
        else {
            $("#result").append("<p>" + strTab +  i +" : " +o[i]+"</p>")
        }
    }
}

function traverse2(data) {
	//alert(data);
	var tt = "";
	$.each(data, function(k, v) {
		tt += k + " : " + v + "<br/>";
	})
	$("#result").html(tt);
}

function traverse3(data) {
	//alert(data);
	$("#result").html(data);
}
