-- change vars.db to the name of the db you wish to terminate connections from
set session vars.db = 'staging';

-- SEE WHO'S CONNECTED to both dbs
SELECT pid, usename, client_addr 
FROM pg_stat_activity 
WHERE datname ='production';
SELECT pid, usename, client_addr 
FROM pg_stat_activity 
WHERE datname = current_setting('vars.db')::varchar;
-- TERMINATE ACTIVE CONNECTIONS
SELECT pg_terminate_backend (pid)
FROM pg_stat_activity
WHERE datname = 'production';
SELECT pg_terminate_backend (pid)
FROM pg_stat_activity
WHERE datname = current_setting('vars.db')::varchar;
