// pages/api/sync.js
import API_URL from '../../lib/config';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // First section: Fetching full sync data
            let data;
            try {
                const response = await fetch(`${API_URL}/sync/full`, {
                    method: 'GET',
                    headers: {
                        Authorization: req.headers.authorization, // Pass through the auth token
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error fetching full sync data: ${errorText}`);
                    return res.status(response.status).json({ message: 'Failed to fetch full sync data', details: errorText });
                }

                data = await response.json(); // Successfully fetched sync data
                console.log('Fetched full sync data:', data);
            } catch (error) {
                console.error('Error fetching sync data:', error.message);
                return res.status(500).json({ message: 'Error fetching sync data', error: error.message });
            }

            // Second section: Fetching preview links for each id
            try {
                const previewLinks = []; // Initialize an empty array for preview links

                // Use a for loop to fetch each preview link sequentially
                for (let item of data) {
                    const id = item.id; // Extract the 'id' from each object

                    if (!id) {
                        console.error('Missing ID in item:', item);
                        throw new Error('Missing ID in data');
                    }

                    console.log(`Fetching preview for ID: ${id}`);

                    const previewResponse = await fetch(`${API_URL}/preview/${id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: req.headers.authorization, // Pass through the auth token
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!previewResponse.ok) {
                        const errorText = await previewResponse.text();
                        console.error(`Error fetching preview for ID ${id}: ${errorText}`);
                        continue; // Skip this ID and continue with the next
                    }

                    const previewLink = await previewResponse.text(); // Expecting a URL (link) as a text response
                    previewLinks.push(previewLink); // Add the preview link to the array
                }

                // Return the list of preview links in the response
                return res.status(200).json({ previewLinks });
            } catch (error) {
                console.error('Error fetching preview links:', error.message);
                return res.status(500).json({ message: 'Error fetching preview links', error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}

