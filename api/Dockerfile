# api/Dockerfile
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/

# Installer les dépendances
WORKDIR /app/api
RUN npm install
WORKDIR /app/shared
RUN npm install

WORKDIR /app
COPY api ./api
COPY shared ./shared

# Définir le répertoire de travail pour l'exécution
WORKDIR /app/api

# Exposer le port utilisé par l'api en développement
EXPOSE 3002

# Commande pour démarrer l'application en mode développement
# CMD npx prisma migrate dev && npm run start:dev
CMD ["npm", "run", "start:full"]