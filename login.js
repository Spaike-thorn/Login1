// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTdFQs89nOCjSHj5OLBM1NyqaEbnXLeGE",
  authDomain: "loginfel2.firebaseapp.com",
  projectId: "loginfel2",
  storageBucket: "loginfel2.firebasestorage.app",
  messagingSenderId: "369551866865",
  appId: "1:369551866865:web:ef2cfe6ca21e4ff6cf2250",
  measurementId: "G-WJF4JSTKWE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Captura elementos
const nomeInput = document.getElementById('nome');
const senhaInput = document.getElementById('senha');
const loginBtn = document.getElementById('loginBtn');
const registroBtn = document.getElementById('registroBtn');
const mensagem = document.getElementById('mensagem');

// Registrar usuário
registroBtn.addEventListener('click', () => {
    const email = nomeInput.value;
    const senha = senhaInput.value;

    if (!email || !senha) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            mensagem.textContent = "Conta registrada com sucesso!";
            mensagem.style.color = "green";
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                mensagem.textContent = "Usuário já registrado!";
                mensagem.style.color = "orange";
            } else {
                mensagem.textContent = "Erro: " + error.message;
                mensagem.style.color = "red";
            }
        });
});

// Login usuário
loginBtn.addEventListener('click', () => {
    const email = nomeInput.value;
    const senha = senhaInput.value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            mensagem.textContent = `Bem-vindo, ${email}!`;
            mensagem.style.color = "green";
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found") {
                mensagem.textContent = "Usuário não encontrado. Registre-se primeiro.";
            } else if (error.code === "auth/wrong-password") {
                mensagem.textContent = "Senha incorreta!";
            } else {
                mensagem.textContent = "Erro: " + error.message;
            }
            mensagem.style.color = "red";
        });
});
