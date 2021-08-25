
\echo 'Delete and recreate sets db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sets;
CREATE DATABASE sets;
\connect sets

\i sets-schema.sql
\i sets-seed.sql

\echo 'Delete and recreate sets_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sets_test;
CREATE DATABASE sets_test;
\connect sets_test

\i sets-schema.sql
