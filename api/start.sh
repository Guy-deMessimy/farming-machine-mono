#!/bin/sh
set -e  # Arrête le script si une commande échoue

# Définir le chemin du schéma Prisma
PRISMA_SCHEMA="/app/api/prisma/schema.prisma"

# Générer les fichiers Prisma
echo "Generating Prisma client..."
npx prisma generate --schema="$PRISMA_SCHEMA"

# Attendre l'initialisation de Prisma avec un timeout
MAX_RETRIES=30
RETRY_COUNT=0
echo "Waiting for database to be ready..."
until npx prisma db pull --schema="$PRISMA_SCHEMA" > /dev/null 2>&1 || [ $RETRY_COUNT -eq $MAX_RETRIES ]
do
    echo "Waiting for Prisma to initialize... (Attempt $((RETRY_COUNT+1))/$MAX_RETRIES)"
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "Failed to initialize Prisma after $MAX_RETRIES attempts."
    exit 1
fi

echo "Prisma initialized successfully."

# Vérifier que Prisma fonctionne correctement
echo "Checking Prisma connection..."
if ! npx prisma db execute --schema="$PRISMA_SCHEMA" --stdin <<EOF
SELECT 1;
EOF
then
    echo "Prisma initialization failed"
    exit 1
fi

# Afficher des informations de débogage
echo "DATABASE_URL: $DATABASE_URL"
echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la

# Exécuter les migrations Prisma
echo "Running Prisma migrations..."
npx prisma migrate deploy --schema="$PRISMA_SCHEMA"

# Démarrer l'application avec Nest
echo "Starting the application..."
exec npm run start:dev