import {Hono} from 'hono';

const app = new Hono<{ Bindings: Bindings }>();

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
    const file = await c.req.formData();
    const fileObj = file.get('file');
    let text = '';

    if (file && fileObj) {
        if (typeof fileObj.valueOf() === 'string') {
            text = fileObj.valueOf() as string;
        } else {
            const reader = fileObj.valueOf() as ArrayBuffer | null;
            const decoder = new TextDecoder();
            text = reader ? decoder.decode(reader) : '';
        }
    }

    return c.text(text);
})

export default app;
