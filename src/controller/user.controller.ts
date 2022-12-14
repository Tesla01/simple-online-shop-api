import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput['body']>,
    res: Response) {

    logger.info(req.body);
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        logger.error(e);
        return res.status(409).json({
            "message": `${req.body.email} already exist`
        });
    }
}