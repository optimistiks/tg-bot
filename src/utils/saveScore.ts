// import * as admin from "firebase-admin";
// import { Score, Total } from "../types";

// export default function saveScore(score: Score): Promise<void> {
//   const db = admin.firestore();

//   const scoreId = `${score.scorerId}${score.chatId}${score.messageId}`;
//   const totalId = `${score.authorId}${score.chatId}`;

//   const total: Total = {
//     authorId: score.authorId,
//     chatId: score.chatId,
//     score: 1,
//   };

//   return db.runTransaction(async (transaction) => {
//     const scoreRef = db.collection("score").doc(scoreId);
//     const totalRef = db.collection("total").doc(totalId);

//     const scoreDoc = await transaction.get(scoreRef);
//     if (scoreDoc.exists) {
//       throw new Error("could not score, already scored");
//     }
//     const totalDoc = await transaction.get(totalRef);

//     transaction.create(scoreRef, score);
//     if (!totalDoc.exists) {
//       transaction.create(totalRef, total);
//     } else {
//       transaction.update(totalRef, { score: totalDoc.data()?.score + 1 });
//     }
//   });
// }
