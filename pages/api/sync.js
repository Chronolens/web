// pages/api/sync.js
import API_URL from '../../lib/config';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const response = await fetch(`${API_URL}/sync/full`, {
                    method: 'GET',
                    headers: {
                        Authorization: req.headers.authorization, // Pass through the auth token
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    return res.status(response.status).json({ message: 'Failed to fetch data' });
                }

                const data = await response.json();
                return res.status(200).json(data);
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        default:
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
