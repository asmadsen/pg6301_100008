import BaseEntity from './BaseEntity'

export class Movies extends BaseEntity {
	async create({ title, image, genres, plot, released, runtime, director }) {
		const movie = {
			id: this.nextId++,
			title,
			image,
			genres,
			plot,
			released,
			runtime,
			director
		}
		this.items.set(movie[this.identifier], movie)
		return movie[this.identifier]
	}
}

export const movies = new Movies()

/* eslint-disable max-len */
movies.items = new Map([[1,
	{ director: 'Danny Boyle',
		genres: ['Biography', 'Drama'],
		id: 1,
		image:
			'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
		plot:
			'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.',
		released: '2015-10-22T22:00:00.000Z',
		runtime: 122,
		title: 'Steve Jobs' }],
[2,
	{ director: 'Roar Uthaug',
		genres: ['Action', 'Drama', 'Thriller'],
		id: 2,
		image:
				'https://m.media-amazon.com/images/M/MV5BMTg5Mjg0MjgxMl5BMl5BanBnXkFtZTgwNjUzNDg0NzE@._V1_SX300.jpg',
		plot:
				'Although anticipated, no one is really ready when the mountain pass above the scenic, narrow Norwegian fjord Geiranger collapses and creates an 85-meter high violent tsunami. A geologist is one of those caught in the middle of it.',
		released: '2015-08-27T22:00:00.000Z',
		runtime: 105,
		title: 'The Wave' }],
[3,
	{ director: 'Andrew Stanton',
		genres: ['Adventure', 'Animation', 'Family', 'Sci-Fi'],
		id: 3,
		image:
				'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_SX300.jpg',
		plot:
				'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
		released: '2008-06-26T22:00:00.000Z',
		runtime: 98,
		title: 'WALL·E' }],
[4,
	{ director: 'John McTiernan',
		genres: ['Action', 'Thriller'],
		id: 4,
		image:
				'https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		plot:
				'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
		released: '1988-07-19T22:00:00.000Z',
		runtime: 132,
		title: 'Die Hard' }],
[5,
	{ director: 'Renny Harlin',
		genres: ['Action', 'Thriller'],
		id: 5,
		image:
				'https://m.media-amazon.com/images/M/MV5BMzMzYzk3ZTEtZDg0My00MTY5LWE3ZmQtYzNhYjhjN2RhZGRjL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
		plot:
				'John McClane attempts to avert disaster as rogue military operatives seize control of Dulles International Airport in Washington, D.C.',
		released: '1990-07-02T22:00:00.000Z',
		runtime: 124,
		title: 'Die Hard 2' }],
[6,
	{ director: 'Pete Docter, Bob Peterson(co-director)',
		genres: ['Adventure', 'Animation', 'Comedy', 'Family'],
		id: 6,
		image:
				'https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg',
		plot:
				'Seventy-eight year old Carl Fredricksen travels to Paradise Falls in his home equipped with balloons, inadvertently taking a young stowaway.',
		released: '2009-05-28T22:00:00.000Z',
		runtime: 96,
		title: 'Up' }],
[7,
	{ director: 'Ol Parker',
		genres: ['Comedy', 'Musical', 'Romance'],
		id: 7,
		image:
				'https://m.media-amazon.com/images/M/MV5BMjEwMTM3OTI1NV5BMl5BanBnXkFtZTgwNDk5NTY0NTM@._V1_SX300.jpg',
		plot:
				'Five years after the events of Mamma Mia! (2008), Sophie prepares for the grand reopening of the Hotel Bella Donna as she learns more about her mother\'s past.',
		released: '2018-07-19T22:00:00.000Z',
		runtime: 114,
		title: 'Mamma Mia! Here We Go Again' }],
[8,
	{ director: 'John Lasseter',
		genres: ['Adventure', 'Animation', 'Comedy', 'Family', 'Fantasy'],
		id: 8,
		image:
				'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
		plot:
				'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
		released: '1995-11-21T23:00:00.000Z',
		runtime: 81,
		title: 'Toy Story' }],
[9,
	{ director: 'Rasmus A. Sivertsen',
		genres: ['Animation', 'Family'],
		id: 9,
		image:
				'https://m.media-amazon.com/images/M/MV5BMjIxOTAwMjQwOF5BMl5BanBnXkFtZTgwMTQ5MDkzMzE@._V1_SX300.jpg',
		plot:
				'The small town of Flåklypa is experiencing great lack of snow, which is why the inventor Reodor Felgen is asked to create a snow machine. However, things does not go as planned.',
		released: '2013-11-07T23:00:00.000Z',
		runtime: 76,
		title: 'Solan og Ludvig - Jul i Flåklypa' }],
[10,
	{ director: 'Rob Cohen',
		genres: ['Action', 'Crime', 'Thriller'],
		id: 10,
		image:
				'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		plot:
				'Los Angeles police officer Brian O\'Connor must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.',
		released: '2001-06-21T22:00:00.000Z',
		runtime: 106,
		title: 'The Fast and the Furious' }],
[11,
	{ director: 'David Fincher',
		genres: ['Biography', 'Drama'],
		id: 11,
		image:
				'https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		plot:
				'Harvard student Mark Zuckerberg creates the social networking site. That would become known as Facebook but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.',
		released: '2010-09-30T22:00:00.000Z',
		runtime: 120,
		title: 'The Social Network' }],
[12,
	{ director: 'Peter Jackson',
		genres: ['Adventure', 'Family', 'Fantasy'],
		id: 12,
		image:
				'https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg',
		plot:
				'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
		released: '2012-12-13T23:00:00.000Z',
		runtime: 169,
		title: 'The Hobbit: An Unexpected Journey' }],
[13,
	{ director: 'Robert Zemeckis',
		genres: ['Drama', 'Romance'],
		id: 13,
		image:
				'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		plot:
				'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',
		released: '1994-07-05T22:00:00.000Z',
		runtime: 142,
		title: 'Forrest Gump' }],
[14,
	{ director: 'Quentin Tarantino, Eli Roth',
		genres: ['Adventure', 'Drama', 'War'],
		id: 14,
		image:
				'https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
		plot:
				'In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner\'s vengeful plans for the same.',
		released: '2009-08-20T22:00:00.000Z',
		runtime: 153,
		title: 'Inglourious Basterds' }],
[15,
	{ director: 'James Wan',
		genres: ['Crime', 'Horror', 'Mystery', 'Thriller'],
		id: 15,
		image:
				'https://m.media-amazon.com/images/M/MV5BMjE4MDYzNDE1OV5BMl5BanBnXkFtZTcwNDY2OTYwNA@@._V1_SX300.jpg',
		plot:
				'Two strangers, who awaken in a room with no recollection of how they got there, soon discover they\'re pawns in a deadly game perpetrated by a notorious serial killer.',
		released: '2004-10-28T22:00:00.000Z',
		runtime: 103,
		title: 'Saw' }],
[16,
	{ director: 'Robert Zemeckis',
		genres: ['Drama', 'Thriller'],
		id: 16,
		image:
				'https://m.media-amazon.com/images/M/MV5BMTUxMjI1OTMxNl5BMl5BanBnXkFtZTcwNjc3NTY1OA@@._V1_SX300.jpg',
		plot:
				'An airline pilot saves almost all his passengers on his malfunctioning airliner which eventually crashed, but an investigation into the accident reveals something troubling.',
		released: '2012-11-01T23:00:00.000Z',
		runtime: 138,
		title: 'Flight' }],
[17,
	{ director: 'Quentin Tarantino',
		genres: ['Crime', 'Drama'],
		id: 17,
		image:
				'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		plot:
				'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
		released: '1994-10-13T23:00:00.000Z',
		runtime: 154,
		title: 'Pulp Fiction' }],
[18,
	{ director: 'John Lasseter, Joe Ranft(co-director)',
		genres: ['Animation', 'Comedy', 'Family', 'Fantasy', 'Sport'],
		id: 18,
		image:
				'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
		plot:
				'A hot-shot race-car named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.',
		released: '2006-06-08T22:00:00.000Z',
		runtime: 117,
		title: 'Cars' }],
[19,
	{ director: 'Lana Wachowski, Lilly Wachowski',
		genres: ['Action', 'Sci-Fi'],
		id: 19,
		image:
				'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		plot:
				'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
		released: '1999-03-30T22:00:00.000Z',
		runtime: 136,
		title: 'The Matrix' }],
[20,
	{ director: 'Gore Verbinski',
		genres: ['Action', 'Adventure', 'Fantasy'],
		id: 20,
		image:
				'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		plot:
				'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
		released: '2003-07-08T22:00:00.000Z',
		runtime: 143,
		title: 'Pirates of the Caribbean: The Curse of the Black Pearl' }]])
