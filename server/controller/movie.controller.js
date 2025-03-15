import {fetchFromTMDB} from "../service/tmdb.service.js"

export const getTrendingMovie = async (req, res)=> {
	try {

		// https://developer.themoviedb.org/reference/trending-movies
	// const options = {
      //   method: 'GET',
      //   headers: {
      //     accept: 'application/json',
      //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGVmZGQ0ZjBlOTIzMGQ1NjZiNmY0MzZhM2NjMjE3NCIsIm5iZiI6MTc0MTkzNjE1OS4yMzMsInN1YiI6IjY3ZDNkNjFmZmFjMTYzMGMyNjAyN2ZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBwhIiEDOgIkrNzZAHDlI66jcZKyho6ruiqUESjvDgE'
      //   }
      // };
      
      // fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      //   .then(res => res.json())
      //   .then(res => console.log(res))
      //   .catch(err => console.error(err));

	// res.send({
	// 	success:true
	// })
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		res.status(200).send({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
    
}

export const getMovieTrailers = async (req,res)=>{
	const {id} = req.params
	try{
	// 	res.send({
	// 	success:true
	// })
		// https://developer.themoviedb.org/reference/movie-videos
		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 	  accept: 'application/json',
		// 	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGVmZGQ0ZjBlOTIzMGQ1NjZiNmY0MzZhM2NjMjE3NCIsIm5iZiI6MTc0MTkzNjE1OS4yMzMsInN1YiI6IjY3ZDNkNjFmZmFjMTYzMGMyNjAyN2ZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBwhIiEDOgIkrNzZAHDlI66jcZKyho6ruiqUESjvDgE'
		// 	}
		//   };
		
		//   fetch('https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US', options)
		// 	.then(res => res.json())
		// 	.then(res => console.log(res))
		// 	.catch(err => console.error(err));

		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
		res.status(200).send({
			success:true,
			trailers: data.results
		})

	}
	catch(e){
		if(e.message.includes("404")){
			return res.status(404).send(null)
		}
		res.status(500).send({success:false,message:"internal server error"})
	}
}

export const getMovieDetails = async (req,res)=>{
	const {id} = req.params
	try{
	// 	res.send({
	// 	success:true
	// })
	// https://developer.themoviedb.org/reference/movie-details
		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 	  accept: 'application/json',
		// 	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGVmZGQ0ZjBlOTIzMGQ1NjZiNmY0MzZhM2NjMjE3NCIsIm5iZiI6MTc0MTkzNjE1OS4yMzMsInN1YiI6IjY3ZDNkNjFmZmFjMTYzMGMyNjAyN2ZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBwhIiEDOgIkrNzZAHDlI66jcZKyho6ruiqUESjvDgE'
		// 	}
		//   };
		  
		//   fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
		// 	.then(res => res.json())
		// 	.then(res => console.log(res))
		// 	.catch(err => console.error(err));

		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
		res.status(200).send({
			success:true,
			content:data
		})
	}
	catch(e){
		if(e.message.includes("404")){
			return res.status(404).send(null)
		}
		res.status(500).send({success:false,message:"internal server error"})
	}


}

export const getSimilarMovies = async (req,res)=>{
	const {id} = req.params
	try{
		// res.send({
		// 	success:true
		// })
		// https://developer.themoviedb.org/reference/movie-similar
		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 	  accept: 'application/json',
		// 	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGVmZGQ0ZjBlOTIzMGQ1NjZiNmY0MzZhM2NjMjE3NCIsIm5iZiI6MTc0MTkzNjE1OS4yMzMsInN1YiI6IjY3ZDNkNjFmZmFjMTYzMGMyNjAyN2ZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBwhIiEDOgIkrNzZAHDlI66jcZKyho6ruiqUESjvDgE'
		// 	}
		//   };
		  
		//   fetch('https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1', options)
		// 	.then(res => res.json())
		// 	.then(res => console.log(res))
		// 	.catch(err => console.error(err));

		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
		res.status(200).send({
			success:true,
			similar:data.results
		})
	}
	catch(e){
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export const getMoviesByCategory = async (req, res)=> {
	const { category } = req.params;
	try {

		// res.send({
		// 	success:true
		// })

		// https://developer.themoviedb.org/reference/movie-popular-list
		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 	  accept: 'application/json',
		// 	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGVmZGQ0ZjBlOTIzMGQ1NjZiNmY0MzZhM2NjMjE3NCIsIm5iZiI6MTc0MTkzNjE1OS4yMzMsInN1YiI6IjY3ZDNkNjFmZmFjMTYzMGMyNjAyN2ZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBwhIiEDOgIkrNzZAHDlI66jcZKyho6ruiqUESjvDgE'
		// 	}
		//   };
		  
		//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
		// 	.then(res => res.json())
		// 	.then(res => console.log(res))
		// 	.catch(err => console.error(err));


		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).send({ success: true, content: data.results });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}







