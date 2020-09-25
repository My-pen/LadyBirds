firebase.auth().onAuthStateChanged(function(user) { 
    if (user) { 
    // User is signed in.
          logout.classList.remove("hide");
    } 
      
      else { 
    // No user is signed in.
        showMessage('Not Login', 'ログインしていません');
        logout.classList.add("hide");
        return(false);
    } 
}); 
