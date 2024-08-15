# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier d'abord les fichiers package.json
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

# Installer les dépendances
WORKDIR /app/backend
RUN npm install
WORKDIR /app/shared
RUN npm install

# Copier le reste des fichiers du projet
WORKDIR /app
COPY backend ./backend
COPY shared ./shared

# Définir le répertoire de travail pour le frontend
WORKDIR /app/backend

# Exposer le port utilisé par l'application React en développement
EXPOSE 3001

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "start"]