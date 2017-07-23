#
# 
REGION=eu-west-1
FUNCTION=madlibbuilder
#
#
install: zip
	aws lambda update-function-code --function-name $(FUNCTION) --region $(REGION) --zip-file fileb://Lambda.zip

zip:
	zip -u -r Lambda.zip database_helper.js index.js madlib_helper.js package.json node_modules
