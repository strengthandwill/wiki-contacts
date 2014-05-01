function getModalHtml(id) {
	var html =
	"<div id='" + id + "' class='contact modal hide fade in'></div>";
	return html;
}

function getContentViewHtml() {	
	var html =
	"<div class='contact-view'>" +
			"<div class='modal-header'>" +
				"<a class='close' data-dismiss='modal'>x</a>" +
				"<h3 class='contact-header'></h3>" +
			"</div>" +
	
			"<div class='modal-body'>" +
				"<div class='row-fluid'>" +
					"<div class='span3 contact-image'>" +
						"<img />" +
					"</div>" +
		
					"<div class='span9'>" +
						"<table class='table'>" +
							"<tbody>" +
								
								"<tr>" +
									"<td>Name</td>" +
									"<td class='contact-name'></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Number</td>" +
									"<td class='contact-number'></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Email</td>" +
									"<td class='contact-email'><a target='_top'></a></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Description</td>" +
									"<td class='contact-description'></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Tags</td>" +
									"<td class='contact-tags'></td>" +
								"</tr>" +
								
								"<tr>" +	
									"<td>Address</td>" +
									"<td class='contact-address'></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Website</td>" +
									"<td class='contact-website'><a target='_blank'></a></td>" +
								"</tr>" +
							
							"</tbody>" +
						"</table>" +
					"</div>" +
				"</div>" +
			"</div>" +
			
			"<div class='modal-footer'>" +
				"<button class='hidden-phone contact-edit-btn btn btn-primary' type='button'>Edit</button>" +
			"</div>" +
	"</div>";
	return html;
}

function getContentEditHtml() {	
	var html =
	"<div class='contact-edit'>" +

		"<div class='modal-header'>" +
			"<a class='close' data-dismiss='modal'>x</a>" +
			"<h3 class='contact-header'></h3>" +
		"</div>" +
	
		"<div class='modal-body'>" +
			"<div class='row-fluid'>" +
				"<div class='span3'>" +
					"<form class='contact-image-upload'>" +
						"<img />" +
						"<div><button class='btn btn-primary' type='button'>Select image</button></div>" +
						"<input name='image' type='file' />" +
					"</form>" +
				"</div>" +
				
				"<div class='span9'>" +
					"<form class='contact-details'>" +
						"<table class='table'>" +
							"<tbody>" +
							
								"<tr>" +
									"<td>Name *</td>" +
									"<td><input name='name' class='contact-name span9' type='text' /></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Country *</td>" +
									"<td class='contact-countrycode'><input type='hidden' /><select class='span9' name='countryCode'></select></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Number</td>" +
									"<td class='contact-number'>" +
										"<div class='contact-input-add' index='0'><input name='number' class='span9' type='text' array='true' />&nbsp;<a href='#'>Add</a></div>" +
									"</td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Email</td>" +
									"<td class='contact-email'>" +
										"<div class='contact-input-add' index='0'><input name='email' class='span9' type='text' array='true' />&nbsp;<a href='#'>Add</a></div>" +
									"</td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Spam</td>" +
									"<td class='contact-spam'>" +
										"<label class='radio inline'><input name='spam' type='radio' value='true'>Yes</label>" +
										"<label class='radio inline'><input name='spam' type='radio' value='false'>No</label>" +
									"<td>" +
								"<tr>" +
									"<td>Description</td>" +
									"<td><textarea name='description' class='contact-description span9' type='text'></textarea></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Tags</td>" +
									"<td class='contact-tags'>" +
										"<div><input class='span9' type='text' />&nbsp;<a class='contact-tags-add' href='#'>Add</a></div>" +
										"<div class='contact-tags-container'></div>" +
										"<input name='tags' type='hidden'/>" +
									"</td>" +
								"</tr>" +	
								
								"<tr>" +
									"<td>Address</td>" +
									"<td><input name='address' class='contact-address span9' type='text' /></td>" +
								"</tr>" +
								
								"<tr>" +
									"<td>Website</td>" +
									"<td><input name='website' class='contact-website span9' type='text' /></td>" +
								"</tr>" +
							
							"</tbody>" +
						"</table>" +	
						"<input name='id' class='contact-id' type='hidden' />" +
						"<input name='imageUrl' class='contact-imageurl' type='hidden' />" +
					"</form>" +
				"</div>" +
			"</div>" +
		"</div>" +
		
		"<div class='modal-footer'>" +
			"<button class='contact-submit-btn btn btn-primary' type='button'>Update</button>" +
			"<button class='contact-remove-btn btn btn-danger' type='button'>Remove</button>" +
			"<button class='contact-cancel-btn btn' type='button'>Cancel</button>" +
		"</div>" +

	"</div>";
	return html;
}

function getContentLoadingHtml() {
	var html = 
	"<div class='contact-loading'>" +
		"<div class='modal-body'>" +
			"<div>Please wait..</div>" +		
			"<div class='progress progress-info progress-striped active'>" +
        		"<div class='bar'></div>" +
        	"</div>" +		
        "</div>" +
    "</div>";
	return html;	
}

function getResultHtml(id) {
	var html =
	"<li id='" + id + "'>" +
		"<div class='thumbnail span4'>" +
			"<div class='row-fluid'>" +					
				"<div class='pull-left contact-image'><img /></div>" +
				"<div class='pull-left contact-content'></div>" +
			"</div>" +
		"</div>" +
	"</li>";
	return html;
}

function getNumberHtml(number, countryCode) {
	if (number!=null) {
		var numberHtml = "(" + countryCode.substring(0,2) + "+" + countryCode.substring(2) + ") ";
		for (var i=0;i<number.length;i++) {
			numberHtml += "<a class='number' href='#'>" + number[i] + "</a>&nbsp;";
		}
		return numberHtml;
	} else {
		return "";
	}	
}

function getTagsHtml(tags) {
	if (tags!=null) {
		var tagsHtml = "";
		for (var i=0;i<tags.length;i++) {
			tagsHtml += "<a class='tags' href='#' value='" + tags[i] + "'>" + tags[i] + "</a>&nbsp;";
		}
		return tagsHtml;
	} else {
		return "";
	}
}

function getEditTagsHtml(tags) {
	if (tags!=null) {
		var tagsHtml = "";
		for (var i=0;i<tags.length;i++) {
			tagsHtml += "<a class='tags btn' href='#' value='" + tags[i] + "'>" + tags[i] + " <sup>x</sup></a>&nbsp;";
		}
		return tagsHtml;
	} else {
		return "";
	}
}

function getInputHtml(index) {
	var html = 
	"<div class='contact-input-remove' index='" + index + "'>" +
		"<input class='span9' type='text'array='true' />&nbsp;<a href='#'>Remove</a>" +
	"</div>";
	return html;
}

function getAlertHtml(operation, status) {
	var message;
	if (status=="success") {
		if (operation=="add") {
			message = "The contact is added successfully!";
		} else if  (operation=="update") {
			message = "The contact is updated successfully!";
		} else { // remove
			message = "The contact is removed successfully!";
		}
	} else {
		if (operation=="select") {
			message = "Sorry the maximum image size is 100KB, please select a smaller image.";
		} else if (operation=="upload") {
			message = "Sorry some errors during uploading, please try again.";
		} else {
			message = "Sorry some errors have occurred, please try again.";
		}
	}
	return "<div class='alert alert-" + status + "'>" +
	"<strong>" + message + "</strong>" +
	"</div>";
}

function getEmailHtml(email) {
	if (email!=null) {
		var emailHtml = "";
		for (var i=0;i<email.length;i++) {
			emailHtml += "<a class='email' href='mailto:" + email[i] + "'>" + email[i] + "</a>&nbsp;";
		}
		return emailHtml;
	} else {
		return "";
	}
}