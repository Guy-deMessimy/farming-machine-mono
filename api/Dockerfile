# Stage de construction
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY api ./api
COPY shared ./shared

# Générer Prisma
WORKDIR /app/api
RUN npx prisma generate

# Stage d'exécution
FROM node:18-alpine
WORKDIR /app

# Copier les artefacts du stage de construction
COPY --from=builder /app .

# Exposer le port
EXPOSE 3002

# Démarrer l'application
CMD ["./start.sh"]