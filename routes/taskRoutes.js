const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');


// Route pour l'ajout d'une nouvelle tâche
router.post('/', taskController.createTask);

// Route pour récupérer toutes les tâches
router.get('/', taskController.getAllTasks);

// Route pour la mise à jour complète d'une tâche
router.put('/:id', taskController.updateTaskStatus);

// Route pour la suppression d'une tâche
router.delete('/:id', taskController.deleteTask);


module.exports = router;