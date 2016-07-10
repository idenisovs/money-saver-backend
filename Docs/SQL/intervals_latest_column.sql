ALTER TABLE intervals RENAME TO sqlitestudio_temp_table;

CREATE TABLE intervals (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    start  DATE    UNIQUE ON CONFLICT ROLLBACK
                   NOT NULL ON CONFLICT ROLLBACK,
    [end]  DATE    UNIQUE ON CONFLICT ROLLBACK
                   NOT NULL ON CONFLICT ROLLBACK,
    sum    DOUBLE  DEFAULT (0),
    userId TEXT    REFERENCES users (id) ON DELETE CASCADE
                   NOT NULL ON CONFLICT ROLLBACK,
    latest BOOLEAN DEFAULT 0
);

INSERT INTO intervals (
                          id,
                          start,
                          [end],
                          sum,
                          userId
                      )
                      SELECT id,
                             start,
                             "end",
                             sum,
                             userId
                        FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

UPDATE intervals SET latest = 1 WHERE end IN (SELECT max(end) FROM intervals GROUP BY userId);