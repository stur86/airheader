all: airheader.min.js airheader.css

airheader.css: airheader.scss
	sass airheader.scss airheader.css

airheader.min.js: airheader.js
	uglifyjs airheader.js -c -m > airheader.min.js