import React from 'react';

import './Playlist.css';

import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChage = this.handleNameChage.bind(this);
	}

	handleNameChage(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className={"Playlist"}>
			  <input defaultValue="New Playlist" onChange={this.handleNameChage} />
			  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
			  <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
			</div>
		);
	}
}

export default Playlist;
