# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier d'abord les fichiers package.json
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY frontend ./frontend
COPY shared ./shared

# Définir le répertoire de travail pour le frontend
WORKDIR /app/frontend

# Exposer le port utilisé par l'application React en développement
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "start"]