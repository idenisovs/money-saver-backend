ALTER TABLE intervals RENAME TO sqlitestudio_temp_table;

CREATE TABLE intervals (id INTEGER PRIMARY KEY AUTOINCREMENT, start DATE NOT NULL ON CONFLICT ROLLBACK, "end" DATE NOT NULL ON CONFLICT ROLLBACK, sum DOUBLE DEFAULT (0), userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK, latest BOOLEAN DEFAULT 0);

INSERT INTO intervals (id, start, "end", sum, userId, latest) SELECT id, start, "end", sum, userId, latest FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;