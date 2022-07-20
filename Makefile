dev:
	docker-compose run --rm node gulp dev

install:
	docker-compose run --rm node npm install

prod:
	docker-compose run --rm node gulp
