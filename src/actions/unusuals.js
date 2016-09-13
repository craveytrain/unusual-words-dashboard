import fetchUnusuals from './fetchUnusuals';
import fetchSynonym from './fetchSynonym';

export const setUnusuals = unusuals => (
	{
		type: 'SET_UNUSUALS',
		unusuals
	}
);

export const fetchSynonyms = words => {
	return dispatch => {
		// fetch synonyms for each word
		words.forEach(word => dispatch( fetchSynonym( word ) ) );
	};
}

export const addSynonyms = ( unusual, synonyms ) => (
	{
		type: 'ADD_SYNONYMS',
		unusual,
		synonyms
	}
);

export { fetchUnusuals };
