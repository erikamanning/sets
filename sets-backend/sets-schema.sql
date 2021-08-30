CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT 
        -- CHECK (position('@' IN email) > 1)
);

CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    guestname VARCHAR(25)
        -- CHECK (position('@' IN email) > 1)
);

CREATE TABLE games (
    id VARCHAR(100) PRIMARY KEY,
    gameResult VARCHAR(25),
    mode VARCHAR(25)
);

CREATE TABLE user_games (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    game_id VARCHAR(100),
    user_result VARCHAR(4),
    user_score INT,
    FOREIGN KEY (game_id) REFERENCES games(id)
    -- FOREIGN KEY (username) REFERENCES users(username)
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