const Task = require('../models/Task.js')

// Fonction pour créer une nouvelle tâche
exports.createTask = async (req, res) => {
    try{
        // On crée une nouvelle Tâche
        // req.body contient les données envoyées par le client (titre, description...)
        const newTask = new Task(req.body);

        // On enregistre dans la BD
        await newTask.save()

        // On renvoie la tâche créée avec un statut 201 (Created)
        res.status(201).json({
            success: true,
            message: "Tâche créée avec success", 
            newTask
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            message: "Erreur de création de la tâche",
            error: error.message
        });
    }
};

// Fonction pour récupérer toutes les tâches
exports.getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch {
        res.status(500).json({
            success: false,
            message: "Erreur dans la requête",
            error: error.message
        })
    }
};

// Fonction pour mettre à jour une tâche
exports.updateTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findByIdAndUpdate(
            id,  
            req.body { 
                new: true,          // Option pour renvoyer le document mis à jour (et non l'ancien)
                runValidators: true // Option CRUCIALE pour forcer Mongoose à re-vérifier le schéma (ex: vérifier le statusenum)
            }
        );

        // Si l'ID n'existe pas dans la base de données
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Tâche introuvé",
                error: "Tâche non trouvée." });
        }

        res.status(200).json({
            success: true,
            message: "Tâche mise à jour avec succès",
            task
        });
    } catch (err) {
        // Si la validation échoue (ex: statut incorrect), on renvoie une erreur 400
        res.status(500).json({ 
            success: false,
            message: "Erreur mors de la mise à jour",
            error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findByIdAndDelele(id);

        if(!task){
            return res.status(404).json({ 
                success: false,
                message: "Tâche introuvable",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Tâche supprimée avec succès"
        });
    } catch {
        res.status(500).json({ 
            success: false,
            message: "Erreur lors de la suppression",
            error: err.message });
    }
};


