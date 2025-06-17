const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ⬇️ Replace these
const vapidPublicKey = 'BG7o3m_XYKSlyeBDVGDU-6hM72nzghuTH1rAO4Xv5oZIVwQDAKKIaPfJZ7lwLYRg5t7bV1zSA2ZghS3UYvkYq44';
const vapidPrivateKey = 'us1j5w5qSsGdayNNsHwp6GkgrF5bxwTbk9gdAW4Ye08';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidPublicKey,
  vapidPrivateKey
);

const subscriptions = [];

app.get('/publicKey', (req, res) => {
  res.send(vapidPublicKey);
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const exists = subscriptions.find(sub => JSON.stringify(sub) === JSON.stringify(subscription));
  if (!exists) subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', async (req, res) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, body: message });

  const results = await Promise.all(subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => {
      console.error('Push failed', err);
    })
  ));
  res.json({ message: 'Notifications sent' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
