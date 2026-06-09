import { Types } from "mongoose";

export interface ITask {
    title: string;
    description: string;
    dueDate: Date;
    status: "PENDING" | "COMPLETED";
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}