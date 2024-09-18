import { NextApiRequest, NextApiResponse } from 'next';

import { readFileSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/pdf');
  res.end(
    readFileSync(
      './public/assets/papers/Litepaper_Session_private_messenger.pdf'
    )
  );
}
