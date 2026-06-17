require('dotenv').config();
const http = require('http');
const Imap = require('imap');
const { simpleParser } = require('mailparser');

const PORT = process.env.IMAP_PORT_HTTP || 3099;

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' || req.url !== '/ikmail') {
    res.writeHead(404); res.end('Not found'); return;
  }

  const emails = [];
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASSWORD,
    host: process.env.IMAP_HOST || 'mail.infomaniak.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000,
    connTimeout: 15000
  });

  imap.once('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  });

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err) => {
      if (err) { res.writeHead(500); res.end(JSON.stringify({ error: err.message })); return; }
      imap.search(['UNSEEN'], (err, uids) => {
        if (err || !uids || uids.length === 0) {
          imap.end();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify([]));
          return;
        }
        const fetch = imap.fetch(uids.slice(-10), { bodies: '' });
        const promises = [];
        fetch.on('message', (msg) => {
          let buf = '';
          const p = new Promise((resolve) => {
            msg.on('body', (stream) => { stream.on('data', d => { buf += d.toString(); }); });
            msg.once('end', () => resolve(simpleParser(buf)));
          });
          promises.push(p);
        });
        fetch.once('end', async () => {
          const parsed = await Promise.all(promises);
          imap.end();
          const result = parsed.map(e => ({
            from: e.from ? e.from.text : '',
            subject: e.subject || '(sans sujet)',
            date: e.date ? e.date.toISOString() : '',
            text: (e.text || '').replace(/<[^>]+>/g, '').trim().slice(0, 500),
            source: 'ikmail'
          }));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
        fetch.once('error', (e) => {
          imap.end();
          res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
        });
      });
    });
  });
  imap.connect();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`IMAP server listening on http://127.0.0.1:${PORT}/ikmail`);
});
