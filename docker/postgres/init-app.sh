#!/bin/sh
set -eu

# Bu fayl yalnız boş volume ilk dəfə başladıqda işləyir.
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  --set ON_ERROR_STOP=1 --set app_password="$APP_DB_PASSWORD" <<'SQL'
CREATE ROLE langedu LOGIN PASSWORD :'app_password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
ALTER DATABASE langedu OWNER TO langedu;
GRANT ALL ON SCHEMA public TO langedu;
SQL
