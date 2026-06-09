import { Schema, model } from "mongoose";
import type { ITask } from "../types/task.js";

const modelSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: String,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true },
);

const TaskModel = model<ITask>("Tasks", modelSchema);

export default TaskModel;