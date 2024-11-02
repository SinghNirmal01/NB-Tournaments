import conf from '../conf/conf.js';
import {Client, ID, Databases, Query} from 'appwrite';

export class Service {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	async createTournament({tournamentData}) {
		try {
			await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				ID.unique(),
				tournamentData
			);
		} catch (err) {
			throw err;
		}
	}
	async getTournament(tournamentId) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				tournamentId
			);
		} catch (err) {
			console.error('Error fetching tournament:', err.message);
			throw err;
		}
	}
	async getAllTournaments() {
    try {
        const result = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteTournamentCollectionId
        );
        return result.documents; // returns an array of all tournament documents
    } catch (err) {
        console.error("Error fetching tournaments:", err.message);
        throw err;
    }
}

	async updateTournament(tournamentId, updatedData) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				tournamentId,
				updatedData
			);
		} catch (err) {
			console.error('Error updating tournament:', err.message);
			throw err;
		}
	}

	async deleteTournament(tournamentId) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				tournamentId
			);
		} catch (err) {
			console.error('Error deleting tournament:', err.message);
			throw err;
		}
	}
}

const service = new Service();

export default service;
