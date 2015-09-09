SELECT 
    i.*,
    IFNULL((SELECT sum(sum) FROM payments WHERE time BETWEEN i.start AND i.end), 0.0) AS spent,
    (i.sum - IFNULL((SELECT sum(sum) FROM payments WHERE time BETWEEN i.start AND i.end), 0.0)) AS balance
FROM 
    intervals i