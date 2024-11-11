import conf from '../conf/conf.js';
import {Client, ID, Databases, Query, Permission, Role} from 'appwrite';

export class Service {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	async createProfile({profileData, id}) {
		try {
			await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteUserCollectionId,
				id,
				profileData,
				[
					Permission.read(Role.user(id)), // Only the user can read
					Permission.update(Role.user(id)), // Only the user can update
					Permission.delete(Role.user(id)) // Only the user can delete
				],
				[
					Permission.write(Role.user(id)) // Only the user can write
				]
			);
		} catch (err) {
			console.log('Error creating profile:', err.message);
		}
	}
	async getProfile(ProfileId) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteUserCollectionId,
				ProfileId
			);
		} catch (err) {
			console.log('Error fetching Profile:', err.message);
			//throw err;
		}
	}
	/*async getAllTournaments() {
		try {
			const result = await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteUserCollectionId
			);
			return result.documents; // returns an array of all tournament documents
		} catch (err) {
			console.error('Error fetching tournaments:', err.message);
			throw err;
		}
	}*/

	async updateProfile(profileId, updatedData) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteUserCollectionId,
				profileId,
				updatedData
			);
		} catch (err) {
			console.error('Error updating profile:', err.message);
			throw err;
		}
	}

	async deleteProfile(profileId) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteUserCollectionId,
				peofileId
			);
		} catch (err) {
			console.error('Error deleting profile:', err.message);
			throw err;
		}
	}
}

const Profileservice = new Service();

export default Profileservice;
