//Get your Client Id from developer.spotify.com/
const clientId = '';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) != null){
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		}
	},

	search(term) {
		const accessToken = this.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`, { headers: { Authorization: `Bearer ${accessToken}` } 
		}).then(response => {
			return response.json();
		}).then(jsonResponce => {
			if (!jsonResponce.tracks) {
				return [];
			}
			return jsonResponce.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artists: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}))
		});
	},

	savePlaylist(name, trackUris) {
		if(!name || !trackUris.length) {
			return;
		}

		let accessToken = Spotify.getAccessToken();
		let headers = { Authorization: `Bearer ${accessToken}` };
		let userId;

		return fetch(`https://api.spotify.com/v1/me`, { headers: headers }
		).then(response => response.json()
		).then(jsonResponce => {
			userId = jsonResponce.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
				{
					headers: headers,
					method: 'POST',
					body: JSON.stringify( { name: name } )
				}).then(response => response.json()
				).then(jsonResponce => {
				const playlistId = jsonResponce.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
					{
						headers: headers,
						method: 'POST',
						body: JSON.stringify( { uris: trackUris } )
					});
			});
		});
	}
};

export default Spotify;