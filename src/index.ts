import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { type HonoType } from 'lib/constant';
import { v1 } from './api/v1';

const app = new Hono<HonoType>();

const router = app
	.use('*', cors())
	.get('/', (c) => {
		return c.json({ message: 'Hello Assets!' });
	})
	.route('/v1', v1);

export type AppType = typeof router;
export default app;
