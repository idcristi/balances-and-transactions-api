import { Request, Response, NextFunction } from "express";
const { query, validationResult } = require("express-validator");
import moment from "moment";
import { SortEnum } from "./enums";
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const request = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error: any) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

export const validatorHistoryBalance = [
  query("sort")
    .optional()
    .custom((value: SortEnum) => {
      if (value && value !== SortEnum.asc && value !== SortEnum.desc) {
        throw new Error(
          'Invalid value for "sort". It must be "asc" or "desc".'
        );
      }
      return true;
    }),
  query("from").custom((from: string | undefined) => {
    if (!from) {
      throw new Error('"from" date is required.');
    }
    if (typeof from !== "string") {
      throw new Error(
        'Invalid date format for "from". Please use "YYYY-MM-DD" format.'
      );
    }
    if (!from.match(isoDateRegex)) {
      throw new Error(
        'Invalid date format for "from". Please use "YYYY-MM-DD" format.'
      );
    }
    const currentDate = moment();
    const fromDate = moment(from, "YYYY-MM-DD");
    if (!fromDate.isValid()) {
      throw new Error(
        'Invalid date format for "from". Please use "YYYY-MM-DD" format.'
      );
    }
    if (fromDate.isAfter(currentDate, "day")) {
      throw new Error('"from" date must not be in the future.');
    }
    return true;
  }),
  query("to").custom((to: string | undefined, { req }: { req: Request }) => {
    if (!to) {
      throw new Error('"to" date is required.');
    }
    if (typeof to !== "string") {
      throw new Error(
        'Invalid date format for "to". Please use "YYYY-MM-DD" format.'
      );
    }
    if (!to.match(isoDateRegex)) {
      throw new Error(
        'Invalid date format for "to". Please use "YYYY-MM-DD" format.'
      );
    }
    const from = req.query.from as string;
    const fromDate = moment(from, "YYYY-MM-DD");
    const toDate = moment(to, "YYYY-MM-DD");
    if (!toDate.isValid()) {
      throw new Error(
        'Invalid date format for "to". Please use "YYYY-MM-DD" format.'
      );
    }
    if (toDate.isBefore(fromDate, "day")) {
      throw new Error('"to" date must not be earlier than "from" date.');
    }
    return true;
  }),
  request,
];
