let headerLink = document.querySelectorAll('.header__link')
headerLink.forEach(e => {
    e.addEventListener("click", ()=> {
        for(elem of headerLink) {
            elem.classList.remove("header__link_active")
        }
        e.classList.add("header__link_active")
    })
})

// proc
var rangeSlider = document.querySelector('.form__slider');
var input0_proc = document.getElementById('input-with-keypress-0-proc');
var input1_proc = document.getElementById('input-with-keypress-1-proc');
var inputs_proc = [input0_proc, input1_proc];

noUiSlider.create(rangeSlider, {
    start: [0, 65],
    connect: true,
    tooltips: [
        true,
        wNumb({
            decimals: 0,
            suffix: '%'
        })
    ],
    range: {
        'min': [0],
        'max': 100
    },
    format: wNumb({
        decimals: 0,
        suffix: '%'
    })
});

var rangeSliderValueElement = document.getElementById('input-with-keypress-1-proc');

rangeSlider.noUiSlider.on('update', function (values, handle) {
    var leftValue = parseInt(values[0]);

    if (leftValue > 0) {
        rangeSlider.noUiSlider.set([0, values[1]]);
    }

    rangeSliderValueElement.innerHTML = values[handle];
    inputs_proc[handle].value = values[handle];
});

// Listen to keydown events on the input field.
inputs_proc.forEach(function (input, handle) {

    input.addEventListener('change', function () {
        rangeSlider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {

        var values = rangeSlider.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = rangeSlider.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {

            case 13:
                rangeSlider.noUiSlider.setHandle(handle, this.value);
                break;

            case 38:

                // Get step to go increase slider value (up)
                position = step[1];

                // false = no step is set
                if (position === false) {
                    position = 1;
                }

                // null = edge of slider
                if (position !== null) {
                    rangeSlider.noUiSlider.setHandle(handle, value + position);
                }

                break;

            case 40:

                position = step[0];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                    rangeSlider.noUiSlider.setHandle(handle, value - position);
                }

                break;
        }
    });
});

//кастомный селект
const customSelect = document.getElementById('customSelect');
const selectedOptionInput = document.getElementById('selectedOption');
const selectedDiv = customSelect.querySelector('.select__choice');
const itemsDiv = customSelect.querySelector('.select__items');

selectedDiv.addEventListener('click', function() {
    itemsDiv.style.display = itemsDiv.style.display === 'block' ? 'none' : 'block';
    selectedDiv.classList.toggle("scrollActive")
});

Array.from(itemsDiv.children).forEach(item => {
    item.addEventListener('click', function() {
        selectedDiv.innerText = this.innerText;
        selectedOptionInput.value = this.getAttribute('data-value');
        itemsDiv.style.display = 'none';
        selectedDiv.classList.remove("scrollActive")
    });
});

document.addEventListener('click', function(event) {
    if (!customSelect.contains(event.target)) {
        itemsDiv.style.display = 'none';
        selectedDiv.classList.remove("scrollActive")
    }
});