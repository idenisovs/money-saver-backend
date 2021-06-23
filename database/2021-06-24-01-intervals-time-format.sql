UPDATE intervals
SET start = strftime('%Y-%m-%dT%H:%M:%S.%fZ', start / 1000, 'unixepoch'),
    [end] = strftime('%Y-%m-%dT%H:%M:%S.%fZ', [end] / 1000, 'unixepoch');