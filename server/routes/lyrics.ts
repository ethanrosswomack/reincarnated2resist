import { Router } from 'express';
import { CloudflareAutoRAG } from './cloudflare-rag';

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  throw new Error('Missing Cloudflare credentials in environment variables');
}

const autoRAG = new CloudflareAutoRAG({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  indexName: 'hawk-eye-lyrics',
  projectName: 'lyrical-miracles'
});

const router = Router();

// Search lyrics semantically
router.get('/search', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const results = await autoRAG.semanticSearch(query as string, Number(limit) || 5);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search lyrics' });
  }
});

// Get deeper lyrical analysis
router.get('/analyze', async (req, res) => {
  try {
    const { query } = req.query;
    const analysis = await autoRAG.getLyricalContext(query as string);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze lyrics' });
  }
});

// Find thematic connections
router.get('/connections/:lyricId', async (req, res) => {
  try {
    const { lyricId } = req.params;
    const connections = await autoRAG.findThematicConnections(lyricId);
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find connections' });
  }
});

// Index new lyrics
router.post('/index', async (req, res) => {
  try {
    const { lyrics } = req.body;
    const result = await autoRAG.indexLyrics(lyrics);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to index lyrics' });
  }
});

export const lyricsRouter = router;