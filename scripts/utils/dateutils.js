export function getFormattedDate(date) {
    let dt = date || new Date();
    if (typeof dt !== Date) {
        dt = new Date(dt);
    }
    // const day = dt.getDate(), month = dt.getMonth() + 1, year = dt.getFullYear();
    // return `${year}-${month}-${day}`;
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(dt); // (info) e.g. 18 April 2024
}

export function getFormattedTime(date) {
    let dt = date || new Date();
    if (typeof dt !== Date) {
        dt = new Date(dt);
    }
    return new Intl.DateTimeFormat('en-IN', {
        hourCycle: 'h24',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(dt); // (info) e.g. 23:59:00
}