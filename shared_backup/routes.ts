import { z } from 'zod';
import { 
  insertProjectSchema, 
  insertServiceSchema, 
  insertTeamMemberSchema, 
  insertOrderSchema,
  projects,
  services,
  teamMembers,
  orders 
} from './schema';

// === SHARED ERROR SCHEMAS ===
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// === API CONTRACT ===
export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id' as const,
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects' as const,
      input: insertProjectSchema,
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/projects/:id' as const,
      input: insertProjectSchema.partial(),
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/projects/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services' as const,
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/services/:id' as const,
      responses: {
        200: z.custom<typeof services.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/services' as const,
      input: insertServiceSchema,
      responses: {
        201: z.custom<typeof services.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/services/:id' as const,
      input: insertServiceSchema.partial(),
      responses: {
        200: z.custom<typeof services.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/services/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team' as const,
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/team' as const,
      input: insertTeamMemberSchema,
      responses: {
        201: z.custom<typeof teamMembers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/team/:id' as const,
      input: insertTeamMemberSchema.partial(),
      responses: {
        200: z.custom<typeof teamMembers.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/team/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders' as const,
      input: insertOrderSchema,
      responses: {
        201: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/orders' as const,
      responses: {
        200: z.array(z.custom<typeof orders.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/orders/:id' as const,
      input: insertOrderSchema.partial().extend({ status: z.string().optional() }),
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
  },
};

// === BUILD URL HELPER ===
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
