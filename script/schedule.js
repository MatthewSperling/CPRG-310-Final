// Your Google API Key and the Calendar ID
const API_KEY = 'AIzaSyCWLfqXiZ_DCeUDGYbx2HQyy1JzwW83Kps';  // Replace with your actual API key
const CALENDAR_ID = 'aws.neilcapistrano@gmail.com'; // Replace with your Calendar ID

// Calendar
var calendarEl = document.getElementById('calendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
    googleCalendarApiKey: API_KEY,
    events: {
      googleCalendarId: CALENDAR_ID
    },
    eventMouseEnter: function (ev) {
        console.log(ev)
       
        let tooltipHTML = `
            <article>
                <h3>${ev.event.title}</h3>
                <h4>${ev.event.start.toLocaleDateString()}</h4>
                <span>${ev.event._def.extendedProps.description || 'No details set'}</span>
            </article>
        `;

        tippy(ev.el, {
            content: tooltipHTML,
            allowHTML: true,
          });
    },
    eventMouseLeave: function (event) {
       
    }
  });
calendar.render();

// Validation function
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const services = document.getElementById('services');

// ADDED JS CONTENT FOR VALIDATION

    // Reset all error styles and messages
    clearErrors([name, email, date, time, services]);

    let isValid = true;

    if (!name.value.trim()) {
        showError(name, '*Please enter your name.');
        isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, '*Please enter a valid email address.');
        isValid = false;
    }

    if (!date.value.trim()) {
        showError(date, '*Please select a preferred date.');
        isValid = false;
    }

    if (!time.value.trim()) {
        showError(time, '*Please select a preferred time.');
        isValid = false;
    }

    if (!services.value || services.value === '#') {
        showError(services, '*Please select a service.');
        isValid = false;
    }

    return isValid; // Return true only if all validations passed
}


// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show an error message
function showError(input, message) {
    input.classList.add('error');

    // Check if an error message already exists
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
        // Create a new error message
        error = document.createElement('span');
        error.classList.add('error-message');
        error.style.color = 'red';
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    // Set the error message text
    error.textContent = message;
}

// Helper function to clear all error styles and messages
function clearErrors(fields) {
    fields.forEach(field => {
        field.classList.remove('error');
        const error = field.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
    });
}

// Real-time validation function
function addRealTimeValidation() {
    const fields = document.querySelectorAll('#name, #email, #date, #time, #services');

    fields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address.');
            } else if (field.value.trim() === '' || (field.tagName === 'SELECT' && field.value === '#')) {
                if (field.tagName === 'SELECT') {
                    showError(field, 'Please select a service.');
                } else {
                    showError(field, `Please fill out this field.`);
                }
            } else {
                clearErrors([field]); // Remove the error if the input is valid
            }
        });

        // For dropdown (select), listen to the "change" event
        if (field.tagName === 'SELECT') {
            field.addEventListener('change', () => {
                if (field.value !== '#') {
                    clearErrors([field]); // Remove error if a valid option is selected
                } else {
                    showError(field, 'Please select a service.');
                }
            });
        }
    });
}

// Initialize real-time validation when the page loads
document.addEventListener('DOMContentLoaded', addRealTimeValidation);


// Set Event in Google

const addEvent = () => {
    if (!validateForm()) {
        return; // Exit the function if validation fails
    }
    // const title = document.getElementById("title").value;
    // const desc = document.getElementById("desc").value;
    // const date = document.getElementById("date").value;
    // const start = document.getElementById("st").value;
    // const end = document.getElementById("et").value;
    
    const title = 'test';
    const desc = 'test descript';
    const date = '2024-11-30';
    const start = '12:00';
    const end = '13:00';

    const startTime = new Date(date + "," + start).toISOString();
    const endTime = new Date(date + "," + end).toISOString();
  
    // var event = {
    //   summary: title,
    //   location: "Google Meet",
    //   description: desc,
    //   start: {
    //     dateTime: startTime,
    //     timeZone: "America/Los_Angeles"
    //   },
    //   end: {
    //     dateTime: endTime,
    //     timeZone: "America/Los_Angeles"
    //   },
    //   recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    //   attendees: [
    //     { email: "abc@google.com" },
    //     { email: "xyz@google.com" }
    //   ],
    //   reminders: {
    //     useDefault: false,
    //     overrides: [
    //       { method: "email", minutes: 24 * 60 },
    //       { method: "popup", minutes: 10 }
    //     ]
    //   }
    // };
  
    const event = {
        summary: 'Test Event',  // Title of the event
        location: '123 Main St, City',  // Location
        description: 'This is a test event.',  // Description
        start: {
            dateTime: '2024-12-01T10:00:00-07:00',  // Start date/time
            timeZone: 'America/Denver'  // Timezone
        },
        end: {
            dateTime: '2024-12-01T11:00:00-07:00',  // End date/time
            timeZone: 'America/Denver'  // Timezone
        }
    };
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Event created: ', data);
        alert('Event successfully added to Google Calendar');
    })
    .catch(error => {
        console.error('Error creating event:', error);
    });
};

