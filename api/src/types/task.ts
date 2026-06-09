import { Types } from "mongoose";

export interface ITask {
    title: string;
    description: string;
    dueDate: Date;
    status: "pending" | "completed";
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}