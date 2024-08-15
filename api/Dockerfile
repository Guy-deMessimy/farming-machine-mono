# api/Dockerfile
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json des sous-dossiers
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/

# Installer les dépendances
WORKDIR /app/api
RUN npm install
WORKDIR /app/shared
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# S'assurer que le fichier schema.prisma est présent
COPY api/prisma/schema.prisma /app/api/prisma/

# Générer Prisma
WORKDIR /app/api
RUN npx prisma generate

# Copier et rendre exécutable le script de démarrage
COPY api/start.sh /app/api/
RUN chmod +x /app/api/start.sh
WORKDIR /app/api

# Exposer le port
EXPOSE 3002

# Définir le répertoire de travail pour l'exécution
WORKDIR /app

# Utiliser le script comme commande de démarrage
CMD ["./start.sh"]