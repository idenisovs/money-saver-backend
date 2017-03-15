ALTER TABLE users RENAME TO sqlitestudio_temp_table;

CREATE TABLE users (id INTEGER PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT UNIQUE ON CONFLICT ROLLBACK, login TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK, password TEXT NOT NULL ON CONFLICT ROLLBACK, email TEXT, timezone NUMERIC NOT NULL ON CONFLICT ROLLBACK DEFAULT (0), language NUMERIC DEFAULT en NOT NULL ON CONFLICT ROLLBACK, last DATETIME DEFAULT (0));

INSERT INTO users (id, login, password, email, timezone, language) SELECT id, login, password, email, timezone, language FROM sqlitestudio_temp_table;

ALTER TABLE payments RENAME TO sqlitestudio_temp_table0;

CREATE TABLE payments (id INTEGER UNIQUE PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT, time DATETIME NOT NULL ON CONFLICT ROLLBACK DEFAULT (strftime('%s', 'now') * 1000), date DATE DEFAULT (strftime('%Y-%m-%d', 'now')), sum DECIMAL NOT NULL ON CONFLICT ROLLBACK, userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK);

INSERT INTO payments (id, time, date, sum, userId) SELECT id, time, date, sum, userId FROM sqlitestudio_temp_table0;

DROP TABLE sqlitestudio_temp_table0;

ALTER TABLE intervals RENAME TO sqlitestudio_temp_table0;

CREATE TABLE intervals (id INTEGER PRIMARY KEY AUTOINCREMENT, start DATE NOT NULL ON CONFLICT ROLLBACK, "end" DATE NOT NULL ON CONFLICT ROLLBACK, sum DOUBLE DEFAULT (0), userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK, latest BOOLEAN DEFAULT 0);

INSERT INTO intervals (id, start, "end", sum, userId, latest) SELECT id, start, "end", sum, userId, latest FROM sqlitestudio_temp_table0;

DROP TABLE sqlitestudio_temp_table0;

DROP TABLE sqlitestudio_temp_table;