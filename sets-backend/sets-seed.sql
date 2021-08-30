-- both test users have the password "password"

INSERT INTO users (username, password, email)
VALUES ('gandalf',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'gtheg@middleearth.com'),
       ('frodo',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'ringbearer@middleearth.com'),
        ('guest',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'guest@fakemail.com');

INSERT INTO guests (guestname)
VALUES ('guest1'),
       ('guest2'),
       ('guest3'),
       ('guest4'),
       ('guest5'),
       ('guest6');

-- WIN, TIE, or NA
INSERT INTO games (id,gameResult,mode)
VALUES ('testgame1','WIN','multiplayer'),
       ('testgame2','TIE','multiplayer'),
       ('testgame3','NA', 'singleplayer'),
       ('testgame4','NA', 'singleplayer'),
       ('testgame5','NA', 'singleplayer'),
       ('testgame6','NA', 'singleplayer');

INSERT INTO user_games (username,game_id,user_result,user_score)
VALUES ('frodo',  'testgame1','win', 1),
       ('gandalf','testgame1','loss', 0),
       ('frodo',  'testgame2','tie', 5),
       ('gandalf','testgame2','tie', 5),
       ('guest',  'testgame2','loss', 0),
       ('frodo', 'testgame3','na', 10), -- no winner in singleplayer
       ('frodo', 'testgame4','na', 8), -- no winner in singleplayer
       ('frodo', 'testgame5','na', 9), -- no winner in singleplayer
       ('gandalf', 'testgame6','na', 11); -- no winner in singleplayer


        --     username VARCHAR(25) PRIMARY KEY,
--     password TEXT NOT NULL,
--     email TEXT NOT NULL
--         CHECK (position('@' IN email) > 1),
--     wins INT,
--     losses INT,
--     ties INT,
--     forefeits INT
