#!/bin/sh

# Définir le chemin du schéma Prisma
PRISMA_SCHEMA="/app/api/prisma/schema.prisma"

# Générer les fichiers Prisma
echo "Generating Prisma client..."
npx prisma generate --schema="$PRISMA_SCHEMA"

# Attendre l'initialisation de Prisma
until npx prisma db pull --schema="$PRISMA_SCHEMA" > /dev/null 2>&1
do
    echo "Waiting for Prisma to initialize..."
    sleep 1
done

# Vérifier que Prisma fonctionne correctement
if ! npx prisma query --schema="$PRISMA_SCHEMA" 'SELECT 1' > /dev/null 2>&1; then
    echo "Prisma initialization failed"
    exit 1
fi

# Exécuter les migrations Prisma
echo "Running Prisma migrations..."
npm run migrate

# Démarrer l'application avec Nest
echo "Starting the application..."
npm run start:dev