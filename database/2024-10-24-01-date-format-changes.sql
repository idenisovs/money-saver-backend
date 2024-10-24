PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS
SELECT *
FROM payments;

DROP TABLE payments;

CREATE TABLE payments
(
    id         INTEGER UNIQUE PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT,
    date       DATE    NOT NULL ON CONFLICT ROLLBACK DEFAULT (DATE('now')),
    sum        DECIMAL NOT NULL ON CONFLICT ROLLBACK,
    userId     TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK,
    createdAt  DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc'))
);

INSERT INTO payments (id, date, sum, userId)
SELECT id, time, sum, userId FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

UPDATE payments SET createdAt = date, date = date(date);
UPDATE intervals SET start = date(start), end = date(end);