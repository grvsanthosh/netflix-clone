import {fetchFromTMDB} from "../service/tmdb.service.js"

export const getTrendingMovie = async (req, res)=> {
	try {

		// https://developer.themoviedb.org/reference/trending-movies
	
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
	
		// https://developer.themoviedb.org/reference/movie-videos
	

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
	
	// https://developer.themoviedb.org/reference/movie-details
	

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
		
		// https://developer.themoviedb.org/reference/movie-similar
	

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

		

		// https://developer.themoviedb.org/reference/movie-popular-list
	


		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).send({ success: true, content: data.results });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}







