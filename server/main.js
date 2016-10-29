import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
        fetchLink: function (username,password) {
            this.unblock();
            return HTTP.get( 'https://ta.yrdsb.ca/gamma-live/index.php/login.jsp?username='+username+'&password='+password, {
              headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
              },

              followRedirects: false

            }/**, function( error, response ) {

               if ( error ) {
                  console.log( error );
               } else {
                  //console.log( response );
                  response = (Meteor.http.call("GET", response.headers.location, {headers: { Cookie: response.headers['set-cookie'] }, followRedirects: true}));
                  console.log( response.content);
               }

            }*/);

        },
        fetchMark: function (location, cookie) {
            this.unblock();
            return HTTP.get( location, {
              headers: {
                Cookie: cookie
              },

              followRedirects: true

            });
        }


});
