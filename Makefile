
develop:
	gatsby develop

clean:
	gatsby clean

build:
	gatsby build

serve:
	gatsby serve

deploy:
	make -f deploy.mk

test: test_python

test_python:
	python3 -m unittest discover -s src/pages/notes
	python3 -m unittest discover -s src/pages/interviewing
