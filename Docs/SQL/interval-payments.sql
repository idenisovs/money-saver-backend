SELECT p.date, sum(p.sum) AS sum
FROM intervals i
LEFT OUTER JOIN payments p ON p.time > i.start AND p.time < i.end
WHERE i.id = 2
GROUP BY date;