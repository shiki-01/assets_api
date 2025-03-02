import { type HonoType } from 'lib/constant';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const assets = new Hono<HonoType>()
	.options("*", cors())

export { assets };