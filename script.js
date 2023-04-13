const form = document.querySelector('form');
const time = document.querySelector('#theoreticalTime');

// default values
form.batteryCount.value = 1;
form.batteryCapacity.value = 95;
form.batteryVoltage.value = 12;
form.inverterEfficiency.value = 0.8;
form.inverterVoltage.value = 110;

let previousValues = {}

const onClickEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // check if the values are the same as the previous values
    if(JSON.stringify(previousValues) === JSON.stringify(data)) {
        return;
    }

    // destructuring the data object to get the values
    const {
        batteryCapacity,
        batteryVoltage,
        inverterEfficiency,
        batteryCount,
        inverterVoltage,
        powerOutput
    } = data;

    const timeOutputEach = (batteryCapacity * batteryVoltage) / (powerOutput * inverterEfficiency);
    const timeOutputAll = (parseFloat(timeOutputEach) * parseInt(batteryCount));

    time.innerHTML = timeOutputAll;
    previousValues = data;
}

form.addEventListener('submit', onClickEvent);
