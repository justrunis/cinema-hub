<div align="center">
<h1>Cinema hub</h1>
   <img src="cinema-hub/src/assets/png/logo-color.png" alt="CinemaHub Logo" width="50%" height="50%">
</div>
<hr>
Welcome to CinemaHub, an app that utilizes the TMDB (The Movie Database) to provide you with information about movies, TV shows, and more!

## Features

- Search for movies and TV shows
- View detailed information about each title
- Save your favorite titles for later
- Mark your favorite titles
- Read reviews
- Watch trailers

## Installation

1. Clone the repository: `git clone https://github.com/justrunis/cinema-hub.git`
2. Navigate to the project directory: `cd cinema-hub`
3. Install the dependencies: `npm install`
4. Set up the TMDB API key:
   - Visit the TMDB website (https://www.themoviedb.org/) and sign up for an API key.
   - Create a `.env` file in the project root directory.
   - Add the following lines to the `.env` file:
     `VITE_API_KEY=your-api-key VITE_API_READ_ACCESS_TOKEN=your_read_access_token`
5. Start the app: `npm run dev`

## Usage

1. Open your web browser and navigate to `http://localhost:5173`.
2. Use the search bar to look for movies or TV shows.
3. Click on a title to view more details.
4. Explore the recommendations section for personalized suggestions.
5. Save your favorite titles by clicking the "Save" button.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
