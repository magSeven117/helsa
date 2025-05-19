import { DomainError } from '@helsa/ddd/core/domain-error';
import { AuthorizationError } from '@helsa/ddd/core/errors/authorization-error';
import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { InternalError } from '@helsa/ddd/core/errors/internal-error';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { PermissionsError } from '@helsa/ddd/core/errors/permissions-error';

export const errorMapper = (error: unknown) => {
  if (error instanceof NotFoundError) {
    return {
      status: 404,
      message: error.message,
    };
  }
  if (error instanceof FormatError) {
    return {
      status: 400,
      message: error.message,
    };
  }
  if (error instanceof InternalError) {
    return {
      status: 500,
      message: error.message,
    };
  }
  if (error instanceof AuthorizationError) {
    return {
      status: 403,
      message: error.message,
    };
  }
  if (error instanceof PermissionsError) {
    return {
      status: 403,
      message: error.message,
    };
  }
  if (error instanceof DomainError) {
    return {
      status: 400,
      message: error.message,
    };
  }
  return {
    status: 500,
    message: 'Internal server error',
  };
};
