import {NextFunction, Request, Response} from 'express';

export type Middleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export interface Locals<T> {
	data: T;
	status: number;
}

export interface ErrorResponse {
	error: string;
}
