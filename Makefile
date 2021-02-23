build:
	docker build -t janos .

install:
	chmod +x janos.sh
	cp janos.sh /usr/local/bin/janos
