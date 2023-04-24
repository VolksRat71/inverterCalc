const viewSelect = document.querySelector('.viewSelect');

const towCapacity = (() => {
    const template = document.createElement("div");
    const str = `
    <form class="inputForm">
        <label for="gvwr">GVWR:</label>
        <input type="number" name="gvwr" id="gvwr" required /><br />
        <label for="additionalWeight">Additional Weight Added:</label>
        <input type="number" name="additionalWeight" id="additionalWeight" required /><br />
        <label for="gcwr">GCWR:</label>
        <input type="number" name="gcwr" id="gcwr" required /><br />
        <input type="submit" value="Calculate" />
        <p>
            Tow Capacity: <b><span id="towCapacity">No Value</span></b> lbs
        </p>
    </form>
    `

    const formEl = document.createElement("form");
    formEl.classList.add("inputForm");

    const labelsAndInputs = [
        {
            label: "GVWR:",
            input: {
                type: "number",
                name: "gvwr",
                id: "gvwr",
                required: true
            }
        },
        {
            label: "Additional Weight Added:",
            input: {
                type: "number",
                name: "additionalWeight",
                id: "additionalWeight",
                required: true
            }
        },
        {
            label: "GCWR:",
            input: {
                type: "number",
                name: "gcwr",
                id: "gcwr",
                required: true
            }
        },
        {
            input: {
                type: "submit",
                value: "Calculate"
            }
        }
    ];

    for (var i = 0; i < labelsAndInputs.length; i++) {
        const label = labelsAndInputs[i].label;
        const input = labelsAndInputs[i].input;

        if (label) {
            const labelEl = document.createElement("label");
            labelEl.setAttribute("for", input.id);
            labelEl.textContent = label;
            formEl.appendChild(labelEl);
        }

        const inputEl = document.createElement("input");
        inputEl.setAttribute("type", input.type);
        inputEl.setAttribute("name", input.name);
        inputEl.setAttribute("id", input.id);
        inputEl.setAttribute("required", input.required);
        inputEl.setAttribute("value", input.value);
        formEl.appendChild(inputEl);
    }


        const form = document.querySelector('.inputForm');
        const time = document.querySelector('#theoreticalTime');

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
            if (JSON.stringify(previousValues) === JSON.stringify(data)) {
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

        return template;
    }) ();


    const batteryTime = `
<form class="inputForm">
    <label for="batteryCount">Battery Count:</label>
    <input type="number" name="batteryCount" id="batteryCount" required /><br />
    <label for="batteryCapacity">Battery Capacity (AH):</label>
    <input type="number" name="batteryCapacity" id="batteryCapacity" required /><br />
    <label for="batteryVoltage">Battery Voltage (V):</label>
    <input type="number" name="batteryVoltage" id="batteryVoltage" required /><br />
    <label for="inverterEfficiency"
        >Power Inverter Inverter Efficiency (%):</label
    >
    <input
        type="number"
        step="0.01"
        name="inverterEfficiency"
        id="inverterEfficiency"
        required
    /><br />
    <label for="inverterVoltage">Power Inverter (V):</label>
    <input type="number" name="inverterVoltage" id="inverterVoltage" disabled /><br />
    <label for="powerOutput">Power Output (W):</label>
    <input type="number" name="powerOutput" id="powerOutput" required /><br />
    <input type="submit" value="Calculate" />

    <!-- Can we make a class that is p tag with that displays the theoretical time as a span -->
    <p>
        Theoretical Time: <b><span id="theoreticalTime">No Value</span></b>Hours
    </p>
</form>
`

    const templates = {
        towCapacity,
        batteryTime
    }


    console.log(templates);

    viewSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        console.log(selected);
    });
