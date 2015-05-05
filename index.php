<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"></meta>
		<title>Javascript Lightbox Gallery</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
		<link href="css/style.css" rel="stylesheet" media="screen">
	</head>
<body>
	<div class="wrapper">
		<div class="gallery" id="gallery">
			<h2>Photos</h2>
			<div class="row thumbnails" id="thumbnails">
				<?php

				$directory = 'img/';
				$fileName = 'photos-*-thumb.jpg';
				$images = glob($directory.$fileName);

				foreach ($images as $image) {
					?>
					<div class="grid-12">
						<?php
						$imageFull = str_replace('-thumb', '', $image);
						?>
						<div data-src="<?php echo $imageFull ?>" class="gallery-container">
							<img src="<?php echo $image ?>" class="gallery-image" data-test="<?php echo $image ?>">
						</div>
					</div>
				<?php
				} //foreach
				?>
			</div><!-- /row -->
		</div><!-- /gallery -->
	</div><!-- /wrapper -->
 
<script type="text/javascript" src="js/gallery.js"></script>

</body>
</html>