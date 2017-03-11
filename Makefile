all: airheader.tar.gz

airheader.css: airheader.scss
	sass airheader.scss airheader.css

airheader.min.js: airheader.js
	uglifyjs airheader.js -c -m > airheader.min.js

airheader.tar.gz: airheader.css airheader.min.js
	tar -cvzf airheader.tar.gz airheader.min.js airheader.css