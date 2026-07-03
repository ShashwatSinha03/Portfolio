const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    next: { revalidate: 0 },
  });

  const data = await response.json();
  return data.access_token as string;
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });

    // 204 = nothing currently playing
    if (response.status === 204) {
      return getRecentlyPlayed(accessToken);
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.item) {
      return getRecentlyPlayed(accessToken);
    }

    return {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url ?? "",
      songUrl: data.item.external_urls.spotify,
    };
  } catch {
    return null;
  }
}

async function getRecentlyPlayed(accessToken: string): Promise<SpotifyTrack | null> {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const item = data.items?.[0]?.track;

    if (!item) return null;

    return {
      isPlaying: false,
      title: item.name,
      artist: item.artists.map((a: { name: string }) => a.name).join(", "),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url ?? "",
      songUrl: item.external_urls.spotify,
    };
  } catch {
    return null;
  }
}
