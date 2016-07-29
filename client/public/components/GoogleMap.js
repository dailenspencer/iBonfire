import React, {Component} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { KEY } from '../../apiKeys';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

export default class GoogleMap extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	onMapCreated(map) {
		map.setOptions({
		disableDefaultUI: true
		});
	};

	onDragEnd(e) {
		console.log('onDragEnd', e);
	};

	onCloseClick() {
		console.log('onCloseClick');
	};

	onClick(e) {
		console.log('onClick', e);
	};


	render(){
		return (
			<div id="GoogleMap">
				<Gmaps
			        width={'800px'}
			        height={'600px'}
			        lat={coords.lat}
			        lng={coords.lng}
			        zoom={12}
			        loadingMessage={'Be happy'}
			        params={{v: '3.exp', key: KEY}}
			        onMapCreated={this.onMapCreated}>
			        <Marker
			          lat={coords.lat}
			          lng={coords.lng}
			          draggable={true}
			          onDragEnd={this.onDragEnd} />
			        <InfoWindow
			          lat={coords.lat}
			          lng={coords.lng}
			          content={'Hello, React :)'}
			          onCloseClick={this.onCloseClick} />
			        <Circle
			          lat={coords.lat}
			          lng={coords.lng}
			          radius={500}
			          onClick={this.onClick} />
	      		</Gmaps>
      		</div>
      )
	}
}