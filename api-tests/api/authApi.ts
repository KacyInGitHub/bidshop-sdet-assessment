import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';

// ---------- Request Types ----------

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ---------- Response Types ----------

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// ---------- API ----------

export class AuthApi {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async register(
    requestBody: RegisterRequest
  ): Promise<APIResponse> {
    return this.request.post('/auth/register', {
      data: requestBody
    });
  }

  async login(
    requestBody: LoginRequest
  ): Promise<APIResponse> {
    return this.request.post('/auth/login', {
      data: requestBody
    });
  }

  async getCurrentUser(
    token: string
  ): Promise<APIResponse> {
    return this.request.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}