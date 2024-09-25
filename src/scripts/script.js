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