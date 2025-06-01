// Supabase configuration
const SUPABASE_URL_CUSTOMERS = 'https://tsqknoaatygupzsviikg.supabase.co/rest/v1/customers';
const SUPABASE_URL_APPOINTMENTS = 'https://tsqknoaatygupzsviikg.supabase.co/rest/v1/appointments';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcWtub2FhdHlndXB6c3ZpaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAxMDUsImV4cCI6MjA2MzQ1NjEwNX0.jCSBHs9OPypVCU2nkIlaTe0GH5tnHt_Z_FblCGZMs0M';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
};

// Navigation functions
function showSection(sectionId) {
    window.location.href = `/pages/${sectionId}.html`;
}

function goHome() {
    window.location.href = '/dashboard.html';
}

// Data fetching
async function fetchData(url) {
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        throw new Error(`Error loading data: ${error.message}`);
    }
}

// Data display helpers
function createTable(data, headers) {
    if (!data || data.length === 0) {
        return '<div class="list-item">No data available</div>';
    }

    const table = document.createElement('table');
    
    // Table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header.toLowerCase().replace(' ', '_')] || '';
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

// Date parsing helper
function parseAppointmentDate(dateStr) {
    if (!dateStr) return null;
    let d = new Date(dateStr);
    if (!isNaN(d)) return d;
    d = new Date(dateStr.replace(' at', ''));
    if (!isNaN(d)) return d;
    return null;
}

// Export for use in other files
window.utils = {
    SUPABASE_URL_CUSTOMERS,
    SUPABASE_URL_APPOINTMENTS,
    headers,
    showSection,
    goHome,
    fetchData,
    createTable,
    parseAppointmentDate
}; 