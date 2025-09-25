import { NextResponse } from 'next/server';
import { DomainError } from '../ddd/core/domain-error';

export class HttpNextResponse {
  static domainError(error: DomainError, statusCode: number): NextResponse {
    return NextResponse.json(
      {
        message: error.getMessage(),
      },
      { status: statusCode },
    );
  }

  static internalServerError(): NextResponse {
    return NextResponse.json(
      {
        code: 'InternalServerError',
        message: 'Internal server error',
        data: {},
      },
      { status: 500 },
    );
  }

  static noResponse(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }

  static error(message: string): NextResponse {
    return NextResponse.json(
      { message: message },
      { status: 400 }
    );
  }

  static ok(): NextResponse {
    return NextResponse.json(
      { message: 'OK' },
      { status: 200 }
    );
  }

  static created(): NextResponse {
    return NextResponse.json(
      { message: 'Created successfully' },
      { status: 201 }
    );
  }

  static json<JsonBody>(data: JsonBody, init?: ResponseInit): NextResponse {
    return NextResponse.json(data, init ?? { status: 200 });
  }
}
