import {fetchFromTMDB} from "../service/tmdb.service.js"
import User from "../models/user.model.js";

export const searchPerson = async (req,res)=>{
    const { query } = req.params;
	try {
    //     res.send({
	// 	success:true
	// })
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).send({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export const searchMovie = async (req,res)=>{
    const { query } = req.params;

	try {

        // res.send({
        //     success:true
        // })
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		res.status(200).send({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export const searchTv = async (req,res)=>{
    const { query } = req.params;

	try {
        // res.send({
        //     success:true
        // })
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		res.send({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}


export const getSearchHistory = async (req, res)=> {
	try {
        // res.send({
        //     success:true
        // })
		res.status(200).send({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export const removeItemFromSearchHistory = async (req, res)=> {
	let { id } = req.params;

	id = parseInt(id);

	try {
        // res.send({
        //     success:true
        // })
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).send({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

