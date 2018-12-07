-- Deploy new database tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- Seed users data
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
