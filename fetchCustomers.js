const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tsqknoaatygupzsviikg.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcWtub2FhdHlndXB6c3ZpaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAxMDUsImV4cCI6MjA2MzQ1NjEwNX0.jCSBHs9OPypVCU2nkIlaTe0GH5tnHt_Z_FblCGZMs0M';

async function fetchCustomers() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/customers`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Customer data:', data);
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

// Execute the function
fetchCustomers(); 