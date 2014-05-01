//initialization
$(document).ready(function() {
	insertModalNewContact($("#newcontact_modal"), $("#newcontact_btn"));

	$("#search_start").ready(function() {		
		var start = $(this);
		start.find(".start-statistic").hide();
		$.getJSON("getstatistic", function(statistic) {
			start.find(".start-users").text(statistic.usersCount);
			start.find(".start-countries").text(statistic.countriesCount);
			start.find(".start-statistic").show();
		});
	});

	$("#search_input").keyup(function() {
		getResults($(this).val());
		$("#search_start").hide();
	});

	$("#social-btn").click(function() {
		initGooglePlusOne();
		initFacebookLike(document, 'script', 'facebook-jssdk');
		!initTwitterTweet(document,"script","twitter-wjs");		
	});
});

//update search results
function refreshResults() {
	getResults($("#search_results").attr("value"));
}

function getResults(query) {
	if (query!=null && query!="" && query!="+") {
		$.getJSON("getcontacts/" + query, function(data) {
			$("#search_results").empty();
			$("#search_modals").empty();
			$("#search_results").attr("value", query);

			$.each(data, function(index, contact) {
				var result = insertResult($("#search_results"), contact, index);
				insertModalViewContact($("#search_modals"), contact, index, result);
			});
		});
	}
}

//insert modal
function insertModalViewContact(container, contact, index, result) {
	var modal = insertModal(container, index);
	insertContentView(modal);
	insertContentEdit(modal);
	insertContentLoading(modal);

	modal.ready(function() {
		// trigger
		result.click(function(event) {
			if (!$(event.target).is("a")) {
				modal.modal("show");	
			}
		});
		
		var edit = modal.find(".contact-edit");
		var view = modal.find(".contact-view");
		
		// update form edit and view
		updateFormEdit(modal, contact);		
		edit.hide();

		// toggle view and edit
		modal.find(".contact-edit-btn, .contact-cancel-btn").click(function() {	
			view.toggle();
			edit.toggle();
		});
		
		// button		
		view.find(".contact-edit-btn").click(function() {
			var select = edit.find(".contact-countrycode select");	
			if (select.val()==null || select.val()=="") {
				listCountryCodes(modal, edit.find(".contact-countrycode input").val());			
			}
		});
		
		// form
		var loading = container.find(".contact-loading");		
		formValidationUpdate(modal.find(".contact-details"), function () {
			edit.hide();
			loading.show();
		}, function (status) {
			updateFormView(modal);
			loading.hide();
			view.show();		
			insertAlert(view.find(".modal-body"), "update", status);
		});
	});
}

function insertModalNewContact(container, btn) {	
	var modal = insertModal(container, 0);
	insertContentEdit(modal);
	insertContentLoading(modal);
	modal.ready(function() {
		var edit = modal.find(".contact-edit");
		
		// trigger
		btn.click(function() {
			modal.modal("show");
			var select = edit.find(".contact-countrycode select");
			if (select.val()==null || select.val()=="") {
				listAndSelectCountryCodes(modal);
			}
		});

		// contact-number
		edit.find(".contact-number .contact-input-add a").hide();

		// contact-email
		edit.find(".contact-email .contact-input-add a").hide();
		
		// contact-spam
		edit.find(".contact-spam input[value='false']").attr("checked", "true");
		
		// contact-image
		edit.find(".contact-image-upload img").attr("src", getAppImage("new"));

		// form
		var loading = container.find(".contact-loading");		
		formValidationAdd(modal.find(".contact-details"), function () {
			edit.hide();
			loading.show();
		}, function (status) {
			loading.hide();
			modal.modal("hide");
			modal.remove();
			btn.unbind();
			insertModalNewContact(container, btn);
			insertAlert(container.parent(), "add", status);
		});
		
		// buttons
		edit.find(".contact-header").text("Add New Contact");
		edit.find(".contact-submit-btn").text("Add");
		edit.find(".contact-remove-btn").hide();
		edit.find(".contact-cancel-btn").hide();
	});
}


function insertModal(container, index) {
	var id = container.attr("id") + "_child" + index;
	$(container).append(getModalHtml(id));
	var modal = $("#" + id);
	modal.ready(function() {		
		// modal control
		modal.on('hidden', function () {
			refreshResults();
		});
	});
	return modal;
}

// insert content
function insertContentView(container) {
	container.append(getContentViewHtml());
//	var view = container.find(".contact-view");
//		view.ready(function() {	
//	});
}

function insertContentEdit(container) {
	container.append(getContentEditHtml());
	var edit = container.find(".contact-edit");
	edit.ready(function() {
		// contact-header
		edit.find(".contact-name").keyup(function() {
			edit.find(".contact-header").text($(this).val());
		});
		
		// contact-number
		registerInputs(edit.find(".contact-number"), "number");
		
		// contact-email
		registerInputs(edit.find(".contact-email"), "email");
		
		// contact-tags
		edit.find(".contact-tags input[type='text']").keyup(function() {
			var tag = edit.find(".contact-tags input[type='text']").val();
			var tags = edit.find(".contact-tags input[type='hidden']").val();			
			if (tag!="" && !hasTag(tags, tag)) {
				edit.find(".contact-tags .contact-tags-add").show();
			} else {
				edit.find(".contact-tags .contact-tags-add").hide();
			}
		});

		edit.find(".contact-tags .contact-tags-add").hide();
		edit.find(".contact-tags .contact-tags-add").click(function() {
			var tag = edit.find(".contact-tags input[type='text']").val();
			var tags = edit.find(".contact-tags input[type='hidden']").val();
			tags = addTag(tags, tag);
			insertTags(edit, tags);			
		});
		
		// contact-image
		var imageUpload = edit.find(".contact-image-upload");
		imageUpload.find("input").hide();
		imageUpload.find("button").click(function() {
			imageUpload.find("input").click();
		});
		
		imageUpload.find("input").change(function() {			
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				resizeAndCropImage(this.files[0], function (dataURL) {
					imageUpload.find("img").attr("src", dataURL);
					edit.find(".contact-imageurl").attr("dataURL", dataURL);
				});				
			} else {
				alert('The File APIs are not fully supported in this browser.');
			}			
		});	
		
		// contact-spam
		edit.find(".contact-spam input").change(function () {
			if ($(this).filter(":checked").val()=="true") {
				imageUpload.find("img").attr("src", getAppImage("spam"));				
				edit.find(".contact-imageurl").removeAttr("dataURL");				
				imageUpload.find("button").hide();
			} else {
				if (edit.find(".contact-imageurl").attr("uploaded")!=null) {
					imageUpload.find("img").attr("src", "getimage.jpg?" + (new Date).getTime());					
				} else if (edit.find(".contact-imageurl").val()!="") {
					imageUpload.find("img").attr("src", edit.find(".contact-imageurl").val());
				} else {
					imageUpload.find("img").attr("src", getAppImage("new"));
				}
				imageUpload.find("button").show();
			}
		});
		
		// buttons
		edit.find(".contact-submit-btn").click(function() {
			edit.find(".contact-details").submit();			
		});
		
		edit.find(".contact-remove-btn").click(function() {
			var loading = container.find(".contact-loading");
			edit.hide();						
			loading.show();			
			$.get("removecontact/" + edit.find(".contact-id").val(), function(status) {
				loading.hide();				
				container.modal("hide");
				insertAlert(container.parent().parent(), "remove", status);								
			});
		});
	});
}

function insertContentLoading(container) {
	container.append(getContentLoadingHtml());
	var loading = container.find(".contact-loading");
	loading.ready(function() {
		loading.hide();
	});
}


function registerInputs(container, name) {
	container.find("input").keyup(function () {
		updateInputAdd(container, null);
	});
	container.find(".contact-input-add a").click(function() {
		insertInput(container, name, null);
		$(this).hide();
	});	
}

//insert result
function insertResult(container, contact, index) {
	var id = container.attr("id") + "_child" + index;
	container.append(getResultHtml(id));
	var result = $("#" + id + " div");
	result.ready(function() {		
		var contactContainer = result.find(".contact-content");
		
		if (contact.name!=null && contact.name!="") {
			contactContainer.append("<div><b>" + contact.name + "</b></div>");
		}
		
		if (contact.number!=null && contact.countryCode!=null && contact.countryCode!="") {
			contactContainer.append("<div>" + getNumberHtml(contact.number, contact.countryCode) + "</div>");
		}
		if (contact.email!=null) {
			contactContainer.append("<div>" + getEmailHtml(contact.email) + "</div>");
		}
		
		if (contact.description!=null && contact.description!="") {
			contactContainer.append("<div><i>" + contact.description + "</i></div>");
		} else if (contact.tags!=null) {
			contactContainer.append("<div>" + getTagsHtml(contact.tags) + "</div>");
		}

		if (contact.spam) {
			result.find(".contact-image img").attr("src", getAppImage("spam"));
		} else {
			if (contact.imageUrl!=null && contact.imageUrl!="") {
				result.find(".contact-image img").attr("src", contact.imageUrl);
			} else {
				result.find(".contact-image img").attr("src", getAppImage("new"));
			}
		}

		result.find("a.tags").click(function() {
			var query = $("#search_input").val();
			$("#search_input").val((query=="" ? query:query+" ") + $(this).attr("value"));
			$("#search_input").keyup();
		});
	});
	return result;
}

//insert alert
function insertAlert(container, status, operation) {
	container.prepend(getAlertHtml(status, operation));
	var alert = container.find(".alert");
	alert.ready(function() {
		alert.fadeOut(5000);	
	});	
}

//insert tags
function insertTags(edit, tags) {	
	var tagsContainer = edit.find(".contact-tags .contact-tags-container");
	if (tags=="") {
		tagsContainer.hide();
	} else {
		tagsContainer.show();
	}
	tagsContainer.html(getEditTagsHtml(tags!="" ? tags.split(/\s+/):null));
	edit.find(".contact-tags input[type='hidden']").val(tags);
	edit.find(".contact-tags input[type='text']").val("");
	edit.find(".contact-tags .contact-tags-add").hide();

	tagsContainer.ready(function () {
		tagsContainer.children("a").click(function() {
			var tag = $(this).attr("value");
			var tags = edit.find(".contact-tags input[type='hidden']").val();
			tags = removeTag(tags, tag);
			insertTags(edit, tags);
		});		
	});
}

function addTag(tags, tag) {
	tag = tag.toLowerCase();
	if (tags=="") {
		return tag;
	} else {
		return tags + " " + tag;
	}
}

function removeTag(tags, tag) {
	tag = tag.toLowerCase();
	if (tags.indexOf(tag)==0) {
		tags = tags.replace(tag, "").trim();
	} else {
		tags = tags.replace(" " + tag, "");
	}
	return tags;
}

function hasTag(tags, tag) {
	tag = " " + tag + " ";
	tags = " "  + tags + " ";
	if (tags.indexOf(tag)!=-1) {
		return true;
	} else {
		return false;
	}
}

//insert input
function insertInput(container, name, value) {
	var index = parseInt(container.children("div").last().attr("index")) + 1;	
	container.append(getInputHtml(index));	
	var div = container.find(".contact-input-remove[index='" + index + "']"); 
	div.ready(function() {
		div.find("input").attr("name", name);
		if (value!=null) {			
			div.find("input").val(value);
		}
		container.find("input").keyup(function () {
			updateInputAdd(container, $(this));
		});

		div.find("a").click(function () {
			div.remove();
			updateInputAdd(container, null);
		});
	});
}

function updateInputAdd(container, input) {
	var inputAddBtn = container.find(".contact-input-add a");
	var isNew = true;
	$.each(container.find("input"), function() {
		if ($(this).val()=="" || (input!=null && 
				$(this).parent().attr("index")!=input.parent().attr("index") && 
				$(this).val()==input.val())) {
			isNew = false;
		}		
	});
	if (isNew) {
		inputAddBtn.show();
	} else {
		inputAddBtn.hide();
	}
}

//update form
function updateFormEdit(modal, contact) { // update form edit values
	var edit = modal.find(".contact-edit");
	
	if (contact.id!=null && contact.id!="") {
		edit.find(".contact-id").val(contact.id);
	}

	if (contact.name!=null && contact.name!="") {
		edit.find(".contact-header").text(contact.name);
		edit.find(".contact-name").val(contact.name);
	}	

	if (contact.number!=null) {	
		$.each(contact.number, function(index, number) {
			if (index==0) {
				edit.find(".contact-number .contact-input-add input").val(number);
			} else {
				insertInput(edit.find(".contact-number"), "number", number);
			}
		});
	}
	
	if (contact.countryCode!=null && contact.countryCode!="") {
		edit.find(".contact-countrycode input").val(contact.countryCode);
		if (contact.spam) {
			edit.find(".contact-spam input[value='true']").attr("checked", "true");
		} else {
			edit.find(".contact-spam input[value='false']").attr("checked", "true");
		}
	}

	if (contact.email!=null) {
		$.each(contact.email, function(index, email) {
			if (index==0) {
				edit.find(".contact-email .contact-input-add input").val(email);
			} else {
				insertInput(edit.find(".contact-email"), "email", email);
			}		
		});
	}
	
	if (contact.description!=null && contact.description!="") {
		edit.find(".contact-description").val(contact.description);
	}	
	
	if (contact.tags!=null) {
		insertTags(edit, contact.tags.join(" "));
	}
	
	if (contact.address!=null && contact.address!="") {
		edit.find(".contact-address").val(contact.address);
	}
	
	if (contact.website!=null && contact.website!="") {
		edit.find(".contact-website").val(contact.website);
	}

	if (contact.spam) {
		edit.find(".contact-image-upload img").attr("src", getAppImage("spam"));
		edit.find(".contact-image-upload").find("button").hide();
	} else {
		if (contact.imageUrl!=null && contact.imageUrl!="") {
			edit.find(".contact-imageurl").val(contact.imageUrl);
			edit.find(".contact-image-upload img").attr("src", contact.imageUrl);		
		} else {
			edit.find(".contact-image-upload img").attr("src", getAppImage("new"));
		}
	}

	modal.ready(function() {
		updateFormView(modal);
	});	
}

function updateFormView(modal) { // update form view values	
	var view = modal.find(".contact-view");
	var edit = modal.find(".contact-edit");

	view.find(".contact-header").text(edit.find(".contact-name").val());
	view.find(".contact-name").text(edit.find(".contact-name").val());
	view.find(".contact-countrycode").text(edit.find(".contact-countrycode input").val());
	view.find(".contact-email a").text(edit.find(".contact-email").val());
	view.find(".contact-email a").attr("href", "mailto:" + edit.find(".contact-email").val());
	view.find(".contact-description").text(edit.find(".contact-description").val());	
	view.find(".contact-address").text(edit.find(".contact-address").val());
	view.find(".contact-website a").text(edit.find(".contact-website").val());
	view.find(".contact-website a").attr("href", edit.find(".contact-website").val());

	// contact-number
	var number = inputsToArray(edit.find(".contact-number input"));
	if (number!=null) {
		view.find(".contact-number").html(getNumberHtml(number, edit.find(".contact-countrycode input").val()));
	}

	// contact-email
	var email = inputsToArray(edit.find(".contact-email input"));
	if (email!=null) {
		view.find(".contact-email").html(getEmailHtml(email));
	}
	
	// contact-tags	
	var tags = edit.find(".contact-tags input[type='hidden']").val();	
	view.find(".contact-tags").html(getTagsHtml(tags!="" ? tags.split(/\s+/):null));
	view.find(".contact-tags a").click(function() {
		var query = $("#search_input").val();
		$("#search_input").val((query==""?query:query+" ") + $(this).attr("value"));
		$("#search_input").keyup();
		modal.modal("hide");			
	});	
	
	// contact-image
	if (edit.find(".contact-spam input").filter(":checked").val()=="true") {		
		view.find(".contact-image img").attr("src", getAppImage("spam"));
	} else {
		if (edit.find(".contact-imageurl").attr("dataURL")!=null) {
			view.find(".contact-image img").attr("src", edit.find(".contact-imageurl").attr("dataURL"));
		} else if (edit.find(".contact-imageurl").val()!="") {		
			view.find(".contact-image img").attr("src", edit.find(".contact-imageurl").val());
		} else {
			view.find(".contact-image img").attr("src", getAppImage("new"));
		}
	}
	
	// update row visibility
	$.each(view.find("tbody").children(), function() {
		var value = $(this).children().last();
		if (value!=null && value.text()!="") {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

function inputsToArray(input) {
	var array = [];
	input.each(function() {
		if ($(this).val()!="") {
			array.push($(this).val());
		}
	});
	if (array.length>0) {
		return array;
	} else {	
		return null;
	}
}

function listAndSelectCountryCodes(modal) {
	$.getJSON("listandselectcountrycodes", function(data) {
		var value;
		if (data.select!=null) {
			value = data.select.isoCountryCode+data.select.countryCode;
		} else {
			value = "";
		}
		updateSelect(modal, data.countryCodes, value);
	});	
}

function listCountryCodes(modal, value) {
	$.getJSON("listcountrycodes", function(data) {
		updateSelect(modal, data, value);
	});
}

function updateSelect(modal, countrycodes, value) {
	var select = modal.find(".contact-edit .contact-countrycode select");	
	var input = modal.find(".contact-edit .contact-countrycode input");

	select.append("<option value=''>Select a country</option>");
	$.each(countrycodes, function() {
		select.append("<option value='" + this.isoCountryCode + this.countryCode + "'>" + this.country + " (+" + this.countryCode + ")</option>");
	});
	select.ready(function() {
		select.val(value);
	});


	modal.find(".contact-edit .contact-countrycode input").keyup(function() {
		var option = select.children("option[value='" + $(this).val() + "']");
		if (option.val()!=null && option.val()!="") {
			select.val($(this).val());
		} else {
			select.val("");	
		}
		select.focus();
		$(this).focus();	
	});

	select.change(function() {
		input.val($(this).val());
	});
}

//form validation
function formValidationAdd(form, submit, complete) {
	formValidation(form, "addcontactandimage", submit, complete);
}

function formValidationUpdate(form, submit, complete) {
	formValidation(form, "updatecontactandimage", submit, complete);
}

function formValidation(form, url, submit, complete) {
	// link validation of number and email
	linkValidation(form, form.find(".contact-number div[index='0'] input"), form.find(".contact-email div[index='0'] input"));

	$.validator.addMethod("unqiue", function(value, element) {
		var isUnique = true;
		$.each($(element).parents("tr").find("input"), function() {				
			if (($(this).parent().attr("index")!=$(element).parent().attr("index") && 
					$(this).val()==value)) {
				isUnique = false;				
			}			
		});
		return isUnique;
	});

	$.validator.addMethod("firstrequired", function(value, element) {
		if ($(element).parent().attr("index")=='0' && $(element).val()=="") {
			return false;
		} else {
			return true;
		}
	});

	$.validator.addMethod("numberoremail", function(value, element) {
		var number = $(element).parentsUntil("table").find(".contact-number div[index='0'] input");
		var email = $(element).parentsUntil("table").find(".contact-email div[index='0'] input");
		if (number.val()=="" && email.val()=="") {
			return false;
		} else {
			return true;
		}
	});

	form.validate({
		rules: {
			name: {
				required: true
			},
			countryCode: {
				required: true,
				minlength: 1
			},

			number: {
				numberoremail: true,
				digits: true,
				unqiue: true
			},
			email: {
				numberoremail: true,
				email: true,
				unqiue: true
			},
			website: {
				url: true
			}			
		},
		messages: {
			name: "Sorry please enter a name.",
			countryCode: "Sorry please select a country.",
			number: {
				numberoremail: "Sorry please enter a number or email below.",
				digits: "Sorry please enter only digits.",
				unqiue: "Sorry the numbers need to be different."
			},
			email: {
				numberoremail: "Sorry please enter an email or number above.",
				email: "Sorry please enter a valid email.",
				unqiue: "Sorry the emails need to be different."
			},
			website: {
				url: "Sorry please enter an valid url."
			}
		},
		errorPlacement: function(error, element) {
			$(element).parent().append(error);
		},
		highlight: function(element, errorClass) {
			$(element).attr("error", "true");
			$(element).parentsUntil("tbody").addClass("warning");		     
		},
		unhighlight: function(element, errorClass) {
			$(element).removeAttr("error");		     	
			$(element).parent().find("label").remove();
			if ($(element).attr("array")==null || $(element).parentsUntil("tr").find("input").attr("error")==null) {
				$(element).parentsUntil("tbody").removeClass("warning");
			}
		},				
		submitHandler: function(form) {
			submit();
			postContactAndImage(url, $(form), function(status) {
				complete(status);
			});
		}
	});	
}

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};	

function jsonStringValue(obj, key) {
	if (obj[key]=="") {
		obj[key]=null;
	}
}

function jsonValueToArray(obj, key) {
	if (!$.isArray(obj[key])) {
		var value = obj[key];
		obj[key] = [value];
	}
}

function jsonRemoveEmptyStr(obj, key) {
	obj[key] = $.grep(obj[key], function(element) {
		return element!="";
	});
	if (obj[key].length==0) {
		obj[key]=null;
	}
}

function jsonStringToArray(obj, key) {
	if (obj[key]!="") { 
		obj [key] = obj[key].split(/\s+/);
	} else {
		obj[key] = null;
	}
}

function postContactAndImage(url, form, complete) {		
	var jsonObj = form.serializeObject();
	jsonValueToArray(jsonObj, "number");
	jsonValueToArray(jsonObj, "email");
	jsonRemoveEmptyStr(jsonObj, "number");
	jsonRemoveEmptyStr(jsonObj, "email");
	jsonStringToArray(jsonObj, "tags");	
	jsonStringValue(jsonObj, "name");
	jsonStringValue(jsonObj, "description");
	jsonStringValue(jsonObj, "address");
	jsonStringValue(jsonObj, "website");
	jsonStringValue(jsonObj, "imageUrl");
	
	var formdata = new FormData();	
	formdata.append("contact", JSON.stringify(jsonObj));
	var dataURL = $(form).find(".contact-imageurl").attr("dataURL");
	if (dataURL!=null) {
		var blob = dataURLtoBlob(dataURL);
		formdata.append("image", blob);		
	}
	$.ajax({
		url : url,
		data : formdata,
		cache : false,
		contentType : false,
		processData : false,
		type : 'POST',
		complete: function(jqXHR, textStatus) {
			complete(textStatus);
		}
	});
}

function linkValidation(form, firstInput, secondInput) {
	firstInput.keyup(function() {
		form.validate().element(secondInput);
	});
	secondInput.keyup(function() {
		form.validate().element(firstInput);
	});
}

// app images
function getAppImage(type) {
	if (type=="new") {
		return "assets/img/new.png";
	} else if (type=="spam") {
		return "assets/img/spam.png";
	} else {
		return null;
	}
}

//social api
function initGooglePlusOne() {  
	var po = document.createElement('script'); 
	po.type = 'text/javascript'; 
	po.async = true;  
	po.src = 'https://apis.google.com/js/plusone.js';  
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
}

function initFacebookLike(d, s, id) {
	var js; fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1";
	fjs.parentNode.insertBefore(js, fjs);
}

function initTwitterTweet(d,s,id) {
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;js.src="//platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}

function resizeAndCropImage(file, complete) {
	var SIZE = 100;
	var reader = new FileReader();
	reader.onloadend = function() {
		var tempImg = new Image();
		tempImg.src = reader.result;
		tempImg.onload = function() {
			var tempW = tempImg.width;
			var tempH = tempImg.height;
			var sourceX, sourceY, sourceWidth, sourceHeight;
			if (tempW > tempH) { // landscape
				sourceX = (tempW - tempH) / 2;
				sourceY = 0;
				sourceWidth = tempH;
				sourceHeight = tempH;
			} else { // portrait
				sourceX = 0;
				sourceY = (tempH - tempW) / 2;
				sourceWidth = tempW;
				sourceHeight = tempW;
			}
			var canvas = document.createElement('canvas');
			canvas.width = SIZE;
			canvas.height = SIZE;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, SIZE, SIZE);
			complete(canvas.toDataURL("image/png"));
		};
	};
	reader.readAsDataURL(file);
}

function dataURLtoBlob(dataURL) {
	var binary = atob(dataURL.split(',')[1]);
	var array = [];
	for ( var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new Blob([ new Uint8Array(array) ], {
		type : 'image/png'
	});
}