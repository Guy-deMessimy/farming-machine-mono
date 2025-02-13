# backend/Dockerfile
FROM node:20-bullseye AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json
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

# Définir le répertoire de travail pour le backend
WORKDIR /app/backend

# Exposer le port utilisé par le backend en développement
EXPOSE 3001

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "start:dev"]