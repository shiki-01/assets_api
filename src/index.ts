import {Hono} from 'hono';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

type Bindings = {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

app.get('/', (c) => {
    return c.text('Hello, World!');
})

//テストでファイルを受け取るコード
//テキストファイルなら中身を表示

app.post('/upload', async (c) => {
    console.log(c.req);

    const file = await c.req.formData();
    const fileObj = file.get('file');
    let text = '';

    if (file && fileObj) {
        if (typeof fileObj.valueOf() === 'string') {
            text = fileObj.valueOf() as string;
        } else {
            const reader = await (fileObj as File).arrayBuffer();
            const decoder = new TextDecoder();
            text = decoder.decode(reader);
        }
    }

    return c.json({
        responseType: 'text',
        text: text
    })
})

export default app;
