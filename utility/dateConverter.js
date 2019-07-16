function dateConverter(timeInMs) {
    const date = new Date(timeInMs);
    
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return  `${(hour < 10) ? `0${hour}` : hour}:${(minutes < 10) ? `0${minutes}` : minutes}`
}