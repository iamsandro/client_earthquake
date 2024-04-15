// Info: Ejemplo de uso:
// Info: const inputDateTime = "2024-04-15T14:47:23.493Z" | 1712955774682;
// Info: const formattedResult = formatDateTime(inputDateTime);
// Info: Salida: "2:47 p.m., 15/04/2024"

function formatDateTime(dateTimeOrTimestamp: string | number) {
    const dateObject = new Date(dateTimeOrTimestamp);

    // Formatea la hora
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedHours = hours > 12 ? hours - 12 : hours;
    const amPm = hours >= 12 ? "p.m." : "a.m.";
    const formattedTime = `${formattedHours}:${
        minutes < 10 ? "0" : ""
    }${minutes} ${amPm}`;

    // Formatea el día del mes con sufijo
    const day = dateObject.getDate();
    //const daySuffix = getDaySuffix(day); // Función para obtener el sufijo (por ejemplo, "15" -> "15 de abril")
    const monthNames = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];
    const month = dateObject.getMonth();
    const formattedMonth = monthNames[month];

    // Verifica si la fecha es hoy o ayer
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let formattedDate;
    if (dateObject.toDateString() === today.toDateString()) {
        formattedDate = "hoy";
    } else if (dateObject.toDateString() === yesterday.toDateString()) {
        formattedDate = "ayer";
    } else {
        //formattedDate = `${day}${daySuffix} de ${formattedMonth}`;
        formattedDate = `${day} de ${formattedMonth}`;
    }

    // Combina la hora, el día y el mes formateados
    const finalFormattedDateTime = `${formattedTime}, ${formattedDate}`;
    return finalFormattedDateTime;
}
// Función para obtener el sufijo del día (por ejemplo, "15" -> "15 de abril")
function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export default formatDateTime;
