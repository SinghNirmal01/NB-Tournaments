const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteTournamentCollectionId: String(import.meta.env.VITE_APPWRITE_TOURNAMENT_COLLECTION_ID),
  appwriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
  appwriteWalletCollectionId: String(import.meta.env.VITE_APPWRITE_WALLET_COLLECTION_ID),
}

export default conf;