import type { NextApiRequest, NextApiResponse } from "next";

// Assuming you have a Comment interface
interface Comment {
  id: string;
  slug: string;
  author: string;
  content: string;
  createdAt: string;
  // Add other comment properties as needed
}

type Data = {
  comments?: Comment[];
  message?: string;
  error?: string;
};

const API_URL = "http://localhost:5000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const { slug } = query;
        
        // Build the query string for json-server
        let url = `${API_URL}/comments`;
        if (slug) {
					console.log("in the get Comments, slug found")
          url += `?slug=${slug}`;
        }


        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }
        
        const comments = await response.json();
        res.status(200).json({ comments });
      } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
      }
      break;

    case 'POST':
      // TODO: Handle creating a new comment
      res.status(501).json({ error: 'POST method not implemented yet' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${method} not allowed` });
      break;
			// fetch (api/comment, {method: 'PATCH'}) ---> Method PATCH not allowed
  }
}