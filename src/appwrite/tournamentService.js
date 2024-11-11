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
			console.error('Error fetching tournaments:', err.message);
			throw err;
		}
	}
	async getTournamentsByStatus({status, playerId = null}) {
		try {
			const filters = [Query.equal('status', status)]; // Add status key explicitly in filter
			if (playerId && (status == 'ongoing' || 'completed')) {
				filters.push(Query.search('participates', playerId));
			}
			const result = await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				filters
			);

			return result.documents;
		} catch (err) {
			// Provide detailed logs for debugging
			console.error(`Error fetching ${status} tournament`, err);
			if (err.code === 404) {
				// Specific handling if no tournaments are found
				console.warn('No tournaments found.');
			}
			throw err; // Rethrow error for higher-level handling
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
	async joinTournament({tournamentId, playerId}) {
		try {
			// Fetch the tournament document
			const tournament = await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteTournamentCollectionId,
				tournamentId
			);

			// Ensure `participates` is defined and is an array
			const participates = tournament.participates || [];

			// Only add `playerId` if it’s not already in `participates`
			if (!participates.includes(playerId)) {
				participates.push(playerId);

				// Update the document with the new `participates` array
				await this.databases.updateDocument(
					conf.appwriteDatabaseId,
					conf.appwriteTournamentCollectionId,
					tournamentId,
					{participates}
				);
			}
		} catch (err) {
			console.error('Error joining tournament:', err.message);
			throw err;
		}
	}
}

const tournamentService = new Service();

export default tournamentService;
