const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tickets = [
  { id: 1, title: 'Website issue', priority: 'high', status: 'open' },
  { id: 2, title: 'Dashboard data discrepancy', priority: 'medium', status: 'in-progress' },
  { id: 3, title: 'Add user roles', priority: 'low', status: 'closed' }
];

function getNextId() {
  return tickets.length ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;
}

app.get('/', (req, res) => {
  res.json({ message: 'FairFlow backend is running', version: '0.1.0' });
});

app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.get('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
});

app.post('/api/tickets', (req, res) => {
  const { title, priority, status } = req.body;
  if (!title || !priority || !status) {
    return res.status(400).json({ error: 'title, priority and status are required' });
  }
  const newTicket = { id: getNextId(), title, priority, status };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

app.put('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  const { title, priority, status } = req.body;
  if (title) ticket.title = title;
  if (priority) ticket.priority = priority;
  if (status) ticket.status = status;
  res.json(ticket);
});

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Ticket not found' });
  const deleted = tickets.splice(index, 1)[0];
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`FairFlow backend API running at http://localhost:${PORT}`);
});
