UPDATE intervals
SET start = strftime('%Y-%m-%dT%H:%M:%fZ', start / 1000, 'unixepoch'),
    [end] = strftime('%Y-%m-%dT%H:%M:%fZ', [end] / 1000, 'unixepoch');