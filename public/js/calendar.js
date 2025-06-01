let fullCalendarInstance = null;

async function initCalendar() {
    const calendarEl = document.getElementById('fullcalendar');
    if (!calendarEl) return;

    calendarEl.innerHTML = '<div class="loading">Loading calendar...</div>';
    
    try {
        const data = await utils.fetchData(utils.SUPABASE_URL_APPOINTMENTS);
        
        // Convert appointments to FullCalendar events
        const events = data.map(app => {
            const start = utils.parseAppointmentDate(app.date);
            return {
                title: app.summary || app.name || 'No title',
                start: start ? start.toISOString() : undefined,
                allDay: false,
                extendedProps: app
            };
        }).filter(ev => ev.start);

        // Destroy previous instance if exists
        if (fullCalendarInstance) {
            fullCalendarInstance.destroy();
        }

        // Initialize FullCalendar
        fullCalendarInstance = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            height: 650,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            events: events,
            eventClick: function(info) {
                const app = info.event.extendedProps;
                let html = `<strong>${app.name || 'No Name'}</strong><br>`;
                html += `<span>${app.summary || ''}</span><br>`;
                html += `<span style='color:#666;'>${app.date}</span>`;
                showEventPopover(info.jsEvent, html);
            },
            eventDisplay: 'block',
            nowIndicator: true
        });

        fullCalendarInstance.render();
    } catch (err) {
        calendarEl.innerHTML = `<div class='error'>Error loading calendar: ${err.message}</div>`;
    }
}

// Simple popover for event details
function showEventPopover(jsEvent, html) {
    let pop = document.getElementById('fc-popover');
    if (pop) pop.remove();
    
    pop = document.createElement('div');
    pop.id = 'fc-popover';
    pop.style.position = 'fixed';
    pop.style.left = jsEvent.clientX + 10 + 'px';
    pop.style.top = jsEvent.clientY + 10 + 'px';
    pop.style.background = '#fff';
    pop.style.border = '1px solid #ccc';
    pop.style.borderRadius = '8px';
    pop.style.boxShadow = '0 2px 8px #0002';
    pop.style.padding = '16px';
    pop.style.zIndex = 9999;
    pop.innerHTML = html + '<br><button style="margin-top:10px;" onclick="document.getElementById(\'fc-popover\').remove()">Close</button>';
    
    document.body.appendChild(pop);
    
    // Remove on click outside
    setTimeout(() => {
        document.addEventListener('mousedown', function handler(e) {
            if (!pop.contains(e.target)) {
                pop.remove();
                document.removeEventListener('mousedown', handler);
            }
        });
    }, 100);
}

// Initialize calendar when the page loads
document.addEventListener('DOMContentLoaded', initCalendar); 