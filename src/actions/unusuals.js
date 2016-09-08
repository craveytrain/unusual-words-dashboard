export const setUnusuals = unusuals => (
	{
		type: 'SET_UNUSUALS',
		unusuals
	}
);

export const addUnusual = word => (
 	{
		type: 'ADD_UNUSUAL',
		word
	}
);

export const addSynonyms = ( unusual, synonyms ) => (
	{
		type: 'ADD_SYNONYMS',
		unusual,
		synonyms
	}
);
