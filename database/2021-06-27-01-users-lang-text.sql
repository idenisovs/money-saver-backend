PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS
SELECT *
FROM users;

DROP TABLE users;

CREATE TABLE users
(
    id       INTEGER PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT UNIQUE ON CONFLICT ROLLBACK,
    login    TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK,
    password TEXT NOT NULL ON CONFLICT ROLLBACK,
    email    TEXT,
    timezone NUMERIC NOT NULL ON CONFLICT ROLLBACK DEFAULT (0),
    language TEXT NOT NULL ON CONFLICT ROLLBACK DEFAULT ('en'),
    [last]   DATETIME DEFAULT (0)
);

INSERT INTO users (id,
                   login,
                   password,
                   email,
                   timezone,
                   language,
                   [last])
SELECT id,
       login,
       password,
       email,
       timezone,
       language,
       "last"
FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;