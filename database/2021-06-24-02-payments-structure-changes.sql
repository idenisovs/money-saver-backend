PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS
SELECT * FROM payments;

DROP TABLE payments;

CREATE TABLE payments
(
    id INTEGER UNIQUE PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT,
    time DATETIME NOT NULL ON CONFLICT ROLLBACK DEFAULT (strftime('%s', 'now') * 1000),
    sum DECIMAL  NOT NULL ON CONFLICT ROLLBACK,
    userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK
);

INSERT INTO payments (id,
                      time,
                      sum,
                      userId)
SELECT id,
       time,
       sum,
       userId
FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

UPDATE payments SET time = strftime('%Y-%m-%dT%H:%M:%fZ', time / 1000, 'unixepoch');