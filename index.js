eventCount = 0


addEvent()


function addEvent(){
    eventHTML = `<div class="card mx-auto bg-light" style="margin-top:10px">
<div class="card-body">
    <h5 class="card-title">Event</h5>
    <p class="card-text"></p>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Titel</span>
        </div>
        <input type="text" id="title${eventCount}" class="form-control" aria-label="Titel" value="Rover ">
    </div>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text">Datum</span>
    </div>
    <input type="date" id="date${eventCount}" class="form-control" aria-label="Datum">
    </div>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text">Ort</span>
    </div>
    <input type="text" id="loc${eventCount}" class="form-control" aria-label="Ort">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Beschreibung</span>
        </div>
        <textarea class="form-control" id="desc${eventCount}" rows="1" aria-label="Beschreibung"></textarea>
    </div>
</div>
</div>`
    const subject = document.querySelector('#insertPosition');
    subject.insertAdjacentHTML("beforebegin", eventHTML);
    eventCount++    
}

function createICS(){

    icsString = `BEGIN:VCALENDAR
VERSION:2.0
`

    for (let i = 0; i < eventCount; i++) {
        
        title = document.querySelector('#title'+i).value
        desc = document.querySelector('#desc'+i).value
        date = new Date(document.querySelector('#date'+i).value)
        loc = document.querySelector('#loc'+i).value

        endDate = new Date(date.getTime() + 86400000)
        console.log(date)

        icsString += `BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:${title}\\nDate - ${date.toLocaleDateString('en', {month: "short"})} ${date.toLocaleDateString('en', {day: "2-digit"})}\\, ${date.toLocaleDateString('en', {year: "numeric"})}\\nVenue - ${loc}\\n${desc}\\n
DTSTART:${date.toLocaleDateString('en', {year: "numeric"})}${date.toLocaleDateString('en', {month: "2-digit"})}${date.toLocaleDateString('en', {day: "2-digit"})}
DTEND:${endDate.toLocaleDateString('en', {year: "numeric"})}${endDate.toLocaleDateString('en', {month: "2-digit"})}${endDate.toLocaleDateString('en', {day: "2-digit"})}
LOCATION:${loc}
SUMMARY;LANGUAGE=en-us:${title}
END:VEVENT
`
    }

    icsString += "END:VCALENDAR"
    console.log(icsString)

    var link = document.createElement('a');
    link.download = 'events.ics';
    var blob = new Blob([icsString], {type: 'text/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
}