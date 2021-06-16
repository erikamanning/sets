CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    score INTEGER CHECK (score > 0),
    winner VARCHAR(25)
        REFERENCES users ON DELETE CASCADE
);

-- CREATE TABLE user_games (
--     username VARCHAR(25) PRIMARY KEY,
--     password TEXT NOT NULL
-- );

-- CREATE TABLE users (
--   username VARCHAR(25) PRIMARY KEY,
--   password TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   email TEXT NOT NULL
--     CHECK (position('@' IN email) > 1),
--   is_admin BOOLEAN NOT NULL DEFAULT FALSE
-- );