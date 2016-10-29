FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { main: 'login' } );
    console.log( "Okay, we're on the home page" );
  },
  name: 'home' // Optional route name.
});

FlowRouter.route( '/terms', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { main: 'hello' } );
  },
  name: 'termsOfService' // Optional route name.
});

FlowRouter.route( '/profile', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { main: 'profile' } );
  },
  name: 'profile' // Optional route name.
});
