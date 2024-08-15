# api/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les fichiers package.json des sous-dossiers
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/

# Installer les dépendances
WORKDIR /app/api
RUN npm install
WORKDIR /app/shared
RUN npm install

# Copier le reste des fichiers
WORKDIR /app
COPY api ./api
COPY shared ./shared
COPY api/prisma/schema.prisma ./prisma/

# Générer Prisma
WORKDIR /app/api
RUN npx prisma generate

# Stage d'exécution
FROM node:18-alpine
WORKDIR /app

# Copier les artefacts du stage de construction
COPY --from=builder /app .

# Copier le script de démarrage
COPY api/start.sh .
RUN chmod +x start.sh

# Exposer le port
EXPOSE 3002

# Utiliser le script comme commande de démarrage
CMD ["./start.sh"]