build:
	rm -rf frontend/dist
	npm run build
start:
	npx start-server -s ./frontend/dist
install:
	npm ci
	npm ci --prefix frontend