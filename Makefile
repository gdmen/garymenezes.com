develop:
	gatsby develop

clean:
	gatsby clean
	rm -rf _generated

build:
	@if [ -d .cache/develop-html ]; then gatsby clean; fi
	gatsby build

serve:
	gatsby serve

deploy:
	make -f deploy.mk
