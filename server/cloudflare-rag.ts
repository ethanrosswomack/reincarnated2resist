import axios from 'axios';

interface CloudflareRAGConfig {
  accountId: string;
  apiToken: string;
  indexName: string;
  projectName?: string;
}

export class CloudflareAutoRAG {
  private accountId: string;
  private apiToken: string;
  private indexName: string;
  private baseUrl: string;
  private projectName: string;

  constructor(config: CloudflareRAGConfig) {
    this.accountId = config.accountId;
    this.apiToken = config.apiToken;
    this.indexName = config.indexName;
    this.projectName = config.projectName || 'lyrical-miracles';
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run`;
  }

  private async makeRequest(endpoint: string, data: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error) {
      console.error('Cloudflare AutoRAG Error:', error);
      throw error;
    }
  }

  /**
   * Query the vector store for similar content
   */
  async semanticSearch(query: string, limit: number = 5) {
    return this.makeRequest('@cf/baai/bge-base-en-v1.5', {
      text: query,
      index_name: this.indexName,
      project_name: this.projectName,
      limit,
    });
  }

  /**
   * Retrieve lyrics with context using AutoRAG
   */
  async getLyricalContext(query: string) {
    return this.makeRequest('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: 'You are an expert in analyzing hip-hop lyrics and their deeper meanings.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      rag_config: {
        index_name: this.indexName,
        project_name: this.projectName,
        limit: 3
      }
    });
  }

  /**
   * Add new lyrics to the vector store
   */
  async indexLyrics(lyrics: { title: string; content: string; album?: string }[]) {
    const documents = lyrics.map(lyric => ({
      id: `${lyric.album || 'single'}-${lyric.title}`.toLowerCase().replace(/\s+/g, '-'),
      text: lyric.content,
      metadata: {
        title: lyric.title,
        album: lyric.album
      }
    }));

    return this.makeRequest('vectorize', {
      documents,
      index_name: this.indexName,
      project_name: this.projectName
    });
  }

  /**
   * Find thematic connections between lyrics
   */
  async findThematicConnections(lyricId: string) {
    const lyrics = await this.getLyricById(lyricId);
    if (!lyrics) return null;

    return this.semanticSearch(lyrics.content, 10);
  }

  /**
   * Get a specific lyric by ID
   */
  private async getLyricById(id: string) {
    return this.makeRequest('retrieve', {
      id,
      index_name: this.indexName,
      project_name: this.projectName
    });
  }
}

// Example usage:
/*
const autoRAG = new CloudflareAutoRAG({
  accountId: '74b94b7ffc15701b77e53f81bea03813',
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  indexName: 'hawk-eye-lyrics',
  projectName: 'lyrical-miracles'
});

// Search lyrics
const results = await autoRAG.semanticSearch('conscious hip hop revolution');

// Get deeper context
const analysis = await autoRAG.getLyricalContext('What themes connect Swordfish and Mind Kontrol?');

// Index new lyrics
await autoRAG.indexLyrics([{
  title: 'Swordfish',
  content: '...lyrics content...',
  album: 'Full Disclosure'
}]);
*/