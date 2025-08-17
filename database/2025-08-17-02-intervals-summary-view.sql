create view interval_summaries as
with intervals_base as (
    select
        i.id,
        i.start,
        i.end,
        i.sum,
        cast(julianday(i.end) - julianday(i.start) as integer) + 1 as days,
        i.userId
    from intervals i
)
select
    b.id,
    b.start,
    b.end,
    b.sum,
    b.days,
    ifnull(b.sum, 0) * 1.0 / nullif(b.days, 0) as daily_balance,
    ifnull(sum(p.sum), 0) as expenses,
    ifnull(sum(p.sum), 0) * 1.0 / nullif(b.days, 0) as average_expenses,
    p.userId
from intervals_base b
left join payments p on p.date >= b.start and p.date <= b.end and p.userId = b.userId
group by b.id, b.start, b.end, b.sum, b.userId, b.days
order by start desc;
