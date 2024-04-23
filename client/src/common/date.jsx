let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const getDay = (timestamp) => {
    let date = new Date(timestamp);

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}` 
}