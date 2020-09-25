    firebase.auth().onAuthStateChanged( (user) => {
      let LOGOUT = document.getElementById("LOGOUT");

      //-----------------------------------
      // ログインチェック
      //-----------------------------------
      if(! user) {
        showMessage('Not Login', 'ログインしていません');
        LOGOUT.classList.add("hide");
        return(false);
      }

      //-----------------------------------
      // ログイン者への処理
      //-----------------------------------
      // ログインメッセージ
      showMessage('Login Complete!', `${user.displayName}さんがログインしました`);

      // ログアウトボタンを表示
      LOGOUT.classList.remove("hide");

      // ログアウトボタンを押下
      LOGOUT.addEventListener("click", ()=>{
        firebase.auth().signOut().then(()=>{
          console.log("ログアウトしました");
        })
        .catch( (error)=>{
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
      });
    });
