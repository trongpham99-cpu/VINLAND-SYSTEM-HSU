export const formatISODate = (date, type = 'yyyy/MM/dd') => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
}

export const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')