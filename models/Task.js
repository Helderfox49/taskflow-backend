const mongoose =require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"]
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: {
        values: ["A faire", "En cours", "Terminé"],
        message: "{VALUE} n'est pas un statut valide"
      },
      default: "A faire"
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;
