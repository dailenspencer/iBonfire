import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfilePageBonfire from './ProfilePageBonfire';
import ProfilePageBonfirePopup from './ProfilePageBonfirePopUp';
import { allActions } from '../App';
import {updateUserBio, getUserData} from '../../actions/profile';


export default class ProfilePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			newBonfires: [],
			edit: false,
			editProfileHeaderClass: 'EditProfileHeader hide',
			profileInfoView: '',
			profileInfoText: ''
		}
		this.handleProfilePictureClick = this.handleProfilePictureClick.bind(this);
		this.handleProfilePictureMouseOver = this.handleProfilePictureMouseOver.bind(this);
		this.handleProfilePictureMouseOut = this.handleProfilePictureMouseOut.bind(this);
		this.renderProfileInfoTextArea = this.renderProfileInfoTextArea.bind(this);
		this.renderProfileInfoPlainText = this.renderProfileInfoPlainText.bind(this);
		this.handleProfileInfoTextAreaChange = this.handleProfileInfoTextAreaChange.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.facebook.currUser;
		this.props.getUserBonfires(currentUser.id);
		getUserData(this.props.facebook.currUser.id).then((resp) => {
			console.log('get user data', resp);
			this.setState({profileInfoText: resp.data.bio})
		})
	}

	componentDidMount() {
		console.log('component did mount');
		this.setState({
			edit: false,
			editProfileHeaderClass: 'EditProfileHeader hide',
			// profileInfoView: this.renderProfileInfoPlainText(),
			profileInfoText: ''
		})
	}

	componentWillReceiveProps(nextProps) {
		this.renderFires(nextProps.bonfire.bonfires);
	}


	handleProfilePictureClick(){
		if(this.state.edit){
			var profileInfoPlainText = this.renderProfileInfoPlainText();
			this.setState({profileInfoView: 'plainText'})
			updateUserBio(this.props.facebook.currUser.id,this.state.profileInfoText);
		} else {
			var profileInfoTextArea = this.renderProfileInfoTextArea();
			this.setState({profileInfoView: 'textArea'})
		}
		this.setState({edit : !this.state.edit });
	}

	handleProfilePictureMouseOver(){
		this.setState({editProfileHeaderClass: 'EditProfileHeader show'})
	}
	
	handleProfilePictureMouseOut(){
		this.setState({editProfileHeaderClass: 'EditProfileHeader hide'})
	}

	handleProfileInfoTextAreaChange(e){
		this.setState({profileInfoText: e.target.value});
	}

	handleLogout(){
		this.props.facebookLogout();
	}

	renderFires(bonfires){
		var bonfires = bonfires.map((bonfire, index) => {
			return (
				<ProfilePageBonfire key={index} data={bonfire}/>
			)
		})
		this.setState({newBonfires: bonfires});
	}

	renderProfileInfoPlainText(){
		return (
			<h className="ProfileInfoPlainText">{this.state.profileInfoText}</h>
		)
	}

	renderProfileInfoTextArea(){
		return (
			<textArea className="ProfileInfoTextArea" value={this.state.profileInfoText} onChange={this.handleProfileInfoTextAreaChange}>
			</textArea>
		)
	}

	render(){
		
		return(
			<div>
				<div className="ProfilePageTop">
					<div className="ProfilePageLeft">
						<div className="ProfilePageName">
							Dailen Spencer
						</div>
						<div className="ProfilePageUserInfo">
							{this.state.edit ? this.renderProfileInfoTextArea() : this.renderProfileInfoPlainText() }
						</div>
					</div>
					<div className="ProfilePageMiddle">
						<img className="ProfilePagePicture"  onClick={this.handleProfilePictureClick} onMouseOver={this.handleProfilePictureMouseOver} onMouseOut={this.handleProfilePictureMouseOut} src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
						<h className={this.state.editProfileHeaderClass}>{this.state.edit ? 'Save Profile' : 'Edit Profile'}</h>
					</div>
					<div className="ProfilePageRight">
						<div className="ProfilePageStats">
							
						</div>
						<div className="ProfilePagePoints">
							67,536
						</div>
					</div>
				</div>
				<div className="BonfireHolder">
					{this.state.newBonfires}
				</div>
				<div className="MapButtonSmall" onClick={this.props.renderMap}>
					<img  className="MapImageSmall MapImageSmallAnimation" src='http://www.appelsiini.net/assets/2008/5/26/tartu.png'/>
				</div>
				<div className="LogoutButton" onClick={this.handleLogout}>
					<img src="../../media/logout.png" className="LogoutImage"/>
				</div>
				<ProfilePageBonfirePopup/>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		bonfire: state.bonfire,
		facebook: state.facebook,
		profile: state.updateUser
	}
}

export default connect(mapStateToProps, allActions)(ProfilePage);