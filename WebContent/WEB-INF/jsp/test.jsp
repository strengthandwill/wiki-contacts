<!DOCTYPE html>
<html>
<head>
</head>

<body>

	<form enctype="multipart/form-data">
		<div class="row">
			<div>
				<img id="image" />
			</div>
			<label for="fileToUpload">Select Files to Upload</label><br /> <input
				type="file" name="filesToUpload[]" id="filesToUpload"
				multiple="multiple" />
			<output id="filesInfo"></output>
		</div>
		<div class="row">
			<input type="submit" value="Upload" />
		</div>
	</form>

	<script src="assets/js/jquery.js"></script>
	<script src="assets/js/jquery.form.js"></script>
	<script>
		function fileSelect(evt) {
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				var files = evt.target.files;
				var file;
				for ( var i = 0; file = files[i]; i++) {
						resizeAndCropImage(file, function (dataURL) {
						updateImage(dataURL);
						uploadImage(dataURL);						
					});
				}
			} else {
				alert('The File APIs are not fully supported in this browser.');
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
					complete(canvas.toDataURL("image/jpeg"));
				};
			};
			reader.readAsDataURL(file);
		}
		

		function updateImage(dataURL) {
			document.getElementById("image").src = dataURL;
		}

		function uploadImage(dataURL) {
			var blob = dataURLtoBlob(dataURL);
			var fd = new FormData();
			fd.append("canvasImage", blob);

			$.ajax({
				url : 'uploadimage2',
				data : fd,
				cache : false,
				contentType : false,
				processData : false,
				type : 'POST',
				success : function(data) {
					alert(data);
				}
			});

		}

		function dataURLtoBlob(dataURL) {
			var binary = atob(dataURL.split(',')[1]);
			var array = [];
			for ( var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new Blob([ new Uint8Array(array) ], {
				type : 'image/jpeg'
			});
		}

		document.getElementById('filesToUpload').addEventListener('change', fileSelect, false);
	</script>
</body>
</html>
