document.addEventListener("DOMContentLoaded", function() {
    const selectYearElement = document.querySelector('.select-year');
    const prevBtnYear = document.querySelector('.prev-btn-year');
    const nextBtnYear = document.querySelector('.next-btn-year');
    const selectMonthElement = document.querySelector('.select-month');
    const prevBtnMonth = document.querySelector('.prev-btn-month');
    const nextBtnMonth = document.querySelector('.next-btn-month');
    const daysElement = document.querySelector('.days');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function displayCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for the first day of the month (0-6, where 0 is Sunday)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total number of days in the month
        
        daysElement.innerHTML = "";
        
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const headerRow = document.createElement("div");
        headerRow.classList.add("header-row");
        daysOfWeek.forEach(day => {
            const dayCell = document.createElement("div");
            dayCell.textContent = day;
            dayCell.classList.add("day");
            headerRow.appendChild(dayCell);
        });
        daysElement.appendChild(headerRow);
        
        let currentDate = 1;
        for (let i = 0; i < 6; i++) { // 6 rows max to cover all possible cases
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < 7; j++) { // 7 cells for each row (one for each day of the week)
                if (i === 0 && j < firstDayOfMonth) { // Empty cells before the first day of the month
                    const emptyCell = document.createElement("div");
                    emptyCell.classList.add("day-empty");
                    row.appendChild(emptyCell);
                } else if (currentDate > daysInMonth) { // No more days to display
                    const emptyCell = document.createElement("div");
                    emptyCell.classList.add("day-empty");
                    row.appendChild(emptyCell);
                } else { // Cells with day numbers
                    const dayCell = document.createElement("div");
                    dayCell.textContent = currentDate;
                    dayCell.classList.add("day");
                    if (currentDate === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                        dayCell.classList.add("current-month");
                    }
                    row.appendChild(dayCell);
                    currentDate++;
                }
            }
            daysElement.appendChild(row);
        }
    }

    function updateSelectedMonthAndYear() {
        selectMonthElement.selectedIndex = currentMonth;
        selectYearElement.value = currentYear;
        displayCalendar(currentMonth, currentYear);
    }

    prevBtnYear.addEventListener('click', () => {
        if(currentYear > 1990)
            currentYear--;
        updateSelectedMonthAndYear();
    })

    nextBtnYear.addEventListener('click', () => {
        if(currentYear < currentDate.getFullYear())
            currentYear++;
        updateSelectedMonthAndYear();
    })

    prevBtnMonth.addEventListener('click', () => {
        if (currentMonth > 0)
            currentMonth--;
        updateSelectedMonthAndYear();
    })

    nextBtnMonth.addEventListener('click', () => {
        if (currentMonth < 11)
            currentMonth++;
        updateSelectedMonthAndYear();
    })

    selectMonthElement.addEventListener('change', () => {
        currentMonth = selectMonthElement.selectedIndex;
        updateSelectedMonthAndYear();
    });

    // Event listener for year selection
    selectYearElement.addEventListener('change', () => {
        currentYear = parseInt(selectYearElement.value);
        updateSelectedMonthAndYear();
    });


    function monthYearList() {
        for(let i=0; i < 12; i++) {
            const optionElement = document.createElement('option');
            optionElement.textContent = getMonthName(i);
            selectMonthElement.appendChild(optionElement);
        }

        for(let i = currentYear; i >= 1990; i--) {
            const optionElement = document.createElement('option');
            optionElement.textContent = i;
            selectYearElement.appendChild(optionElement);
        }
        updateSelectedMonthAndYear();
    } monthYearList()

    function getMonthName(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    
    // 
})