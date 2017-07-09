$(document).ready(function(){
	bindCreateEvent();
});



function bindCreateEvent(){
	var cl = new CreatePanelObj();
		cl.count = 0;
		deletBtn(cl);
		createBtn(cl);
}


function deletBtn(cl){
	$("#Tabpanel").on("click",".s-closetab",function(){ 
		var perv = $(this).prev();
		var name = $(perv).attr("aria-controls");
		deletPanel(this,name,cl);
	});
}

function deletPanel(that,id,cl){
 	var target = $(".tab-content").find("[id = '" + id + "']");
 	var parent = $(that).parent();
 	var aprev = $(parent).prev().find("a");
  	var value = $(aprev).attr("aria-controls");
  	var state = $(parent).attr("class");
 	$(target).remove();	
 	$(parent).remove();
 	cl.number--;
 	if (0 == cl.number) {
 		cl.count = 0;
 	}
 	//execute activePenel if current panel is active
 	if ("active" == state) {
 		activePanel(value);
 	} 
}

function activePanel(attr){
	$("[aria-controls='"+attr+"']").attr("aria-expanded","true");
	$("[aria-controls='"+attr+"']").parent().attr("class","active");
	$("[id="+attr+"]").addClass("active");
}


/*-----------------------------------------------*/
/* createBtn 中绑定的是弹出框的id值 
/* 即#pop
/*-----------------------------------------------*/
function createBtn(cl){
	$("#pop").on("click",".createbtn",function(){
		var flag = cl.findTagName();
		if (flag) {
		cl.findPanelId();
		cl.createTabtag();
		cl.createTabCont();
		}
	});
}

//createPanelObj 
var CreatePanelObj = function(){
	this.count = 0;
	this.number = 0;
	this.panelname = "tabpanel";
	this.id;
}


CreatePanelObj.prototype.findTagName = function(){
	//if the value is empty, not to create
	var tagName = $("#s-inputip").val().trim();
	console.log(tagName.trim());
	var curtags = $("[role='presentation']");
	var length = curtags.length;
	var child,name; 
	if (!tagName) {
		console.log("the value is empty");
		return false;
	}
	for (var i = 0; i < length; i++) {
		child = $(curtags[i]).find("a");
		name = $(child).text().trim();
		if (tagName === name) {
		console.log("this IP  existed");
		return false;
		}
	}
	this.tagName = tagName;
	return true;
}

CreatePanelObj.prototype.findPanelId = function(){
	//find the id
	var allpanels = $(".tab-content").find("[role='tabpanel']");
	var length =allpanels.length;
	var flag = true;
	var t1,t2;
	if(this.number == 0 || this.count == this.number){
		this.id =this.panelname + this.count;
		this.count++;	
	}else{
		for (var i = 0; i < this.count; i++) {
			t1 = this.panelname + i;
			console.log(t1);
			for (var j = 1; j < length; j++) {
				t2 = $(allpanels[j]).attr("id");
				console.log(t2);
				if (t1 == t2) {
					flag = false;
					console.log("allpanels t2: " + t2, flag);
					break;
				}else{
					flag = true;
				}
			}
			if (flag) {
				this.id = t1;
				console.log("this.count t1: "+t1);
				break;
			}
		}
	}
}

CreatePanelObj.prototype.createTabtag = function() {
	//create dom
	var newtag = $("<li role='presentation'>"
					+"<a href='#"
					+this.id
					+"' aria-controls='"
					+this.id
					+"' role='tab' data-toggle='tab'>"
					+this.tagName
					+"</a><span class='s-closetab'>x</span></li>");
		$("#Tabpanel").find("[role=tablist]").append(newtag);
		this.number++;
		console.log("this.number = "+this.number);
		console.log("this.count = "+this.count);
};

CreatePanelObj.prototype.createTabCont = function() {
	var newpanel = $("<div role='tabpanel' class='tab-pane' id='"
					+this.id
					+"'></div>");
	var part =$("#maintab").find(".muticontent");
	$(part).clone().appendTo(newpanel);
	$("#Tabpanel").find(".tab-content").append(newpanel);

	//changeInputId
	var attr = {
		strattime:"stime",
		endtime:"etime",
		initclue:"initclue"
	}
	for(var x in attr){
		this.changeInputId(newpanel, attr[x]);
	}
};

CreatePanelObj.prototype.changeInputId = function(parent,idname) {
	$(parent).find("[for='" + idname + "']").attr("for",idname+this.count);
	$(parent).find("[id='" + idname + "']").attr("id",idname+this.count);
};


