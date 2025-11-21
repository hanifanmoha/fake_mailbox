export function formatTimeString(date: Date) {
    date = new Date(date)

    if (isNaN(date.getTime())) {
        return "Invalid Date"
    }

    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    })
}