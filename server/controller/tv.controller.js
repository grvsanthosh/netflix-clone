import { fetchFromTMDB } from "../service/tmdb.service.js";

export async function getTrendingTv(req, res) {
	try {
    //     res.send({
	// 	success:true
	// })
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		res.send({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvTrailers(req, res) {
	const { id } = req.params;
	try {
        // res.send({
        //     success:true
        // })
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
		res.send({ success: true, trailers: data.results });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvDetails(req, res) {
	const { id } = req.params;
	try {
        // res.send({
        //     success:true
        // })
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarTvs(req, res) {
	const { id } = req.params;
	try {
        // res.send({
        //     success:true
        // })
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
        // res.send({
        //     success:true
        // })
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).send({ success: false, message: "Internal Server Error" });
	}
}
