import { app } from "./app.js";

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Initialize Firestore DB
const db = getFirestore(app);
const dreamsCollection = collection(db, "hopesdreams");

// DOM Elements
const dreamsRef = document.querySelector("#dreams");
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");

// Fetch and display all comments
async function getDreams() {
  const dreamsDocs = await getDocs(dreamsCollection);

  dreamsRef.innerHTML = "";

  dreamsDocs.forEach((docSnap) => {
    const data = docSnap.data();
    const hearts = data.hearts || 0;

    dreamsRef.innerHTML += `
      <div class="dream">
        <h4>
          <span class="delete" data-id="${docSnap.id}">&cross;</span>
          ${data.text}
        </h4>
        <p>Likes: ${hearts}</p>
        <p>
          <button class="edit">Edit</button>
          <button class="heart" data-id="${docSnap.id}" data-hearts="${hearts}">&hearts;</button>
        </p>
      </div>
    `;
  });

  // Attach delete and like functionality
  attachEventHandlers();
}

// Submit a new comment
commentForm.onsubmit = async (e) => {
  e.preventDefault();
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  await addDoc(dreamsCollection, {
    text: commentText,
    hearts: 0,
  });

  commentInput.value = "";
  getDreams();
};

// Add like (heart)
async function addHeart(e) {
  const id = e.target.dataset.id;
  const newHeartCount = Number(e.target.dataset.hearts) + 1;
  const dreamToUpdate = doc(dreamsCollection, id);

  await updateDoc(dreamToUpdate, { hearts: newHeartCount });
  getDreams();
}

// Delete a comment
async function forgetDream(e) {
  const id = e.target.dataset.id;
  const confirmed = confirm("Are you sure you want to delete this comment?");
  if (!confirmed) return;

  const dreamToDelete = doc(dreamsCollection, id);
  await deleteDoc(dreamToDelete);
  getDreams();
}

// Attach click events
function attachEventHandlers() {
  document.querySelectorAll(".heart").forEach((btn) =>
    btn.addEventListener("click", addHeart)
  );

  document.querySelectorAll(".delete").forEach((btn) =>
    btn.addEventListener("click", forgetDream)
  );
}

// Load initial data
getDreams();
