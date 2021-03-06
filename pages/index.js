import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { image_search, image_search_generator } from './ddg_image_utils/api';

export default function Home() {
	const [input, setInput] = useState('');
	const [result, setResult] = useState([]);
	const options = {
		method: 'GET',
		url: 'https://api.giphy.com/v1/gifs/search',
		params: {
			api_key: 'FAyl4Z3hiOFlQkOC92dy0WGH8OFUZcVM',
			q: input,
			limit: 50,
		},
	};

	return (
		<>
			<input
				onChange={(event) => {
					setInput(event.target.value);
				}}
			></input>
			<button
				onClick={() => {
					if (input.trim().length === 0) return;
					axios
						.request(options)
						.then(function (response) {
							console.log(response.data.data);
							setResult(response.data.data);
						})
						.catch(function (error) {
							console.error(error);
						});
				}}
			>
				Click me
			</button>
			<br></br>

			{result.map((image, idx) => {
				return (
					<iframe
						key={idx}
						src={image.embed_url}
						width='480'
						height='360'
						frameBorder='0'
						className='giphy-embed'
						allowFullScreen
					></iframe>
				);
			})}
		</>
	);
}
