/* eslint-disable @typescript-eslint/no-explicit-any */
import '@jest/globals';
import '@testing-library/react';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null as any,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

if (!global.structuredClone) {
  global.structuredClone = (object: any) => {
    return JSON.parse(JSON.stringify(object));
  }
}

export const createMockResponse = (
  body: any,
  status: number,
  statusText: string
): Response => ({
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: {
      get: (headerName: string) => {
        if (headerName === 'content-type') {
          return 'application/json'
        }
        return null
      },
    },
    json: async () => body,
  } as unknown as Response
)
