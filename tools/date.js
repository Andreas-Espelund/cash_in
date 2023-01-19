const timeToDateText = (timestamp) => new Date(timestamp.seconds * 1000).toLocaleDateString('nb-NO',{day:'2-digit', month:'2-digit', year:'numeric'})
const TODAY = new Date()



export {timeToDateText, TODAY }