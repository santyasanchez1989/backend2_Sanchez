import { Router } from 'express';
import ticketRepository from '../persistence/mongoDB/ticket.repository.js';  

const router = Router();

// Obtener todos los tickets con paginación y filtros opcionales
router.get('/', async (req, res) => {
  try {
    const query = req.query || {}; // Recupera los filtros de la query string
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const tickets = await ticketRepository.getAll(query, options);
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error interno del servidor.' });
  }
});

// Obtener un ticket por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketRepository.getById(id);

    if (!ticket) {
      return res.status(404).json({ status: 'error', msg: 'Ticket no encontrado.' });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error interno del servidor.' });
  }
});

// Crear un nuevo ticket
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newTicket = await ticketRepository.create(data);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error interno del servidor.' });
  }
});

// Actualizar un ticket existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedTicket = await ticketRepository.update(id, data);

    if (!updatedTicket) {
      return res.status(404).json({ status: 'error', msg: 'Ticket no encontrado.' });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error interno del servidor.' });
  }
});

// Eliminar (marcar como eliminado) un ticket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await ticketRepository.deleteOne(id);

    if (!deletedTicket) {
      return res.status(404).json({ status: 'error', msg: 'Ticket no encontrado.' });
    }

    res.json(deletedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error interno del servidor.' });
  }
});

export default router;