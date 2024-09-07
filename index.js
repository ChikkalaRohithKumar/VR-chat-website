// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyBhC1WLPtRY1ktegqwcrDc2VcoH8s5QRCM",
    authDomain: "vrchat-76e4b.firebaseapp.com",
    projectId: "vrchat-76e4b",
    storageBucket: "vrchat-76e4b.appspot.com",
    messagingSenderId: "85260620278",
    appId: "1:85260620278:web:446b7063618e754e97f7d7"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  class VRChat {
    constructor() {
      this.currentUser = null;
      this.currentChat = null;
    }
  
    init() {
      this.loadPage('home');
      this.attachEventListeners();
    }
  
    loadPage(page) {
      const content = document.querySelector('body');
      content.innerHTML = '';
  
      const container = document.createElement('div');
      container.className = 'container';
      content.appendChild(container);
  
      switch(page) {
        case 'home':
          this.renderHomePage(container);
          break;
        case 'chat':
          this.renderChatPage(container);
          break;
      }
    }
  
    renderHomePage(container) {
      container.innerHTML = `
        <div class="icon"><i class="fas fa-comments"></i></div>
        <h1>Welcome to VRchat</h1>
        <p>Chat instantly with your friends!</p>
        <input type="text" id="username" placeholder="Enter your username" maxlength="15">
        <button id="joinChat">Join Chat</button>
      `;
    }
  
    renderChatPage(container) {
      container.innerHTML = `
        <h1>VRchat</h1>
        <div class="search-container">
          <input type="text" id="searchInput" placeholder="Search for a user">
          <button id="searchButton">Search</button>
        </div>
        <div id="userList"></div>
        <div id="chatContainer" class="hidden">
          <h2 id="chatHeader"></h2>
          <div id="chatMessages"></div>
          <div class="input-group">
            <input type="text" id="messageInput" placeholder="Type a message...">
            <button id="sendMessage">Send</button>
          </div>
        </div>
        <div class="button-group">
          <button id="logout">Logout</button>
        </div>
      `;
      this.loadUsers();
    }
  
    attachEventListeners() {
      document.body.addEventListener('click', (e) => {
        if (e.target.id === 'joinChat') this.joinChat();
        if (e.target.id === 'sendMessage') this.sendMessage();
        if (e.target.id === 'logout') this.logout();
        if (e.target.id === 'searchButton') this.searchUsers();
        if (e.target.classList.contains('user-item')) this.startChat(e.target.dataset.username);
      });
  
      document.body.addEventListener('keyup', (e) => {
        if (e.target.id === 'messageInput' && e.key === 'Enter') this.sendMessage();
        if (e.target.id === 'searchInput' && e.key === 'Enter') this.searchUsers();
      });
    }
  
    joinChat() {
      const usernameInput = document.getElementById('username');
      const username = usernameInput.value.trim();
      if (username) {
        this.currentUser = username;
        localStorage.setItem('username', username);
        db.ref('users/' + username).set(true);
        this.loadPage('chat');
      } else {
        alert('Please enter a username');
      }
    }
  
    loadUsers() {
      db.ref('users').on('value', (snapshot) => {
        const users = snapshot.val();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        for (let user in users) {
          if (user !== this.currentUser) {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.textContent = user;
            userElement.dataset.username = user;
            userList.appendChild(userElement);
          }
        }
      });
    }
  
    searchUsers() {
      const searchInput = document.getElementById('searchInput');
      const query = searchInput.value.trim().toLowerCase();
      const userItems = document.querySelectorAll('.user-item');
      userItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  
    startChat(username) {
      this.currentChat = username;
      const chatContainer = document.getElementById('chatContainer');
      const chatHeader = document.getElementById('chatHeader');
      chatContainer.classList.remove('hidden');
      chatHeader.textContent = `Chat with ${username}`;
      this.loadMessages();
    }
  
    sendMessage() {
      const messageInput = document.getElementById('messageInput');
      const message = messageInput.value.trim();
      if (message && this.currentChat) {
        const chatId = this.getChatId(this.currentUser, this.currentChat);
        const newMessage = {
          sender: this.currentUser,
          text: message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        db.ref('chats/' + chatId).push(newMessage);
        messageInput.value = '';
      }
    }
  
    loadMessages() {
      const chatMessages = document.getElementById('chatMessages');
      chatMessages.innerHTML = '';
      if (this.currentChat) {
        const chatId = this.getChatId(this.currentUser, this.currentChat);
        db.ref('chats/' + chatId).on('child_added', (snapshot) => {
          const message = snapshot.val();
          const messageElement = document.createElement('div');
          messageElement.className = `message ${message.sender === this.currentUser ? 'sent' : 'received'}`;
          messageElement.innerHTML = `
            <span class="username">${message.sender}:</span>
            <span class="message-text">${message.text}</span>
          `;
          chatMessages.appendChild(messageElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      }
    }
  
    getChatId(user1, user2) {
      return [user1, user2].sort().join('_');
    }
  
    logout() {
      if (this.currentUser) {
        db.ref('users/' + this.currentUser).remove();
      }
      localStorage.removeItem('username');
      this.currentUser = null;
      this.currentChat = null;
      this.loadPage('home');
    }
  }
  
  window.onload = () => {
    const chat = new VRChat();
    chat.init();
  };