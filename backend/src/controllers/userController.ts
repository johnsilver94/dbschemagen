import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export class UserController {
	private userRepository = getRepository(User);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		let userToRemove: User | undefined = await this.userRepository.findOne(
			request.params.id
		);
		if (userToRemove) await this.userRepository.remove(userToRemove);
	}
}
