powder-install:
	echo "Installing server dependencies..."
	cd workspaces/server && npm ci
	echo "Installing client dependencies..."
	cd workspaces/client && npm ci

powder-start-backend: powder-start-database powder-start-server 

powder-start-backend-test: setup-e2e-db powder-start-server

powder-start-database:
	echo "Starting database..."
	docker compose -f docker-compose.mongo.yml up -d

powder-start-server:
	echo "Starting server..."
	cd workspaces/server && npm run build && npm run start

powder-start-frontend:
	echo "Starting client..."
	cd workspaces/client && npm run --silent serve

setup-e2e-db:
	docker compose -f docker-compose.e2e.yml up -d
