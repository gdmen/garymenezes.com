
develop:
	gatsby develop

clean:
	gatsby clean

test: test_python

test_python:
	python3 -m unittest discover -s src/pages/notes/
