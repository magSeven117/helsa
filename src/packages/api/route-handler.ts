import { Unauthenticated } from '@helsa/ddd/core/errors/unauthenticated';
import { Unauthorized } from '@helsa/ddd/core/errors/unauthorized';
import { User } from '@helsa/engine/user/domain/user';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { getSession } from '../auth/server';
import { DomainError } from '../ddd/core/domain-error';
import { HttpNextResponse } from './http-next-response';

type RouteHandlerParams<Q, P, auth = true> = {
  req: NextRequest;
  user: User;
  params: { [key: string]: any };
  searchParams: Q;
  body: P;
};

type RouteHandler<Q, P, auth = true> = (params: RouteHandlerParams<Q, P>) => Promise<NextResponse>;

type RouteHandlerOptions<Q, P> = {
  name: string;
  schema?: ZodSchema<P>;
  querySchema?: ZodSchema<Q>;
  authenticated?: boolean;
  permissions?: (user: User) => boolean;
};

export const routeHandler = <T extends DomainError, P, Q>(
  options: RouteHandlerOptions<Q, P> = {
    name: 'default',
    authenticated: true,
    querySchema: undefined,
    schema: undefined,
    permissions: undefined,
  },
  handler: RouteHandler<Q, P>,
  onError?: (error: T) => NextResponse,
) => {
  return async (req: NextRequest, { params }: { params: Promise<any> }) => {
    try {
      const user = await authentication(options.authenticated);
      authorization(user, options.permissions);

      const urlParams = await params;
      const searchParams = parseSeachParams<Q>(req, options.querySchema);
      const body = await parseBody<P>(req, options.schema);

      return handler({
        req,
        user,
        params: urlParams,
        searchParams,
        body,
      });
      
    } catch (error) {
      switch (true) {
        case error instanceof Unauthenticated:
          return HttpNextResponse.domainError(error, 401);
        case error instanceof Unauthorized:
          return HttpNextResponse.domainError(error, 403);
        case error instanceof DomainError:
          const response = onError?.(error as T);
          if (response) {
            return response;
          }
          return HttpNextResponse.internalServerError();
        case error instanceof ZodError:
          return HttpNextResponse.error(error.message);
        default:
          return HttpNextResponse.internalServerError();
      }
    }
  };
};

async function authentication(authenticated?: boolean): Promise<User> {
  if (authenticated === false) {
    return {} as User;
  }
  const session = await getSession();
  if (!session || !session.user) {
    throw new Unauthenticated('User is not authenticated');
  }
  return User.fromPrimitives(session.user as any);
}

function authorization(user: User | undefined, permissions?: (user: User) => boolean): void {
  if (!user) {
    return;
  }
  if (permissions && !permissions(user)) {
    throw new Unauthorized('User does not have the required permissions');
  }
}

function parseSeachParams<Q>(req: NextRequest, schema?: ZodSchema<Q>): Q {
  if (!schema) {
    return Object.fromEntries(req.nextUrl.searchParams.entries()) as Q;
  }
  return schema.parse(Object.fromEntries(req.nextUrl.searchParams.entries()));
}

async function parseBody<P>(req: NextRequest, schema?: ZodSchema<P>): Promise<P> {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return {} as P; // No body for GET or HEAD requests
  }
  
  // Parsear el JSON una sola vez
  const jsonData = await req.json();
  
  if (!schema) {
    return jsonData as P;
  }
  
  // Validar con el schema usando los datos ya parseados
  return schema.parse(jsonData);
}
