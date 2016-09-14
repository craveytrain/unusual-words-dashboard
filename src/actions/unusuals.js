import fetchUnusuals from './fetchUnusuals';
import fetchSynonym from './fetchSynonym';

export const setUnusuals = words => (
	{
		type: 'SET_UNUSUALS',
		words
	}
);

export const fetchSynonyms = words => {
	return dispatch => {
		// fetch synonyms for each word
		words.forEach(word => dispatch( fetchSynonym( word ) ) );
	};
}

export const addSynonyms = ( word, synonyms ) => (
	{
		type: 'ADD_SYNONYMS',
		word,
		synonyms
	}
);

export { fetchUnusuals };
