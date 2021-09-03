import { Resolver } from "@ev-graphql-2/create-resolver";
import { ExpressContext, UserInputError } from "apollo-server-express";
import Joi from "joi";

export const createValidation =
  <
    Source = null,
    Result = Record<string, never>,
    Args = Record<string, never>,
    Context extends ExpressContext = ExpressContext,
  >(
    resolver: Resolver<Source, Result, Args, Context>,
    options: Joi.AsyncValidationOptions = {},
  ) =>
  (schema: Joi.ObjectSchema) =>
    resolver(async (parent, args: Record<string, any>): Promise<void> => {
      let parsed: Record<string, any>;
      try {
        parsed = await schema.validateAsync(args, options);
        for (const key of Object.keys(args)) {
          delete args[key];
        }
        for (const key of Object.keys(parsed)) {
          args[key] = parsed[key];
        }
      } catch (err) {
        throw new UserInputError(err.message);
      }
    });
