      /**
       * 初期処理
       **/
      init: () => {
        this.db = firebase.firestore();
        this.messagesRef = this.db.collection("OPEN_CHAT").doc("Massages");

        //---------------------
        // 同期処理
        //---------------------
        this.messagesRef.orderBy("date", "asc").limit(20).onSnapshot( (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // 追加
            if ( change.type === 'added' ) {
              Chat.addLog(change.doc.id, change.doc.data());
            }
            // 更新
            else if( change.type === 'modified' ){
              Chat.modLog(change.doc.id, change.doc.data());
            }
            // 削除
            else if ( change.type === 'removed' ) {
              Chat.removeLog(change.doc.id);
            }
          });
        });

        //---------------------
        // 送信ボタン
        //---------------------
        document.getElementById("sbmt").addEventListener("click", ()=>{
          let msg = document.getElementById("msg").value;
          if( msg.length !== 0 ){
            Chat.sendLog(msg);
          }
        });
        // submitイベントは（いったん）無視する
        document.getElementById("form1").addEventListener("submit", (e)=>{
          e.preventDefault();
        });
      },

      /**
       * Firestoreへ送信
       *
       * @param {string} str 送信内容
       **/
      sendLog: (str)=>{
        this.messagesRef.add({
          name: Chat.user.name,
          msg: str,
          date: new Date().getTime()
        })
        .then(()=>{
          let msg = document.getElementById("msg");
          msg.focus();
          msg.value = "";
        })
        .catch((error) => {
          console.log(`追加に失敗しました (${error})`);
        });
      },

      /**
       * 描画エリアにログを追加
       *
       * @param {string} id
       * @param {object} data
       **/
       addLog: (id, data)=>{
        // 追加するHTMLを作成
        let log = `${data.name}: ${data.msg} (${getStrTime(data.date)})`;
        let li  = document.createElement('li');
        li.id   = id;
        li.appendChild(document.createTextNode(log));

        // 表示エリアへ追加
        let chatlog = document.getElementById("massagess");
        chatlog.insertBefore(li, chatlog.firstChild);
      },

      /**
       * 描画エリアのログを変更
       *
       * @param {string} id
       * @param {object} data
       **/
       modLog: (id, data)=>{
        let log = document.getElementById(id);
        if( log !== null ){
          log.innerText = `${data.name}: ${data.msg} (${getStrTime(data.date)})`;
        }
      },

      /**
       * 描画エリアのログを削除
       *
       * @param {string} id
       **/
       removeLog: (id)=>{
        let log = document.getElementById(id);
        if( log !== null ){
          log.parentNode.removeChild(log);
        }
      }
    };  // Chat
