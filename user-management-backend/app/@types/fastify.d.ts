// types.d.ts
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
  }
  interface FastifyRequest {
    user?: UserPayload;
  }

  interface PublicOptions {
    public?: boolean;
  }

  interface RouteShorthandOptions extends PublicOptions {}
}

export interface UserPayload {
  id: string;
  email: string;
}