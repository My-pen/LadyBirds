firebase.auth().onAuthStateChanged(function(user) { 
    if (user) { 
    // User is signed in.
       LOGOUT.classList.remove("hide");
       logout.addEventListener("click", ()=>{
       firebase.auth().signOut().then(()=>{
       console.log("ログアウトしました");
        })
        .catch( (error)=>{
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
      });
    } 
      
      else { 
    // No user is signed in.
        showMessage('Not Login', 'ログインしていません');
        LOGOUT.classList.add("hide");
        return(false);
    } 
}); 
