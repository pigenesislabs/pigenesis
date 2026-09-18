import type { Request, Response } from "express";
import {
    createUser,
    editUser,
    getUserById,
    getUsers,
    removeUser,
} from "../services/userService";

export async function listUsers(
    _req: Request,
    res: Response
): Promise<void> {
    try {
        const users = await getUsers();

        res.status(200).json({
            data: users,
        });
    } catch (error) {
        console.error("Failed to list users:", error);

        res.status(500).json({
            error: "Failed to retrieve users.",
        });
    }
}

export async function getUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const userId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!userId) {
            res.status(400).json({
                error: "User ID is required.",
            });
            return;
        }

        const user = await getUserById(userId);

        if (!user) {
            res.status(404).json({
                error: "User not found.",
            });
            return;
        }

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        console.error("Failed to retrieve user:", error);

        res.status(500).json({
            error: "Failed to retrieve user.",
        });
    }
}

export async function createNewUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { id, email, displayName, status } = req.body;
        if (!id || !email || !displayName || !status) {
            res.status(400).json({
                error:
                    "id, email, displayName and status are required.",
            });
            return;
        }

        const user = await createUser({
            id,
            email,
            displayName,
            status,
        });

        res.status(201).json({
            data: user,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("already exists")
        ) {
            res.status(409).json({
                error: error.message,
            });
            return;
        }

        console.error("Failed to create user:", error);

        res.status(500).json({
            error: "Failed to create user.",
        });
    }
}

export async function updateExistingUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { email, displayName, status } = req.body;
        const userId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!email || !displayName || !status) {
            res.status(400).json({
                error:
                    "email, displayName and status are required.",
            });
            return;
        }

        const user = await editUser(userId, {
            email,
            displayName,
            status,
        });

        if (!user) {
            res.status(404).json({
                error: "User not found.",
            });
            return;
        }

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("already exists")
        ) {
            res.status(409).json({
                error: error.message,
            });
            return;
        }

        console.error("Failed to update user:", error);

        res.status(500).json({
            error: "Failed to update user.",
        });
    }
}

export async function deleteExistingUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const userId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const deleted = await removeUser(userId);

        if (!deleted) {
            res.status(404).json({
                error: "User not found.",
            });
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error("Failed to delete user:", error);

        res.status(500).json({
            error: "Failed to delete user.",
        });
    }
}