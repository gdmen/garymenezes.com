
develop:
	gatsby develop

clean:
	gatsby clean

build:
	gatsby build

test: test_python

test_python:
	python3 -m unittest discover -s src/pages/notes
	python3 -m unittest discover -s src/pages/interviewing
