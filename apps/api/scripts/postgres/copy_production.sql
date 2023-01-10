-- Example with staging
-- Each is run as a seperate transaction block
-- 1 Terminate active connections to production and target db
-- ./terminate_connections.sql
-- 2 Drop target db, e.g. staging
DROP DATABASE IF EXISTS staging;
-- 3 Clone target db, e.g. production into staging
CREATE DATABASE staging
WITH TEMPLATE production;
