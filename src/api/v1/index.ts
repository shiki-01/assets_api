import { type HonoType } from 'lib/constant';
import { assets } from './assets';
import { Hono } from 'hono';

const v1 = new Hono<HonoType>()
	.use('/*', async (c, next) => {
		Object.entries(c.env).forEach(([key, value]) => {
			if (value === null) throw new Error(`Invalid env: ${key}`);
		});
		await next();
	})
	.route('/assets', assets);

export { v1 };