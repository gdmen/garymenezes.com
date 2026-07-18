develop:
	gatsby develop

clean:
	gatsby clean
	rm -rf _generated

build:
	gatsby build

serve:
	gatsby serve

deploy:
	make -f deploy.mk
