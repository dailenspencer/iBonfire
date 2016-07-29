import FacebookLogin from 'react-facebook-login';

export const FacebookInit = () => {
	window.fbAsyncInit = () => {
      FB.init({
        appId: '708986855908181',
        xfbml: true,
        version: 'v2.7'
      });

      FB.getLoginStatus((response) => { 
        this.statusChangeCallBack(response);
      });
    };

    ((d, s, id) => {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=708986855908181";;
       fjs.parentNode.insertBefore(js, fjs);
     })(document, 'script', 'facebook-jssdk');
}


export const CheckLoginStatus = () => {
	FB.getLoginStatus((response) => { 
      this.statusChangeCallBack(response);
    });
}

