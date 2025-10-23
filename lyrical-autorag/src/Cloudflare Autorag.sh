#Cloudflare Autorag
# Search lyrics
GET /api/lyrics/search?query=conscious+revolution&limit=5

# Analyze lyrics
GET /api/lyrics/analyze?query=What+themes+connect+Swordfish+and+Mind+Kontrol

# Find connections
GET /api/lyrics/connections/full-disclosure-swordfish

# Index new lyrics
POST /api/lyrics/index
{
  "lyrics": [{
    "title": "Swordfish",
    "content": "...",
    "album": "Full Disclosure"
  }]
}
