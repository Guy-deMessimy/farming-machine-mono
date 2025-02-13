# frontend/Dockerfile
FROM node:20-bullseye AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Installer les dépendances
WORKDIR /app/frontend
RUN npm install
WORKDIR /app/shared
RUN npm install

# Copier le reste des fichiers du projet
WORKDIR /app
COPY frontend ./frontend
COPY shared ./shared

# Définir le répertoire de travail pour le frontend
WORKDIR /app/frontend

# Exposer le port utilisé par l'application React en développement
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "start"]