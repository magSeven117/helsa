import { keys } from './keys';

const env = keys();

export class DailyClient {
  private apiKey: string;
  private baseUrl = 'https://api.daily.co/v1';

  constructor() {
    this.apiKey = env.DAILY_API_KEY;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Daily.co API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async createRoom(appointmentId: string, options: {
    name: string;
    privacy: 'public' | 'private';
    properties?: Record<string, any>;
  }) {
    return await this.makeRequest('/rooms', {
      method: 'POST',
      body: JSON.stringify({
        name: options.name,
        privacy: options.privacy,
        properties: {
          appointmentId,
          ...options.properties,
        },
      }),
    });
  }

  async getRoom(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}`);
  }

  async deleteRoom(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}`, {
      method: 'DELETE',
    });
  }

  async createToken(roomName: string, userId: string, options: {
    exp?: number;
    isOwner?: boolean;
  }) {
    return await this.makeRequest('/meeting-tokens', {
      method: 'POST',
      body: JSON.stringify({
        room: roomName,
        user_id: userId,
        exp: options.exp || Math.floor(Date.now() / 1000) + 3600, // 1 hora por defecto
        is_owner: options.isOwner || false,
      }),
    });
  }

  async startTranscription(roomName: string, options: {
    language?: string;
    provider?: 'deepgram' | 'assembly';
  } = {}) {
    return await this.makeRequest(`/rooms/${roomName}/transcription`, {
      method: 'POST',
      body: JSON.stringify({
        language: options.language || 'es',
        provider: options.provider || 'deepgram',
      }),
    });
  }

  async stopTranscription(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}/transcription`, {
      method: 'DELETE',
    });
  }

  async startRecording(roomName: string, options: {
    layout?: 'single-participant' | 'grid' | 'active-speaker';
    maxDuration?: number;
  } = {}) {
    return await this.makeRequest(`/rooms/${roomName}/recordings`, {
      method: 'POST',
      body: JSON.stringify({
        layout: options.layout || 'grid',
        max_duration: options.maxDuration || 3600, // 1 hora por defecto
      }),
    });
  }

  async stopRecording(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}/recordings`, {
      method: 'DELETE',
    });
  }

  async getRoomParticipants(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}/participants`);
  }

  async endRoom(roomName: string) {
    return await this.makeRequest(`/rooms/${roomName}`, {
      method: 'DELETE',
    });
  }
}
