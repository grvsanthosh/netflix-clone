# netflix-clone

An netflix-clone application built with Vite, React.js for the frontend, and Node.js, Express, and MongoDB for the backend. I have used TMDB Movie database as third party integration to fetch trending, popular category - movies, TV shows along with youtube trailers. 

## Features

- User authentication and authorization using JWT
- Watch movies, TV shows based on popular category using TMDB 3rd party service
- Search for movie name, TV shows name, Actor name in search option
- Track watch history
- Responsive design with Tailwind CSS
- state management using Zustand
- handling 404 pages

### User Routes

- **POST** `/api/v1/auth/signup` - Sign up a new user
- **POST** `/api/v1/auth/login` - Log in a user
- **POST** `/api/v1/auth/logout` - Log out a user
- **GET** `/api/v1/auth/authCheck` - To authenticate user

### Movie Routes

- **GET** `/api/v1/movie/trending` - Get all trending movies
- **GET** `/api/v1/movie/:id/trailers` - Get trailer for the movies
- **GET** `/api/v1/movie/:id/details` - Get details for the movie
- **GET** `/api/v1/movie/:id/similar` - Get all similar movies
- **GET** `/api/v1/movie/:category` - Get movies based on category

### TV Routes

- **GET** `/api/v1/tv/trending` - Get all trending TV shows
- **GET** `/api/v1/tv/:id/trailers` - Get trailer for the TV shows
- **GET** `/api/v1/tv/:id/details` - Get details for the TV show
- **GET** `/api/v1/tv/:id/similar` - Get all similar TV shows
- **GET** `/api/v1/tv/:category` - Get TV shows based on category

### Search Routes

- **GET** `/api/v1/search/person/:query` - Get search results for person
- **GET** `/api/v1/search/movie/:query` - Get search results for movie
- **GET** `/api/v1/search/tv/:query` - Get search results for tv
- **GET** `/api/v1/search/history` - Get search history results
- **delete** `/api/v1/search/history/:id` - Delete search history